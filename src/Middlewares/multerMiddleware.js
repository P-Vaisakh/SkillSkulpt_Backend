const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "src/uploads");
  },
  filename: (req, file, callback) => {
    callback(null, `img-${Date.now()}-${file.originalname}`);
    console.log("success");
  },
});

const filefilter = (req, file, callback) => {
  if (
    file.mimetype == "image/jpg" ||
    file.mimetype == "image/jpeg" ||
    file.mimetype == "image/png"
  ) {
    callback(null, true);
  } else {
    callback(null, false);
  }
};

const upload = multer({storage,filefilter});
module.exports=upload
