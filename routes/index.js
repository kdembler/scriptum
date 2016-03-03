var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Post = mongoose.model('Post');
var Comment = mongoose.model('Comment');
var User = mongoose.model('User');

var passport = require('passport');
var jwt = require('express-jwt');
var authNR = jwt({
    secret: process.env.SCRIPTUM_KEY,
    userProperty: 'payload',
    credentialsRequired: false
});
var auth = jwt({
    secret: process.env.SCRIPTUM_KEY,
    userProperty: 'payload',
    credentialsRequired: true
});

router.get('/', function(req, res, next) {
    res.render('index', {
        title: 'Express'
    });
});

router.param('post', function(req, res, next, id) {
    Post.findById(id, function(err, post) {
        if (err) return next(err);
        if (!post) return next(new Error('can\'t find post'));

        req.post = post;
        return next();
    });
});

router.param('comment', function(req, res, next, id) {
    Comment.findById(id, function(err, comment) {
        if (err) return next(err);
        if (!comment) return next(new Error('can\'t find comment'));

        req.comment = comment;
        return next();
    });
});

router.get('/posts', authNR, function(req, res, next) {
    Post.find().populate('comments').exec(function(err, posts) {
        if (err) return next(err);

        var response = [];
        posts.forEach(function(post, index, array) {
            response.push(post.toJSON());

            var liking = 0;
            if(req.payload) {
                if (post.isLiking(req.payload))
                    liking = 1;
                else if (post.isDisliking(req.payload))
                    liking = -1;
            }
            response[index].liking = liking;
        });
        res.json(response);
    });
});

router.post('/posts', auth, function(req, res, next) {
    var post = new Post(req.body);

    console.log(req.payload);
    post.author = req.payload._id;

    post.save(function(err, post) {
        if (err) {
            console.log(err);
            return next(err);
        }

        res.json(post);
    });
});

// router.get('/posts/:post', auth, function(req, res, next) {
//     req.post.populate('comments', function(err, post) {
//         if (err) return next(err);

//         if (post.isLiking(req.payload))
//             post.liking = 1;
//         else if (post.isDisliking(req.payload))
//             post.liking = -1;
//         else
//             post.liking = 0;
//         res.json(post);
//     });
// });

// router.get('/posts/:post', function(req, res, next) {
//     req.post.populate('comments', function(err, post) {
//         if (err) return next(err);

//         res.json(post);
//     });
// });

router.put('/posts/:post/like', auth, function(req, res, next) {
    req.post.like(req.payload, function(err, post) {
        if (err) return next(err);

        var response = post.toJSON();

        if (post.isLiking(req.payload))
            response.liking = 1;
        else
            response.liking = 0;
        console.log(response);
        res.json(response);
    });
});

router.put('/posts/:post/dislike', auth, function(req, res, next) {
    req.post.dislike(req.payload, function(err, post) {
        if (err) return next(err);

        var response = post.toJSON();

        if (post.isDisliking(req.payload))
            response.liking = -1;
        else
            response.liking = 0;
        res.json(response);
    });
});

router.post('/posts/:post/comments', auth, function(req, res, next) {
    var comment = new Comment(req.body);
    comment.post = req.post;
    comment.author = req.payload.username;

    comment.save(function(err, comment) {
        if (err) return next(err);

        req.post.comments.push(comment);
        req.post.save(function(err, post) {
            if (err) return next(err);

            res.json(comment);
        });
    });
});

router.put('/posts/:post/comments/:comment/like', auth, function(req, res, next) {
    req.comment.like(req.payload, function(err, comment) {
        if (err) return next(err);

        if (comment.isLiking(req.payload))
            comment.liking = 1;
        else
            comment.liking = 0;

        res.json(comment);
    });
});

router.post('/register', function(req, res, next) {
    if (!req.body.username || !req.body.password || !req.body.repeat)
        return res.status(400).json({
            message: 'Please fill out all fields.'
        });
    if (req.body.password != req.body.repeat)
        return res.status(400).json({
            message: 'Passwords do not match.'
        });
    var isAlreadyUsed = false;

    User.count({ username: req.body.username }, function(err, count) {
        if (err) return next(err);

        if (count > 0)
            isAlreadyUsed = true;
    }).then(function() {
        if (isAlreadyUsed) {
            return res.status(400).json({
                message: 'Username already in use.'
            });
        }
        var user = new User();

        user.username = req.body.username;
        user.setPassword(req.body.password);

        user.save(function(err) {
            if (err) return next(err);

            return res.json({
                token: user.generateJWT()
            });
        });
    });
});

router.post('/login', function(req, res, next) {
    if (!req.body.username || !req.body.password)
        return res.status(400).json({
            message: 'Please fill out all fields.'
        });
    passport.authenticate('local', function(err, user, info) {
        if (err) return next(err);
        if (user) {
            return res.json({
                token: user.generateJWT()
            });
        } else {
            return res.status(401).json(info);
        }
    })(req, res, next);
});


module.exports = router;
