var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({
    title: String,
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
    console.log('liking')
    if (~likesIndex) {
        this.likes.splice(likesIndex, 1);
        this.points -= 1;
    } else {
        if (~dislikesIndex) {
            this.dislikes.splice(dislikesIndex, 1);
            this.points += 1;
        }
        this.likes = this.likes.concat([user._id]);
        console.log(this.likes);
        this.points += 1;
    }
    this.save(cb);
};

PostSchema.methods.dislike = function(user, cb) {
    var likesIndex = this.likes.indexOf(user._id);
    var dislikesIndex = this.dislikes.indexOf(user._id);
    if (~dislikesIndex) {
        this.dislikes.splice(dislikesIndex, 1);
        this.points += 1;
    } else {
        if (~likesIndex) {
            this.likes.splice(likesIndex, 1);
            this.points -= 1;
        }
        this.dislikes = this.dislikes.concat([user._id]);
        this.points -= 1;
    }
    this.save(cb);
};

PostSchema.methods.isLiking = function(user) {
    return ~this.likes.indexOf(user._id);
};

PostSchema.methods.isDisliking = function(user) {
    return ~this.dislikes.indexOf(user._id);
};

PostSchema.methods.toJSON = function(user) {
    var obj = this.toObject();
    delete obj.likes;
    delete obj.dislikes;
    if (user) {
        obj.liking = 0;
        if (this.isLiking(user)) obj.liking = 1;
        if (this.isDisliking(user)) obj.liking = -1;
    }
    return obj;
};

mongoose.model('Post', PostSchema);
