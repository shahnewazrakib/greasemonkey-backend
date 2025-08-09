import mongoose from "mongoose";
import { ZodError } from "zod";
import { User } from "../../models/user.js";
import { hasPermission } from "../../lib/permission.js";
import { s3 } from "../../lib/aws.js";
import { sendEmail } from "../../lib/mailer.js";
import { deleteInspectorSchema } from "../../utils/zod.schema.js";
import { Report } from "../../models/report.js";

export const deleteInspector = async (req, res) => {
  const session = await mongoose.startSession();

  try {
    const user = req.user;
    const { userId } = req.params;
    const { transferTo } = deleteInspectorSchema.parse(req.body);

    if (!hasPermission(user, "delete:inspector")) {
      return res
        .status(403)
        .json({ message: "You don't have permission to delete inspector" });
    }

    if (user._id.toString() === userId) {
      return res.status(400).json({ message: "You can't delete yourself" });
    }

    if (userId === transferTo) {
      return res.status(400).json({
        message: "Deleted inspector and transfer to inspector can't be same",
      });
    }

    session.startTransaction();

    const deletedUser = await User.findById(userId).session(session);
    if (!deletedUser) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ message: "Inspector doesn't exist" });
    }

    const transferToUser = await User.findById(transferTo).session(session);
    if (!transferToUser) {
      await session.abortTransaction();
      session.endSession();
      return res
        .status(404)
        .json({ message: "Transfer to inspector doesn't exist" });
    }

    await Report.updateMany(
      { userId: userId },
      { $set: { userId: transferTo } },
      { session }
    );

    await Report.updateMany(
      { assignedTo: userId },
      { $set: { assignedTo: transferTo } },
      { session }
    );

    await User.findByIdAndDelete(userId, { session });

    await session.commitTransaction();
    session.endSession();

    // Delete profile photo from S3 after DB transaction commits
    if (deletedUser.profilePhoto) {
      const oldKey = deletedUser.profilePhoto.split("/").slice(-1)[0];
      await s3
        .deleteObject({
          Bucket: process.env.AWS_USER_PROFILE_BUCKET_NAME,
          Key: oldKey,
        })
        .promise();
    }

    // Send email after DB transaction commits
    await sendEmail(
      deletedUser.email,
      process.env.MAILTRAP_MEMBER_DELETE_TEMPLATE_ID,
      {
        name: deletedUser.name,
      }
    );

    res.status(200).json({
      message: "Inspector deleted",
      inspectorId: userId,
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    if (error instanceof ZodError) {
      return res.status(400).json({ message: error.errors[0].message });
    }

    res.status(500).json({ message: "Server error", error: error.message });
  }
};
