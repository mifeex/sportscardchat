const express = require('express');
const cors = require('cors');
const app = express();
const port = 4000;
const session = require('express-session');
const cookieParser = require('cookie-parser');
const path = require('path');
const helmet = require('helmet');
const xssFilter = require('x-xss-protection');

const middleware = require('./page-elements/getValue');
const second_middleware = require('./page-elements/getSimpleValue');

const userAuth = require('./page-elements/userAuth');
const main = require('./page-elements/main');
const registration = require('./page-elements/userReg');
const newPost = require('./page-elements/newPost');
const userPhoto = require('./page-elements/userPhoto')
const search = require('./page-elements/search')

const corsOptions = {
	origin: true,
	methods: ["GET,HEAD,PUT,PATCH,POST,DELETE"],
	credentials: true,
	maxAge: 3600,
	origin: 'http://localhost:3000',
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
app.post('/check-user', userAuth);
app.get('/logout', userAuth);
app.get('/login', userAuth);

app.post('/register-user', registration);
app.post('/new-post/:data', newPost);
app.post('/update-photo/:userId', userPhoto);
app.post('/search', search);

app.get('/', main);

app.get('/use-discord', (req, res, next) => {
	res.json({url: "https://discord.com/api/oauth2/authorize?client_id=707710666349477981&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fuse%2Fdiscord&response_type=code&scope=identify"})
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

app.get('/get/popular-post', second_middleware.getSimpleValue(`SELECT text as post, tag, username, u.id as userId, p.id 
	FROM categories c 
	JOIN post p ON p.post_category=c.id
	JOIN post_text pt ON p.post=pt.id
	JOIN user u ON p.user_data=u.id ORDER BY p.counts DESC LIMIT 5`, 'getValue'))

app.listen(port, () => {
	console.log(`Server is running on Port ${port}`)
})