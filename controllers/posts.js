const Post = require('../models/post');
const User = require('../models/user');
const Comment = require('../models/comment');

module.exports = (app) => {
    // INDEX - all posts
    // stretch challenge - async and await
    app.get('/', async (req, res) => {
        const currentUser = req.user;
        try {
            const posts = await Post.find({}).lean().populate('author');
            return res.render('posts-index', { posts, currentUser });
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
            if (req.user) {
                const userId = req.user._id;
                const post = new Post(req.body);
                post.author = userId;

                await post.save();
                const user = await User.findById(userId);
                user.posts.unshift(post);
                await user.save();

                // REDIRECT TO THE NEW POST
                return res.redirect(`/posts/${post._id}`);
            } else {
                return res.status(401); // UNAUTHORIZED
            }
        } catch (err) {
            console.log(err.message);
        }
    });

    // SHOW - individual post
    // stretch challenge - async and await
    app.get('/posts/:id', async (req, res) => {
        try {
            const post = await Post.findById(req.params.id).lean().populate('comments').populate('author');
            return res.render('posts-show', { post });
        } catch (err) {
            console.log(err.message);
        }
    });

      // Subreddit
    app.get('/n/:subreddit', async (req, res) => {
        try {
            const posts = await Post.find({ subreddit: req.params.subreddit }).lean().populate('author');
        res.render('posts-index', { posts });
        } catch (err) {
        console.log(err.message);
        }
    });


};