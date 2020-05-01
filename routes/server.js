const express = require('express');
const cors = require('cors');
const app = express();
const port = 4000;

const middleware = require('./page-elements/getValue')
const userAuth = require('./page-elements/userAuth')
const main = require('./page-elements/main')

const corsOptions = {
	origin: true,
	methods: ["GET,HEAD,PUT,PATCH,POST,DELETE"],
	credentials: true,
	maxAge: 3600,
	origin: 'http://localhost:3000',
	optionsSuccessStatus: 200
}

app.use(cors(corsOptions))

app.get('/auth/me', userAuth)
app.post('/check-user', userAuth)

app.get('/', main)

app.get('/category/:category', middleware.getQueryValue(`SELECT category, post_text as post, tag, p.date, username, commentCount, u.id as userId, p.id FROM categories c 
								JOIN post p ON p.post_category=c.id
								JOIN post_text pt ON p.post=pt.id
								JOIN user u ON p.user_data=u.id WHERE category=`,

								 `SELECT COUNT(*) as count FROM categories c 
								JOIN post p ON p.post_category=c.id
								WHERE category=`))

// bcrypt.hash('', saltRounds, function(err, hash) {
// 	console.log(hash)
// });

//UPDATE post SET commentCount = commentCount  + 1 WHERE post.id=6

app.listen(port, () => {
	console.log(`Server is running on Port ${port}`)
})