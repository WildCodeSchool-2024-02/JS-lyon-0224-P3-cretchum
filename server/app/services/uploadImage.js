const multer = require("multer");

const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/assets/avatars/"); // Path of the folder where file is storage.
  },
  filename: (req, file, cb) => {
    const userId = req.params.id;
    cb(
      null,
      // Give user ID to the image name and keep the original extension.
      `${userId}${path.extname(file.originalname)}`
    );
  },
});
function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype === true && extname === true) {
    return cb(null, true);
  }

  return cb("Error: Images seulement");
}
const upload = multer({
  storage,
  limits: { fileSize: 1000000 }, // max size = 1Mo
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  },
});

module.exports = upload;
