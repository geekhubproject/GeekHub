const multer = require('multer');
const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');

cloudinary.config({
  cloud_name: 'dse1i9scl',
  api_key: '385535645886327',
  api_secret: '5E6xgkPBpyho7AZztHB6jShjDL4'
});
const storage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: 'images',
  allowedFormats: ['jpg', 'png'],
  transformation: [{ width: 500, height: 500, crop: 'limit' }]
});
module.exports =  multer({ storage: storage });
