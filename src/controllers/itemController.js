const Item = require('../models/item');

exports.createItem = async (req, res) => {
  const { name, description, price } = req.body;

  try {
    const newItem = new Item({ name, description, price });
    await newItem.save();
    res.json(newItem);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getItems = async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
