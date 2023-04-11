const Post = require('../models/post');

module.exports = (app) => {

    // INDEX - all posts
    app.get('/', async (req, res) => {
    try {
        const posts = await Post.find({}).lean();
        return res.render('posts-index', { posts });
    } catch (err) {
        console.log(err.message);
    }
    });

    // SHOW - individual post
    app.get('/posts/:id', async (req, res) => {
        try {
            const post = await Post.findById(req.params.id).lean();
            return res.render('posts-show', { post });
        } catch (err) {
            console.log(err.message);
        }
    });

    // NEW - form
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