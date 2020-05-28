const express = require('express');
const cors = require('cors');
const app = express();
const port = 4000;
const session = require('express-session');
const cookieParser = require('cookie-parser');
const path = require('path');
const helmet = require('helmet');
const xssFilter = require('x-xss-protection');
const https = require('https')
const fs = require('fs')

const options = {
    pfx: fs.readFileSync('sportscardchat.pfx'),
    passphrase: 'RHW6XnZx5Gqtg'
};

const server = https.createServer(options, app)

const middleware = require('./page-elements/getValue');
const second_middleware = require('./page-elements/getSimpleValue');

const userAuth = require('./page-elements/userAuth');
const main = require('./page-elements/main');
const registration = require('./page-elements/userReg');
const newPost = require('./page-elements/newPost');
const userPhoto = require('./page-elements/userPhoto')
const search = require('./page-elements/search')
const addYoutubeVideo = require('./page-elements/addYoutubeVideo')
const reset = require('./page-elements/reset')

const corsOptions = {
	origin: true,
	methods: ["GET,HEAD,PUT,PATCH,POST,DELETE"],
	credentials: true,
	maxAge: 3600,
	origin: 'https://sportscardchat.com',
	optionsSuccessStatus: 200
}

app.use(cookieParser());

app.use(session({
	name: 'sessName',
    secret: 'fleaKitten',
    resave: false,
	saveUninitialized: true,
	cookie: {
		maxAge: 1000 * 60 * 60 * 24,
		sameSite: true
	}
}));

app.use(helmet.xssFilter());
app.use(xssFilter());
app.use(xssFilter({ setOnOldIE: true }));

app.use(cors(corsOptions))
app.use('/images', express.static(path.join(__dirname + '/images')))
app.use('/userPhoto', express.static(path.join(__dirname + '/images/userPhoto')))

app.get('/auth/me', userAuth);
app.get('/logout', userAuth);
app.get('/login', userAuth);

app.post('/password/reset', reset);
app.post('/password/code/check', reset);
app.post('/new/video', addYoutubeVideo)
app.post('/register-user', registration);
app.post('/new-post/:data', newPost);
app.post('/update-photo/:userId', userPhoto);
app.post('/search', search);
app.post('/check-user', userAuth);

app.get('/', main);

app.get('/use-discord', (req, res, next) => {
	res.json({url: "https://discord.com/api/oauth2/authorize?client_id=707710666349477981&redirect_uri=https%3A%2F%2Fsportscardchat.com%2Fuse%2Fdiscord&response_type=code&scope=identify"})
})

app.get('/category/:data', middleware.getQueryValue(`SELECT category, text as post, tag, p.date, username,
	p.counts, u.id as userId, p.id as postId, p.id, p.hasImage FROM categories c 
	JOIN post p ON p.post_category=c.id
	JOIN post_text pt ON p.post=pt.id
	JOIN user u ON p.user_data=u.id`,

	`SELECT COUNT(*) as count FROM categories c 
	JOIN post p ON p.post_category=c.id`, 'category'))

app.get('/post/:data', middleware.getQueryValue(`SELECT username, p.id as postId, u.id as userId,
	ct.comment_text as text, p.tag, u.date as joined, c.date, u.posts as count, p.hasImage, c.hasImage, image, u.hasImage as userImage
	FROM comment c
	JOIN post p ON c.post=p.id
	JOIN user u ON c.user=u.id
	JOIN comment_text ct ON c.comment_text=ct.id WHERE p.id=`,

	`SELECT text, tag, p.date, u.date as joined, username, u.posts as count,
	u.id as userId, p.id as postId, p.hasImage as postImage, u.hasImage as userImage, image FROM post p
	JOIN post_text pt ON p.post=pt.id
	JOIN user u ON p.user_data=u.id WHERE p.id=`, 'comment'))

app.get('/get-user/:data', middleware.getQueryValue(`SELECT category, text as post, tag, p.date, username,
	p.counts, u.id as userId, p.id as postId, p.id FROM categories c
	JOIN post p ON p.post_category=c.id
	JOIN post_text pt ON p.post=pt.id
	JOIN user u ON p.user_data=u.id WHERE u.id=`,

	`SELECT username, date, posts, influencer, hasImage, image, id FROM user WHERE id=`, 'user'))

app.get('/get-influencer', middleware.getQueryValue(`SELECT id, username, date, influencer as hasInfluencers FROM user WHERE influencer=1`,
	`SELECT COUNT(*) as count FROM user WHERE influencer=1`, 'normal'))

app.get('/search-in-posts/category/:data', middleware.getQueryValue(``, 
	`SELECT COUNT(*) as count FROM categories c 
	JOIN post p ON p.post_category=c.id
	WHERE category=`, 'find'))

app.get('/get/category', second_middleware.getSimpleValue(`SELECT category, id FROM categories`, 'getValue'))

app.get('/videoPath/:data', second_middleware.getSimpleValue(`SELECT path, id FROM youtube WHERE userId=`, 'getUser'))

app.get('/set/influencer/:data', second_middleware.getSimpleValue(`UPDATE user SET influencer = 1 WHERE id=`, 'getUser'))

app.get('/get/popular-post', second_middleware.getSimpleValue(`SELECT text as post, tag, username, u.id as userId, p.id 
	FROM categories c 
	JOIN post p ON p.post_category=c.id
	JOIN post_text pt ON p.post=pt.id
	JOIN user u ON p.user_data=u.id ORDER BY p.counts DESC LIMIT 5`, 'getValue'))

server.listen(port, 'sportscardchat.com', () => {
	console.log(server.address())
})