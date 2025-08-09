import { s3 } from "../../lib/aws.js";
import { v4 as uuidv4 } from "uuid";
import { User } from "../../models/user.js";
import { hasPermission } from "../../lib/permission.js";

export const uploadProfilePhoto = async (req, res) => {
  try {
    const user = req.user;
    const file = req.file;

    if (!hasPermission(user, "update:profile")) {
      return res
        .status(403)
        .json({ message: "You don't have permission to upload profile photo" });
    }

    if (!file) {
      return res.status(400).json({ message: "Please upload a file" });
    }

    // Check if the file type is jpg, jpeg, png or webp
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.mimetype)) {
      return res.status(400).json({
        message: "Only JPG, PNG, and WEBP are allowed.",
      });
    }

    // Check if the file size is less than 2MB
    if (file.size > 2 * 1024 * 1024) {
      return res
        .status(400)
        .json({ message: "Please upload an image file less than 2MB" });
    }

    const params = {
      Bucket: process.env.AWS_USER_PROFILE_BUCKET_NAME,
      Key: `${uuidv4()}.${file.mimetype.split("/")[1]}`,
      Body: file.buffer,
      ACL: "public-read",
      ContentType: file.mimetype,
    };

    const uploadResult = await s3.upload(params).promise();
    await User.findByIdAndUpdate(user._id, {
      profilePhoto: uploadResult.Location,
    });

    // Delete the previous profile photo from s3
    if (user.profilePhoto) {
      const oldKey = user.profilePhoto.split("/").slice(-1)[0];
      await s3
        .deleteObject({
          Bucket: process.env.AWS_USER_PROFILE_BUCKET_NAME,
          Key: oldKey,
        })
        .promise();
    }

    return res.status(200).json({
      message: "Profile photo updated",
      profilePhoto: uploadResult.Location,
    });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Server error" });
  }
};