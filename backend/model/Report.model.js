const mongoose = require('mongoose');
const { Schema } = mongoose;

const reportSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  medicineName: { type: String, required: true },
  quantity: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
  paymentMethod: { type: String, required: true },
  description: { type: String } // Adding description field
});

exports.ManagerInput = mongoose.model("ManagerInput", reportSchema);
