/**
 * Created by Asus on 15.02.2017.
 */
var mongoose = require('mongoose');
var crypto = require('crypto');
var schema = mongoose.Schemas.post;
var ROLES = require('../constants/roles');

var Module = function (models){

    var PostModel = models.get('post', schema);
    // get all posts
    this.getAll = function (req, res, next) {
        PostModel.find({}, function(err, posts){
            if (err) res.send(err);

            res.status(200).send(posts);
        });
    };
   // get one
    this.getOne = function (req, res, next) {
        var id = req.params.id;
        var query = {_id: id};

        PostModel.findOne(query)
            .then(function (doc) {
                return res.send(doc);
            })
            .catch(function (err) {
                return next(err);
            });
    };

    // add a post
    this.createPost = function (req, res, next) {

        var post = new PostModel();
        post.title = req.body.title;
        post.body = req.body.body;
        post.shotDescription = req.body.shotDescription;
        post.author = req.body.author;
        post.category = req.body.category;
        post.date = req.body.date;

        post.save(function(err, post){
            if(err) res.send(err);

            res.status(200).send(post);
        });
    };
    
    this.update = function (req, res, next) {
        var id = req.params.id;
        var searchQuery = {_id: id};

        PostModel.findById(searchQuery, function(err, post){
            if(err) res.send(err);

            post.title = req.body.title;
            post.body = req.body.body;
            post.shotDescription = req.body.shotDescription;
            post.author = req.body.author;
            post.category = req.body.category;
            post.date = req.body.date;

            post.save(function(err){
                if(err) res.send(err);

                res.status(200).send(post);
            })
        });
    };

    this.remove = function (req, res, next) {
        var id = req.params.id;
        var searchQuery = {_id: id};
        PostModel.remove(searchQuery, function(err, post){
            if(err) res.send(err);

            res.status(200).send({success: post + ' Post have been removed'});
        })
    };

};

module.exports = Module;