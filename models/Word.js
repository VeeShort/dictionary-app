const { Schema, Types, model } = require('mongoose');

const schema = new Schema({
  startLetter: { type: String },
  en: { type: String, required: true },
  translation: { type: String },
  owner: { type: Types.ObjectId, ref: 'User', unique: false },
});

module.exports = model('Word', schema);
