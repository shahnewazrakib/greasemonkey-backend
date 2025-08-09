import multer from "multer";

export const multerInstance = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 256 * 1024 * 1024, // 100MB limit
  },
});

