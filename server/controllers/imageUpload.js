const router = require('express').Router();
const dotenv = require('dotenv');
const cloudinary = require('cloudinary');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
})


router.post('/', (req, res) => {
  console.log('posting to cloudinary from server...');
  console.log('req.files: ', req.files);
  console.log('req.files',  req.files.image_file.file);
  cloudinary.uploader.upload(req.files.image_file.file, function(result) {
    console.log('result from cloudinary: ', result);
    res.json(result);
    res.status(202);
    res.end();
  })
})

module.exports = router;