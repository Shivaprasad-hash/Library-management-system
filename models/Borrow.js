const mongoose = require('mongoose');

const borrowSchema = new mongoose.Schema({
  memberId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // References the 'User' model
    required: true
  },
  bookId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book', // References the 'Book' model
    required: true
  },
  borrowDate: {
    type: Date,
    required: true,
    default: Date.now // Captures the exact moment the book is checked out
  },
  returnDate: {
    type: Date,
    default: null // Remains null until the physical copy is brought back
  },
  status: {
    type: String,
    enum: ['borrowed', 'returned', 'overdue'],
    default: 'borrowed'
  }
}, {
  timestamps: true // Keeps standard records of document updates
});

module.exports = mongoose.model('Borrow', borrowSchema);