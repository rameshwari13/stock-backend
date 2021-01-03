const express = require('express');
const router = express.Router();


const stocksController = require('../controllers/stockadd');



router.get('/', stocksController.getAllStock);
//api
router.get('/:sid', stocksController.getStock);

router.post('/', stocksController.addStock);

router.put('/:sid', stocksController.checkStockId, stocksController.updateStock);

router.delete('/:sid',  stocksController.checkStockId, stocksController.deleteStock);

module.exports = router;