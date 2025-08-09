import { v4 as uuidv4 } from "uuid";
import sharp from "sharp";
import { hasPermission } from "../../lib/permission.js";
import { s3 } from "../../lib/aws.js";

export const uploadMultipleMedia = async (req, res) => {
  try {
    const user = req.user;

    // Check user permission
    if (!hasPermission(user, "update:report")) {
      return res
        .status(403)
        .json({ message: "You don't have permission to update report" });
    }

    const files = req.files;
    if (!files || files.length === 0) {
      return res
        .status(400)
        .json({ message: "Please upload at least one file" });
    }

    // Allowed image types
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

    // Upload images in parallel
    const uploadedImages = await Promise.all(
      files.map(async (file) => {
        if (!allowedTypes.includes(file.mimetype)) {
          throw new Error(`${file.originalname} is not a valid image format`);
        }

        // Compress image
        const compressedImage = await sharp(file.buffer)
          .rotate()
          .jpeg()
          .resize(1200)
          .toBuffer();
        if (compressedImage.byteLength > 10 * 1024 * 1024) {
          throw new Error(`${file.originalname} is too large (max 10MB)`);
        }

        // Generate unique filename
        const newFilename = `${uuidv4()}.jpeg`;

        // Upload to AWS S3
        const params = {
          Bucket: process.env.AWS_REPORT_PHOTO_BUCKET_NAME,
          Key: newFilename,
          Body: compressedImage,
          ACL: "public-read",
          ContentType: file.mimetype,
        };

        const uploadResult = await s3.upload(params).promise();
        return uploadResult.Location;
      })
    );

    return res.status(200).json({
      message: "Photos uploaded",
      urls: uploadedImages,
    });
  } catch (error) {
    res.status(500).json({ message: error.message || "Server error" });
  }
};
