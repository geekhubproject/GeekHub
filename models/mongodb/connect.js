const config = require('../../config');
const mongoose = require('mongoose');

mongoose.connect(`mongodb://${config.mongodb.server}/${config.mongodb.db}`, {
  user: config.mongodb.user,
  pass: config.mongodb.pass,
  useNewUrlParser: true,
})
  .then(() => {
    console.log(`mongodb ${config.mongodb.db} connected`);
  })
  .catch(e => {
    console.log(e);
  });


