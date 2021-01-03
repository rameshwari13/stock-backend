const db = require('../util/database');
const { v4: uuidv4 } = require('uuid');

const checkSaleId = (req, res, next) => {
    const checkAvailability = `
        SELECT * FROM sale
        WHERE bid = '${req.params.bid}'
    `;
    console.log(req.params.bid);
    db.query(checkAvailability).then(dbRes => {
        if (dbRes.rows.length > 0) {
            next();
        } else {
            res.json({
                error: true,
                message: 'No user found with the ID'
            });
        }
    });
}

const getAllSale = (req, res, next) => {
    const query = 'SELECT * FROM sale';
    db.query(query).then(dbRes => {
        res.json({
            error: false,
            sale: dbRes.rows
        });
    }).catch(dbErr => {
        next(dbErr);
    });
}


const addSale = (req, res, next) => {
    const query = `
        INSERT INTO sale
        VALUES (
            '${uuidv4()}', 
            '${req.body.bname}',
            '${req.body.bprice}',
            '${req.body.bquantity}'
            )`;
            console.log(req.body);
    db.query(query).then(dbRes => {
        res.json({
            error: false,
            message:'Inserted sale'
        });
    }).catch(dbErr => {
        next(dbErr);
    });
}


const deleteBuy = (req, res, next) => {
    const query = `
        DELETE FROM sale
        WHERE bid='${req.params.bid}'
    `;
    db.query(query).then(dbRes => {
        res.json({
            error: false,
            message: 'sale Deleted Successfully'
        });
    }).catch(dbErr => {
        next(dbErr);
    });
}


module.exports = {
    checkSaleId,
    getAllSale,
    addSale,
    deleteBuy
    
};