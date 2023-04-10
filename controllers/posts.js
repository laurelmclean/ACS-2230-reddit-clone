const Post = require('../models/post');

module.exports = (app) => {

    // INDEX
    app.get('/', (req, res) => {
        Post.find({}).lean()
            .then((posts) => res.render('posts-index', { posts }))
            .catch((err) => {
                console.log(err.message);
            })
    })

    // NEW
    app.get('/posts/new', (req, res) => {
        res.render('posts-new');
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