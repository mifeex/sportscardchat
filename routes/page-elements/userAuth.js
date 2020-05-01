const express = require('express');
const router = express();

const mysql = require('mysql2');

const bodyParser = require('body-parser');

const session = require('express-session');
const cookieParser = require('cookie-parser');

const bcrypt = require('bcrypt');
const saltRounds = 10;

const config = require('../connection');
const pool = mysql.createPool(config);

let resultCode = 1;

router.use(bodyParser.json());

router.use(cookieParser());

router.use(session({
	name: 'sessName',
    secret: 'keyboard cat',
    resave: false,
	saveUninitialized: true,
	cookie: {
		maxAge: 1000 * 60 * 60 * 24 * 60,
		sameSite: true
	}
}));

router.get('/auth/me', (req, res, next) => {
	res.json({resultCode, userId: req.session.userId, email: req.session.email})
})

router.post('/check-user', (req, res, next) => {
	let data = req.body;
	let username = '';
	let password = ''

	for(let key in data) {
		username = data[key].name;
		password = data[key].password
	}

	pool.getConnection((err, connection) => {
		connection.query(`SELECT * FROM user WHERE username='${username}'`, (err, results) => {

			if (err) {
				resultCode = 1;

				return res.json({error: `Error: ${err}`, resultCode})
			}

			if (results.length < 1) {
				resultCode = 1;

				return res.json({error: `Error: username is ${err}`, resultCode})
			}

			else {
				for(let key in results) {
					bcrypt.compare(password, results[key].password, (err, result) => {
						if (result === true) {
							resultCode = 0;

							req.session.userId = results[key].id;
							req.session.email = results[key].username;

							return res.json({
								resultCode,
								userId: req.session.userId,
								email: req.session.email
							});
						}

						else {
							resultCode = 1;

							return res.json({error: `Invalid password! Password is ${err}`, resultCode})
						}
					});
				}
			}
		})
		connection.end();
	})
})

module.exports = router