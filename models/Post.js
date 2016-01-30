var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({
    body: String,
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    points: {
        type: Number,
        default: 0
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    dislikes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }]
});

PostSchema.methods.like = function(user, cb) {
    var likesIndex = this.likes.indexOf(user._id);
    var dislikesIndex = this.dislikes.indexOf(user._id);
    if (~likesIndex) {
        this.likes.splice(likesIndex, 1);
        this.points -= 1;
    } else {
        if (~dislikesIndex) {
            this.dislikes.splice(dislikesIndex, 1);
        }
        this.likes.push(user._id);
        this.points += 1;
    }
    this.save(cb);
};

PostSchema.methods.dislike = function(user, cb) {
    var likesIndex = this.likes.indexOf(user._id);
    var dislikesIndex = this.dislikes.indexOf(user._id);
    if (~dislikesIndex) {
        this.dislikes.splice(likesIndex, 1);
        this.points += 1;
    } else {
        if (~likesIndex) {
            this.likes.splice(dislikesIndex, 1);
        }
        this.dislikes.push(user._id);
        this.points -= 1;
    }
    this.save(cb);
};

PostSchema.methods.toJSON = function() {
    var obj = this.toObject();
    delete obj.likes;
    delete obj.dislikes;
    return obj;
};

mongoose.model('Post', PostSchema);
