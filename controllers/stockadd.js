const db = require('../util/database');
const { v4: uuidv4 } = require('uuid');

const checkStockId = (req, res, next) => {
    const checkAvailability = `
        SELECT * FROM stockadd
        WHERE sid = '${req.params.sid}'
    `;
    console.log(req.params.sid);
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

const getAllStock = (req, res, next) => {
    const query = 'SELECT * FROM stockadd';
    db.query(query).then(dbRes => {
        res.json({
            error: false,
            stockadd: dbRes.rows
        });
    }).catch(dbErr => {
        next(dbErr);
    });
}

const addStock = (req, res, next) => {
    const query = `
        INSERT INTO stockadd
        VALUES (
            '${uuidv4()}', 
            '${req.body.sname}',
            '${req.body.sprice}',
            '${req.body.quantity}'
            )`;
            console.log(req.body);
    db.query(query).then(dbRes => {
        res.json({
            error: false,
            message:'Insered Stock'
        });
    }).catch(dbErr => {
        next(dbErr);
    });
}
const getStock = (req, res, next) => {
    const query=`SELECT * FROM stockadd WHERE  sid = '${req.params.sid}' `;
    db.query(query).then(dbRes => {
        res.json({
            error: false,
            stock: dbRes.rows
                });
    }).catch(dbErr => {
        next(dbErr);
    });
}

const updateStock= (req, res, next) => {  //promises
    const updateQuery = `
        UPDATE stockadd SET  
        sname = '${req.body.sname}', 
        sprice = '${req.body.sprice}',
        quantity ='${req.body.quantity}'
         WHERE sid = '${req.params.sid}'
    `;
        console.log(req.body.sname, req.body.sprice, req.body.quantity, req.params.sid);
        db.query(updateQuery).then(dbRes => {
        res.json({
            error: false,
            message: 'Stock details updated successfully'
        });
    }).catch(dbErr => {
        next(dbErr);
    });
}


const deleteStock = (req, res, next) => {
    const query = `
        DELETE FROM stockadd
        WHERE sid='${req.params.sid}'
    `;
    db.query(query).then(dbRes => {
        res.json({
            error: false,
            message: 'Stock Deleted Successfully'
        });
    }).catch(dbErr => {
        next(dbErr);
    });
}


module.exports = {
    checkStockId,
    getAllStock,
    getStock,
    addStock,
    updateStock,
    deleteStock
};