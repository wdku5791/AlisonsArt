const router = require('express').Router();

router.post('/', (req, res) => {
  console.log("you're uploading an image to cloudinary!!! TURN UP");
})

module.exports = router;