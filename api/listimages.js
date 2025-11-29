// api/listimages.js
const AWS = require('aws-sdk');
const express = require('express');
const router = express.Router();

AWS.config.update({ region: 'us-east-1' });
const s3 = new AWS.S3();
const bucketName = 'kovugunneraws-photos';

router.get('/listimages', async (req, res) => {
  try {
    const params = { Bucket: bucketName };
    const data = await s3.listObjectsV2(params).promise();

    const urls = data.Contents.map(obj =>
      `https://${bucketName}.s3.${AWS.config.region}.amazonaws.com/${obj.Key}`
    );

    res.json(urls);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error listing images');
  }
});

module.exports = router;
