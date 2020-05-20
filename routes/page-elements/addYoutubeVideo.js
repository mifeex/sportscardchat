const express = require('express');
const router = express();
const bodyParser = require('body-parser');

const mysql = require('mysql2');

const config = require('../connection');

class Database {

	constructor(config) {
		this.connection = mysql.createConnection(config);
	}

	query = (sql, args) => {
		return new Promise((resolve, reject) => {
			this.connection.query( sql, args, (err, results) => {
				if (err)
					return reject(err);
					resolve(results);
			});
		});
	}

	close = () => {
		return new Promise((resolve, reject) => {
			this.connection.end(err => {
				if (err)
					return reject(err);
					resolve();
			});
		});
	}
}

router.use(bodyParser.json());

let resultCode = 1

router.post('/new/video', (req, res, next) => {
	const DB = new Database(config);
	let path = ''

	if (req.body.data.data.includes('https://www.youtube.com/watch?v=')) {
		if (req.body.data.data.includes('&')) {
			path = req.body.data.data.split('&')[0]
			path = path.split('v=')[1]
		}
		else {
			path = req.body.data.data.split('v=')[1]
		}
	}

	if (req.body.data.data.includes('https://youtu.be/')) {
		path = req.body.data.data.split('.be/')[1]
	}

	DB.query(`SELECT path FROM youtube WHERE userId=${req.body.data.userId} AND path='${path}'`)
	.then(results => {
		if (results.length > 1) {
			resultCode = 1
			return DB.close();
			return res.json({error: `There is an error, you already use this video path`, resultCode})
		}
		else {
			return DB.query(`INSERT INTO youtube(path, userId) VALUES ('${path}', ${req.body.data.userId})`)
		}
	})	
	.then(results => {
		resultCode = 0
		res.json({results, resultCode})
		return DB.close();
	})
	.catch(err => {
		console.log(err)
		return DB.close();
	})
})

module.exports = router