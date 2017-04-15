const router = require('express').Router();
const dotenv = require('dotenv');
const cloudinary = require('cloudinary');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
})


router.post('/', (req, res) => {
  console.log('req.body',  req.body.image_file);
  cloudinary.uploader.upload(req.body.image_file, function(result) {
    console.log('result from cloudinary: ', result);
  })
})

module.exports = router;