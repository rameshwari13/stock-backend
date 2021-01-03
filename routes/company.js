const express = require('express');
const router = express.Router();

const companyController = require('../controllers/company');



router.get('/', companyController.getAllCompany);//api

router.get('/:cid',  companyController.getCompany);

router.post('/', companyController.addCompany);

router.put('/:cid',  companyController.checkCompanyId, companyController.updateCompany);

router.delete('/:cid', companyController.checkCompanyId, companyController.deleteCompany);


module.exports = router;