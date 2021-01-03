const db = require('../util/database');
const { v4: uuidv4 } = require('uuid');

const checkCompanyId = (req, res, next) => {
    const checkAvailability = `
        SELECT * FROM company
        WHERE cid = '${req.params.cid}'
    `;
    console.log(req.params.cid);
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

const getAllCompany = (req, res, next) => {
    const query = 'SELECT * FROM Company';
    db.query(query).then(dbRes => {
        res.json({
            error: false,
            company: dbRes.rows
        });
    }).catch(dbErr => {
        next(dbErr);
    });
}

// const addCompany = (req, res, next) => {
//     const query = `
//         INSERT INTO company
//         VALUES (
//             '${uuidv4()}', 
//             '${req.body.name}',
//             ${req.body.age},
//              '${req.body.job}',
//              ${req.body.salary}
//             )`;
//     db.query(query).then(dbRes => {
//         res.json({
//             error: false,
//             data: dbRes.rows
//         });
//     }).catch(dbRes => {
//         next(dbErr);
//     });
// }

const addCompany = (req, res, next) => {
    const query = `
        INSERT INTO company
        VALUES (
            '${uuidv4()}', 
            '${req.body.cname}'
            )`;
            console.log(req.body);
    db.query(query).then(dbRes => {
        res.json({
            error: false,
            message:'insered value'
        });
    }).catch(dbErr => {
        next(dbErr);
    });
}

const getCompany = (req, res, next) => {
    const query=`SELECT * FROM company WHERE  cid = '${req.params.cid}' `;
    db.query(query).then(dbRes => {
        res.json({
            error: false,
            company: dbRes.rows
                });
    }).catch(dbErr => {
        next(dbErr);
    });
}

const updateCompany= (req, res, next) => {
    const updateQuery = `
        UPDATE company SET  cname = '${req.body.cname}' WHERE cid = '${req.params.cid}'
    `;
        console.log(req.body.cname, req.params.cid);
        db.query(updateQuery).then(dbRes => {
        res.json({
            error: false,
            message: 'Company details updated successfully'
        });
    }).catch(dbErr => {
        next(dbErr);
    });
}

const deleteCompany = (req, res, next) => {
    const query = `
        DELETE FROM company
        WHERE cid='${req.params.cid}'
    `;
    db.query(query).then(dbRes => {
        res.json({
            error: false,
            message: 'Company Deleted Successfully'
        });
    }).catch(dbErr => {
        next(dbErr);
    });
}


module.exports = {
    checkCompanyId,
    getAllCompany,
    addCompany,
    getCompany,
    updateCompany,
    deleteCompany
};