const { Schema, model, Types } = require('mongoose');

const schema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  dictionary: [{
    type: Types.ObjectId,
    ref: 'Word',
  }],
});

module.exports = model('User', schema);
