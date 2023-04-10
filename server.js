// Require Libraries
const express = require('express');
const handlebars = require('express-handlebars');

// App Setup
const app = express();
app.use(express.static('public'));

// db setup
require('./data/reddit-db');

// Middleware
app.engine('handlebars', handlebars.engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.set('views', './views');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Require controllers
require('./controllers/posts')(app)

app.listen(3000);