const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/', authMiddleware, itemController.createItem);
router.get('/', authMiddleware, itemController.getItems);

module.exports = router;
