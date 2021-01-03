const express = require('express');
const router = express.Router();


const saleController = require('../controllers/sale');


router.get('/', saleController.getAllSale);//api

router.post('/', saleController.addSale);

router.delete('/:bid', saleController.checkSaleId, saleController.deleteBuy);

module.exports = router;