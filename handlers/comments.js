/**
 * Created by Asus on 15.02.2017.
 */
var mongoose = require('mongoose');
var crypto = require('crypto');
var schema = mongoose.Schemas.comment;
var ROLES = require('../constants/roles');

var Module = function (models){

    var CommentModel = models.get('comment', schema);
    // get all comments
    this.getAll = function (req, res, next) {
        CommentModel.find({}, function(err, comment){
            if (err) res.send(err);

            res.status(200).send(comment);
        });
    };

    // get one
    this.getOne = function (req, res, next) {
        var id = req.params.id;
        var query = {_id: id};

        CommentModel.findOne(query)
            .then(function (doc) {
                return res.send(doc);
            })
            .catch(function (err) {
                return next(err);
            });
    };

    // Student can add a comment
    this.createComment = function (req, res, next) {

        var comment = new CommentModel();
        comment.title = req.body.title;
        comment.body = req.body.body;
        comment.author = req.body.author;
        comment.date = req.body.date;

        comment.save(function(err, comment){
            if(err) res.send(err);

            res.status(200).send(comment);
        });
    };
//student can updatecomment
    this.update = function (req, res, next) {
        var id = req.params.id;
        var searchQuery = {_id: id};

        CommentModel.findById(searchQuery, function(err, comment){
            if(err) res.send(err);

            comment.title = req.body.title;
            comment.body = req.body.body;
            comment.author = req.body.author;
            comment.date = req.body.date;

            comment.save(function(err){
                if(err) res.send(err);

                res.status(200).send(comment);
            })
        });
    };

    this.remove = function (req, res, next) {
        var id = req.params.id;
        var searchQuery = {_id: id};
        CommentModel.remove(searchQuery, function(err, comment){
            if(err) res.send(err);

            res.status(200).send({success: comment+ ' Comment have been removed'});
        })
    };

};

module.exports = Module;