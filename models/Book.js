const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  isbn: { type: String, required: true, unique: true },
  category: { type: String, required: true, default: 'General' },
  quantity: { type: Number, required: true, default: 1, min: 0 },
  availableQuantity: { type: Number, required: true, default: 1, min: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Book', bookSchema);