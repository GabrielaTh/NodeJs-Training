const mongoose = require('mongoose');
const { Schema } = mongoose;

const Message = new Schema ({
  user : { type: String },
  message : { type: String },
});

module.exports = mongoose.model('Message', Message);