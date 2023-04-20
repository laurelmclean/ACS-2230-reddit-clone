const jwt = require('jsonwebtoken');
const User = require('../models/user');

module.exports = (app) => {

    // SIGN UP FORM
    app.get('/sign-up', (req, res) => res.render('sign-up'));

    // SIGN UP POST
    app.post('/sign-up', async (req, res) => {
        try {
            // Create User
            const user = new User(req.body);
            await user.save();

            // Create JWT token
            const token = jwt.sign({ _id: user._id }, process.env.SECRET, { expiresIn: "60 days" });

            // Set cookie
            res.cookie('nToken', token, { maxAge: 900000, httpOnly: true });
            res.redirect('/');

        } catch (err) {
            if (err.name === 'MongoError' && err.code === 11000) {
                // Duplicate key error - username already taken
                return res.status(409).send('Username already taken');
            }
            console.log(err);
            res.status(500).send('Internal Server Error');
        }
    });

    // LOGOUT
    app.get('/logout', (req, res) => {
        res.clearCookie('nToken');
        return res.redirect('/');
    });

};