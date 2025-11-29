// api/uploadimage.js
const AWS = require('aws-sdk');
const multer = require('multer');
const express = require('express');
const router = express.Router();

AWS.config.update({ region: 'us-east-1' }); // adjust if your bucket is in another region
const s3 = new AWS.S3();
const bucketName = 'kovugunneraws-photos';

const upload = multer({ storage: multer.memoryStorage() });

router.post('/uploadimage', upload.single('image'), async (req, res) => {
  try {
    const params = {
      Bucket: bucketName,
      Key: req.file.originalname,
      Body: req.file.buffer,
      ContentType: req.file.mimetype,
      ACL: 'public-read'
    };

    const data = await s3.upload(params).promise();
    res.send(`File uploaded successfully: ${data.Location}`);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error uploading file');
  }
});

module.exports = router;
