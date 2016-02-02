var mongoose = require('mongoose');

var CommentSchema = new mongoose.Schema({
    body: String,
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    },
    points: {
        type: Number,
        default: 0
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
});

CommentSchema.methods.isLiking = function(user) {
    if (~this.likes.indexOf(user._id))
        return true;
    else
        return false;
};

CommentSchema.methods.like = function(user, cb) {
    var likesIndex = this.likes.indexOf(user._id);
    if (~likesIndex) {
        this.likes.splice(likesIndex, 1);
        this.points -= 1;
    } else {
        this.likes.push(user._id);
        this.points += 1;
    }
    this.save(cb);
};

mongoose.model('Comment', CommentSchema);
