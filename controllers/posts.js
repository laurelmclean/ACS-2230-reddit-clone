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

    // Create a post
    app.post('/posts/new', async (req, res) => {
        // INSTANTIATE INSTANCE OF POST MODEL
        if (req.user) {
            try {
                const userId = req.user._id;
                const currentUser = req.user;
                subredditArray = req.body.subreddits.replaceAll(' ', '').split(',');
                req.body.subreddits = subredditArray;
                const post = new Post(req.body);
                post.upVotes = [];
                post.downVotes = [];
                post.voteScore = 0;
                post.author = userId;
                await post.save();
                const user = await User.findById(userId);
                user.posts.unshift(post);
                await user.save();
                return res.redirect('/');
            } catch (err) {
                console.log(err.message);
            }
        } else {
            return res.status(401); // UNAUTHORIZED
        }
    });

    // SHOW - individual post
    // stretch challenge - async and await
    app.get('/posts/:id', async (req, res) => {
        const currentUser = req.user;
        try {
            const post = await Post.findById(req.params.id).populate('comments').lean();
            return res.render('posts-show', { post, currentUser });
        } catch (err) {
            console.log(err.message);
        }
    });

      // Subreddit
    app.get('/n/:subreddit', async (req, res) => {
        const { user } = req;
        try {
            const posts = await Post.find({ subreddit: req.params.subreddit }).lean();
        res.render('posts-index', { posts, user });
        } catch (err) {
        console.log(err.message);
        }
    });

    // Votes

    app.put('/posts/:id/vote-up', async (req, res) => {
        try {
            const post = await Post.findById(req.params.id);
            post.upVotes.push(req.user._id);
            post.voteScore = (post.voteScore || 0) + 1; // Check if voteScore is null or undefined, and set to 0 if it is
            await post.save();
            return res.status(200);
        } catch (err) {
            console.log(err);
        }
    });

    app.put('/posts/:id/vote-down', async (req, res) => {
        try {
            const post = await Post.findById(req.params.id);
            post.downVotes.push(req.user._id);
            post.voteScore = (post.voteScore || 0) - 1; // Check if voteScore is null or undefined, and set to 0 if it is
            await post.save();
            return res.status(200);
        } catch (err) {
            console.log(err);
        }
    });



};