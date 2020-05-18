const express = require('express');
const router = express();
const bodyParser = require('body-parser');
const multer = require('multer');

const mysql = require('mysql');

const config = require('../connection');
const pool = mysql.createPool(config);

let fileName = ``

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, './images/userPhoto/');
	},
	filename: (req, file, cb) => {
		let userPhoto = file.fieldname;
		cb(null, `${userPhoto}_${req.params.userId}.jpg`)
		cb(null, `${userPhoto}_${req.params.userId}_1.jpg`)
	},
	// size: {
	// 	width: 400,
	// 	height: 400
	// },
})

const upload = multer({ storage, dest: './images/userPhoto/' });

router.post('/update-photo/:userId', upload.any('userPhoto'), (req, res, next) => {
	pool.query(`UPDATE user SET hasImage = 1 WHERE id=${req.params.userId}`,
		(err, result2) =>{
			if (err) {
				resultCode = 1;
				return res.status(500).json({resultCode, errorFromServer: `Something go wrong: ${err}!`})
			}

			else {
				return res.json({resultCode: 0, isSuccess: true, newImage: `http://localhost:4000/userPhoto/addedpic_${req.params.userId}_1.jpg`})
			}
	})
})

module.exports = router