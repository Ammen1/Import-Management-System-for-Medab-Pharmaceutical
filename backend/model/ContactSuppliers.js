const mongoose = require('mongoose');

const ContactSuppliersSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  sentAt: {
    type: Date,
    default: Date.now
  }
});

exports.ContactSuppliers = mongoose.model("ContactSuppliers", ContactSuppliersSchema);
