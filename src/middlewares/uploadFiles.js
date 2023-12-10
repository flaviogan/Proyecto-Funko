const multer = require('multer');
const path = require('path');
console.log('uploardFiles');

const storage = multer.diskStorage({
    // destination: (req, file, cb) => cb(null, path.resolve(__dirname, '../../public/img')),
    destination: (req, file, cb) => cb(null, path.resolve(__dirname, '../../public/img')),

    filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});

const uploadFiles = multer({ storage });

module.exports = uploadFiles;