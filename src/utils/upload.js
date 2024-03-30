import multer from 'multer';
import { UPLOADS_FOLDER_PATH } from './../constants.js';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `${UPLOADS_FOLDER_PATH}/`);
  },
  filename: function (req, file, cb) {
    // file validation
    const fileName = `${file.fieldname}-${Date.now()}-${file.originalname}`;
    req.body.avatar = fileName;
    cb(null, fileName);
  },
});

const upload = multer({ storage: storage });

export default upload;
