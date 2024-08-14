const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item', required: true }],
  total: { type: Number, required: true },
});

module.exports = mongoose.model('Order', OrderSchema);
