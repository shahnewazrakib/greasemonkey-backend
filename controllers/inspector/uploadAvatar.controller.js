import { s3 } from "../../lib/aws.js";
import { v4 as uuidv4 } from "uuid";
import { User } from "../../models/user.js";
import { hasPermission } from "../../lib/permission.js";

export const uploadAvatar = async (req, res) => {
  try {
    const user = req.user;
    const { userId } = req.params;

    if (!hasPermission(user, "update:inspector")) {
      return res
        .status(403)
        .json({ message: "You don't have permission to upload avatar" });
    }

    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: "Please select a file" });
    }

    // Check if the file type is jpg, jpeg, png or webp
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.mimetype)) {
      return res.status(400).json({
        message: "Only JPG, PNG, and WEBP are allowed",
      });
    }

    // Check if the file size is less than 2MB
    if (file.size > 2 * 1024 * 1024) {
      return res
        .status(400)
        .json({ message: "File size must be less than 2MB" });
    }

    //     Check if the user id exist
    const userExist = await User.findById(userId);
    if (!userExist) {
      return res.status(404).json({ message: "Inspector doesn't exist" });
    }

    const params = {
      Bucket: process.env.AWS_USER_PROFILE_BUCKET_NAME,
      Key: `${uuidv4()}.${file.mimetype.split("/")[1]}`,
      Body: file.buffer,
      ACL: "public-read",
      ContentType: file.mimetype,
    };

    const uploadResult = await s3.upload(params).promise();
    await User.findByIdAndUpdate(userId, {
      profilePhoto: uploadResult.Location,
    });

    // Delete the previous profile photo from s3
    if (userExist.profilePhoto) {
      const oldKey = userExist.profilePhoto.split("/").slice(-1)[0];
      await s3
        .deleteObject({
          Bucket: process.env.AWS_USER_PROFILE_BUCKET_NAME,
          Key: oldKey,
        })
        .promise();
    }

    return res.status(200).json({
      message: "Avatar uploaded",
      profilePhoto: uploadResult.Location,
      inspectorId: userId,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
