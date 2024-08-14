const Order = require('../models/order');
const Item = require('../models/item');

exports.createOrder = async (req, res) => {
  const { userId, items } = req.body;

  try {
    let total = 0;
    for (const itemId of items) {
      const item = await Item.findById(itemId);
      total += item.price;
    }

    const newOrder = new Order({ userId, items, total });
    await newOrder.save();
    res.json(newOrder);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('items');
    res.json(orders);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
