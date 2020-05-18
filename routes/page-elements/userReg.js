const express = require('express');
const router = express();

const mysql = require('mysql2');

const bodyParser = require('body-parser');

const bcrypt = require('bcrypt');
const saltRounds = 10;

const config = require('../connection');
const pool = mysql.createPool(config);

const date = new Date();

let resultCode = 1;

router.use(bodyParser.json());

router.post('/register-user', (req, res, next) => {
	
	const data = req.body;

	let username = '';
	let password = '';
	let email = '';
	let isStay = false;

	for(let key in data) {
		username = data[key].name;
		password = data[key].password;
		email = data[key].email

		if (data[key].isStay !== undefined && data[key].isStay !== null) {
			isStay = data[key].isStay
		}
	}

	pool.query(`SELECT * FROM user WHERE username='${username}' OR email='${email}'`, (err, result) => {

		if (err) {
			resultCode = 1
			return res.status(500).json({resultCode, errorFromServer: `Something go wrong: ${err}!`})
		}
		
		if (result === undefined || result.length < 1) { // if user not register
			bcrypt.hash(password, saltRounds, function(err, hash) {

				if (err) {
					resultCode = 1
					return res.status(500).json({resultCode, errorFromServer: `Something go wrong: ${err}!`})
				}

				else {
					pool.query(`INSERT INTO user(username, password, date, posts, influencer, email, hasImage) 
								VALUES ('${username}', '${hash}', '${date.toDateString()}', 0, 0, '${email}', 0)`, 
					(err, result2) =>{
						if (err) {
							resultCode = 1;
							return res.status(500).json({resultCode, errorFromServer: `Something go wrong: ${err}!`})
						}

						else { //if everything "ok"
							resultCode = 0;

							isStay ? req.session.cookie.maxAge = 1000 * 60 * 60 * 24 * 60 : req.session.cookie.maxAge = 1000 * 60 * 60 * 24

							req.session.userId = result2.insertId;
							req.session.email = username;

							return res.json({
								resultCode,
								userId: req.session.userId,
								email: req.session.email
							});
						}

					})
				}
			});
		}

		else {
			resultCode = 1
			return res.json({resultCode, error: `This username or email already !exists!`})
		}
	})
})

module.exports = router