const express = require('express');
const router = express();
const bodyParser = require('body-parser');

const mysql = require('mysql');

const config = require('../connection');
const pool = mysql.createPool(config);

router.use(bodyParser.json());

router.post('/search', (req, res, next) => {
	pool.query(`SELECT category, text as post, tag, p.date, username,
						c.counts, u.id as userId, p.id as postId FROM categories c
						JOIN post p ON p.post_category=c.id
						JOIN post_text pt ON p.post=pt.id
						JOIN user u ON p.user_data=u.id WHERE tag LIKE '%${req.body.data}%'
						OR username LIKE '%${req.body.data}%' `,
		(err, result2) =>{
			if (err) {
				resultCode = 1;
				return res.status(500).json({resultCode, errorFromServer: `Something go wrong: ${err}!`})
			}

			else {
				return res.json({resultCode: 0, result2})
			}
	})
})

module.exports = router