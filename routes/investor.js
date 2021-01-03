const express = require('express');
const router = express.Router();

//const auth = require('../middlewares/auth');
const investorController = require('../controllers/investor');
// const stocksController = require('../controllers/stockadd');


router.get('/', investorController.getAllInvestor);//api

router.get('/:inid', investorController.getInvestor);

router.post('/', investorController.addInvestor);

router.put('/:inid',  investorController.checkInvestorId, investorController. updateInvestor);

router.delete('/:inid', investorController.checkInvestorId, investorController.deleteInvestor);


// router.get('/',  stocksController.getAllStock);//api

// router.post('/stockadd',  stocksController.addStock);

// router.put('/stockadd/:sid',  stocksController.checkStockId, stocksController.updateStock);

// router.delete('/stockadd/:sid',  stocksController.checkStockId, stocksController.deleteStock);

module.exports = router;