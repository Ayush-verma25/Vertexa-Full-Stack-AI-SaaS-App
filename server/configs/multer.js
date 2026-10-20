import multer from "multer";

const storage = multer.diskStorage({});

export const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
    files: 1,
  },
  fileFilter: (req, file, callback) => {
    const isResume = file.fieldname === "resume";
    const isAllowedType = isResume
      ? file.mimetype === "application/pdf"
      : file.fieldname === "image" && file.mimetype.startsWith("image/");

    callback(null, isAllowedType);
  },
});
