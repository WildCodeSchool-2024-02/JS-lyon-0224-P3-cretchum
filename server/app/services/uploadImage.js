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
      //   `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
      `${userId}${path.extname(file.originalname)}`
    );
  },
});
const upload = multer({ storage });

module.exports = upload;
