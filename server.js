// Require Libraries
require('dotenv').config();
const express = require('express');
const handlebars = require('express-handlebars');
const cookieParser = require('cookie-parser');
const checkAuth = require('./middleware/checkAuth');

// App Setup
const app = express();
app.use(express.static('public'));
app.use(cookieParser());

// db setup
require('./data/reddit-db');

// Middleware
app.engine('handlebars', handlebars.engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.set('views', './views');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(checkAuth);
app.use(express.static('public'));

// Require controllers
require('./controllers/posts')(app); 
require('./controllers/comments.js')(app);
require('./controllers/auth.js')(app);

app.get('/', (req, res) => {
    res.render('home');
});

// Render the form
app.get('/posts/new', (req, res) => {
    res.render('posts-new');
});

app.listen(3000);

module.exports = app;