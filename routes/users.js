const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');

const auth = require('../middlewares/auth');


const db = require('../util/database');
const config = require('../config/config.json');

const checkEmailAvailability = (req, res, next) => {
    const query = `
        SELECT * FROM users
        WHERE email='${req.body.email}'
    `;
    db.query(query).then(dbRes => {
        if (dbRes.rows.length > 0) {
            res.json({
                error: true,
                message: 'Email already exists'
            });
        } else {
            next();
        }
    }).catch(dbErr => {
        next(dbErr);
    });
}

router.post('/register', checkEmailAvailability, (req, res, next) => {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);
    const query = `
        INSERT INTO users
        VALUES (
            '${req.body.email}',
            '${hashedPassword}',
            '${req.body.uname}',
            ${req.body.mobile},
            'user'
            
        )`;
    db.query(query).then(dbRes => {
        res.json({
            error: false,
            message: 'User registered successfully'
        });
    }).catch(dbErr => {
        next(dbErr);
    });
});

router.post('/login', (req, res, next) => {
    const query = `
        SELECT * FROM users
        WHERE email='${req.body.email}'
    `;
    db.query(query).then(dbRes => {
        if (dbRes.rows.length === 0) {
            res.json({
                error: true,
                message: 'Email not found. Please Register'
            });
        } else {
            const passwordMatched = bcrypt.compareSync(req.body.password, dbRes.rows[0].password);
            if (passwordMatched) {
                const payload = {
                    email: dbRes.rows[0].email,
                    // uname: dbRes.rows[0].uname,
                    // role: dbRes.rows[0].role,
                    // mobile: dbRes.rows[0].mobile
                };
                const token = jwt.sign(payload, config.jwtSecret, {expiresIn: '1hr'});
                res.json({
                    error: false,
                    message: 'Login Successfull',
                    token: token,
                    role: dbRes.rows[0].role
                });
            } else {
                res.json({
                    error: true,
                    message: 'Invalid credentials'
                });
            }
        }
    }).catch(dbErr => {
        next(dbErr);
    })
});

module.exports = router;