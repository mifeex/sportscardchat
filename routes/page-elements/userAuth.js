const express = require('express');
const router = express();

const mysql = require('mysql2');

const bodyParser = require('body-parser');

const bcrypt = require('bcrypt');
const saltRounds = 10;

const config = require('../connection');
const pool = mysql.createPool(config);

const OAuthClient = require('disco-oauth');
const client = new OAuthClient("707710666349477981", "aCZX7ED_JM8OCUKYIUKcy3cCAeHJ3NoW");
const date = new Date();

let resultCode = 1;

client.setScopes('identify');
client.setRedirect('https://sportscardchat.com/#/use/discord');

router.use(bodyParser.json());

router.get('/logout', (req, res, next) => {
	req.session.destroy(err => {
		res.json(resultCode)
	})
})

router.get('/auth/me', (req, res, next) => {
	if (req.session.userId === undefined || req.session.email === undefined) {

		resultCode = false;
		res.json({resultCode, authError: `userId or email undefined. Please try to logout and login again`})
	}
	else {
		res.json({resultCode, userId: req.session.userId, email: req.session.email})
	}
})

router.post('/check-user', (req, res, next) => {

	const data = req.body;

	let username = '';
	let password = '';
	let email = '';
	let isStay = false;

	for(let key in data) {
		email = data[key].email
		password = data[key].password

		if (data[key].isStay !== undefined && data[key].isStay !== null) {
			isStay = data[key].isStay
		}
	}

	// username.toLowerCase();

	pool.getConnection((err, connection) => {
		connection.query(`SELECT * FROM user WHERE email='${email}'`, (err, results) => {

			if (err) {
				resultCode = 1;
				return res.json({error: `Error: ${err}`, resultCode})
			}

			if (results.length < 1) {
				resultCode = 1;
				return res.json({error: `Error: email is ${err}`, resultCode})
			}

			else {
				for(let key in results) {
					bcrypt.compare(password, results[key].password, (err, result) => {
						if (result === true) { //if everythink "ok" auth user and save data in cookie
							resultCode = 0;

							isStay ? req.session.cookie.maxAge = 1000 * 60 * 60 * 24 * 60 : req.session.cookie.maxAge = 1000 * 60 * 60 * 24

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
		connection.release();
	})
})

router.get('/login', async (req, res, next) => {
	let code = req.query.code;

	if (code === undefined) {
		res.json({error: `Code is ${code}`})
	}

	else {
		let clientCode = await client.getAccess(code).catch(console.error);

		req.session.key = clientCode;

		let user = await client.getUser(req.session.key)

		req.session.email = user.username; //we use separate "username" and "id". This values give us Discord API
		req.session.userId = user.discriminator

		resultCode = 0;

		req.session.cookie.maxAge = 1000 * 60 * 60 * 24 * 90;

		pool.query(`SELECT * FROM user WHERE id=${user.discriminator}`, (err, result) => { //checking is user in the system
			if (result === undefined || result.length < 1) {
				pool.query(`INSERT INTO user(id, username, date, posts, influencer, image, hasImage) 
							VALUES (${user.discriminator}, '${user.username}', '${date.toDateString()}', 0, 0, ${user.avatarUrl()}, 1)`,
				(err, result2) =>{
					res.json({
						resultCode,
						userId: req.session.userId,
						email: req.session.email
					})
				})
			}
			else {
				res.json({
					resultCode,
					userId: req.session.userId,
					email: req.session.email
				})
			}
		})
	}
})

module.exports = router