var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Post = require('Post');
var Comment = require('Comment');
var User = require('User');

var passport = require('passport');
var jwt = require('express-jwt');
var auth = jwt({secret: process.env.SCRIPTUM_KEY, userProperty: 'payload'});

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});



module.exports = router;
