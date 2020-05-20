const app = require('express')()
const http = require('http').Server(app)
const io = require('socket.io')(http)
const multer = require('multer');

const port = 8000

const mysql = require('mysql');
const config = require('../connection');

const date = new Date();

const users = {};

let commentIndexId = 0

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, './images/');
	},
	filename: (req, file, cb) => {
		let addedpic = file.fieldname;
		cb(null, `${addedpic}_${req.params.data}.jpg`)
	},
})

const upload = multer({ storage, dest: './images/' })

app.post('/', upload.any('addedpic'), (req, res, next) => {
	res.sendFile('../../public/index.html')
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



io.on('connection', (socket) => {
	socket.on('comment', (value) => {
		const DB = new Database(config)

		DB.query(`INSERT INTO comment_text(comment_text) VALUES('${value.message}')`)
		.then(results => {
			commentIndexId = results.insertId;
			return DB.query(`INSERT INTO comment(post, user, date, comment_text) VALUES 
					(${value.postId}, ${value.userId}, "${date.toDateString()}", ${commentIndexId})`)
		})
		.then(results => {
			return DB.query(`UPDATE post SET counts = counts + 1, last_comment = ${results.insertId} WHERE post.id=${value.postId}`)
		})
		.then(results => {
			console.log(commentIndexId)
			return DB.query(`SELECT username, p.id as postId, u.id as userId,
							ct.comment_text as text, p.tag, u.date as joined, c.date, u.posts as count,
							u.hasImage as userImage FROM comment c
							JOIN user u ON c.user=u.id
							JOIN post p ON c.post=p.id
							JOIN comment_text ct ON c.comment_text=ct.id WHERE c.comment_text = ${commentIndexId}`)
		})
		.then(results => {
			socket.emit('user-commented', results);
			return DB.close();
		})
	})
})


http.listen(port, () => {
	console.log(`listening on *:${port}`)
})