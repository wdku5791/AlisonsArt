const router = require('express').Router();
const dotenv = require('dotenv');
const cloudinary = require('cloudinary');
const authenticate = require('../middlewares/authenticate.js');

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET
// });

cloudinary.config(process.env.CLOUDINARY_URL);


router.post('/', authenticate, (req, res) => {
  cloudinary.uploader.upload(req.files.image_file.file, function(result) {
    res.json(result);
    res.status(202);
    res.end();
  });
});

module.exports = router;
