const Post = require('../models/post');

module.exports = (app) => {

    // INDEX - all posts
    // stretch challenge - async and await
    app.get('/', async (req, res) => {
    try {
        const posts = await Post.find({}).lean();
        return res.render('posts-index', { posts });
    } catch (err) {
        console.log(err.message);
    }
    });

    // NEW - form
    app.get('/posts/new', (req, res) => {
        res.render('posts-new');
    });

    // CREATE
    app.post('/posts/new', async (req, res) => {
        try {
            // Validate form data
            // Instantiate instance of Post model
            const post = new Post(req.body);
            // Save instance of Post model to DB and redirect to the root
            await post.save();
            res.redirect('/');
        } catch (err) {
            console.log(err);
            res.status(500).send('Server error');
        }
    });


    // SHOW - individual post
    // stretch challenge - async and await
    app.get('/posts/:id', async (req, res) => {
        try {
            const post = await Post.findById(req.params.id).lean().populate('comments');
            return res.render('posts-show', { post });
        } catch (err) {
            console.log(err.message);
        }
    });

      // Subreddit
    app.get('/n/:subreddit', async (req, res) => {
        try {
        const posts = await Post.find({ subreddit: req.params.subreddit }).lean();
        res.render('posts-index', { posts });
        } catch (err) {
        console.log(err.message);
        }
    });


};