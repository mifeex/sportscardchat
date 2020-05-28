const express = require('express');
const router = express();

const mysql = require('mysql2');

const config = require('../connection');
const pool = mysql.createPool(config);


router.get('/', (req, res, next) => {
    pool.getConnection((err, connection) => {
        connection.query(`SELECT c.id, p.id as postId, u.id as userId, category, c.counts, tag, p.date, username FROM categories c 
                        JOIN post p ON c.last_posts=p.id
                        JOIN user u ON p.user_data=u.id`, 
        (err, result) => {
            res.json(result);
        })
    connection.release();
    })
})

module.exports = router