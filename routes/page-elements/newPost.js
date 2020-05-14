const express = require('express');
const router = express();
const bodyParser = require('body-parser');
const multer = require('multer');

const mysql = require('mysql');

const config = require('../connection');
// const pool = mysql.createPool(config);

const date = new Date();

let fileName = ``

let resultCode = 1;
let postTextId = 0;

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		if(req.body.tag !== undefined) {
			fileName = `${req.body.tag}_${date.toDateString()}.jpg`;
			// console.log(fileName)
		}
		cb(null, './images/');
	},
	filename: (req, file, cb) => {
		let addedpic = file.fieldname;
		cb(null, addedpic)	
	}
})

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

const DB = new Database(config)

const upload = multer({ storage, dest: './images/' })

router.use(bodyParser.json());

router.post('/new-post', upload.any('addedpic'), (req, res, next) => {
	const data = req.body

	let postText = null;
	let postCategory = null;
	let tag = null;

	for(let key in data) {
		postText = data[key].message;
		postCategory = data[key].category;
		tag = data[key].tag
	}

	if (req.session.userId !== '' && postText !== '' && postCategory !== '' && tag !== '' &&
		req.session.userId !== null && postText !== null && postCategory !== null && tag !== null &&
		req.session.userId !== undefined && postText !== undefined && postCategory !== undefined && tag !== undefined) {

		DB.query(`SELECT * FROM post WHERE tag='${tag}'`)
		.then(results => {
			console.log(results)
			if (results === undefined || results.length < 1) {
				return DB.query(`INSERT INTO post_text(text) VALUES ('${postText}')`)
			}
			else {
				resultCode = 1;
				console.log('Tag already using')
				return res.json({resultCode, errorFromServer: `Tag already using!`})
				return DB.close();
			}
		})
		.then(results => {
			if (results !== undefined) { // if post body was added success insert data into post row
				postTextId = results.insertId;
			}
			return DB.query(`INSERT INTO post(post_category, commentCount, tag, user_data, date, post) 
					VALUES (${postCategory.substring(0, 1)}, 0, "${tag}", ${req.session.userId}, "${date.toDateString()}", ${postTextId})`)
		})
		.then(results => {
			postTextId = results.insertId
			console.log(`${postTextId} - second promise`)
			return DB.query(`UPDATE user SET posts=posts + 1 WHERE id=${req.session.userId}`)
		})
		.then(results => {
			postTextId
			console.log(`${postTextId} - therd promise`)
			return DB.query(`UPDATE categories SET last_posts=${postTextId}, postCount=postCount + 1 WHERE id=${postCategory.substring(0, 1)}`)
		})
		.then(results => {
			console.log(`Everything working here: 92 string`)
			resultCode = 0;
			res.status(200).json({resultCode, isAddedSuccess: true});
			return DB.close();
		})
		.catch(err => {
			resultCode = 1;
			console.log(`Something go wrong: ${err}, result code - ${resultCode}`);
			return res.json({resultCode, errorFromServer: `Something go wrong: ${err}!`})
			return DB.close();
		})
	}
})
module.exports = router