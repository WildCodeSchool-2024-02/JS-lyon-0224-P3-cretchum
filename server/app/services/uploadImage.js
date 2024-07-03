const multer = require("multer");

const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const userId = req.params.id;
    cb(
      null,
      // Give user ID name to the image and keep the original extension.
      `${userId}${path.extname(file.originalname)}`
    );
  },
});
// const upload = multer({ storage });
function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  }

  return cb("Error: Images seulement !");
}
const upload = multer({
  storage,
  limits: { fileSize: 1000000 }, // Limite de 1Mo
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  },
});

module.exports = upload;
