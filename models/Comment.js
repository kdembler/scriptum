var mongoose = require('mongoose');

var CommentSchema = new mongoose.Schema({
    body: String,
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    username: {
        type: String
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
    return ~this.likes.indexOf(user._id);
};

CommentSchema.methods.like = function(user, cb) {
    var likesIndex = this.likes.indexOf(user._id);
    if (~likesIndex) {
        this.likes.splice(likesIndex, 1);
        this.points -= 1;
    } else {
        this.likes = this.likes.concat([user._id]);
        this.points += 1;
    }
    this.save(cb);
};

CommentSchema.methods.toJSON = function(user) {
    var obj = this.toObject();
    if (user) {
        obj.liking = this.isLiking(user) ? 1 : 0;
    }
    delete obj.likes;
    return obj;
}

mongoose.model('Comment', CommentSchema);
