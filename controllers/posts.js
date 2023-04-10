const Post = require('../models/post');

module.exports = (app) => {

    // NEW
    app.get('/posts/new', (req, res) => {
        res.render('posts-new')
    });

    // CREATE
    app.post('/posts/new', (req, res) => {
        // INSTANTIATE INSTANCE OF POST MODEL
        const post = new Post(req.body);

        // SAVE INSTANCE OF POST MODEL TO DB AND REDIRECT TO THE ROOT
        post.save()
            .then(() => {
                res.redirect('/')
            })
            .catch(err => console.log(err))
    });
};