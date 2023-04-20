const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports = (app) => {
    // CREATE Comment
    app.post('/posts/:postId/comments', async (req, res) => {
        try {
            // INSTANTIATE INSTANCE OF MODEL
            const comment = new Comment(req.body);

            // SAVE INSTANCE OF Comment MODEL TO DB
            await comment.save();

            // FIND PARENT POST
            const post = await Post.findById(req.params.postId);

            // ADD COMMENT REFERENCE TO POST
            //unshift adds an element to the front of an array for chronological order
            post.comments.unshift(comment);
            await post.save();

            // REDIRECT TO ROOT
            res.redirect('/');
        } catch (err) {
            console.log(err);
        }
    });
};