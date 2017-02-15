var mongoose = require('mongoose');
var crypto = require('crypto');
var schema = mongoose.Schemas.subject;
var ROLES = require('../constants/roles');

var Module = function (models){

    var SubjectModel = models.get('subject', schema);
//
    this.getAll = function (req, res, next) {
        SubjectModel.find({}, function(err, subjects){
            if (err) res.send(err);

            res.status(200).send(subjects);
        });
    };

    // admin can add subject
    this.createSubject = function (req, res, next) {

        var subject = new SubjectModel();
        subject.title = req.body.title;
        subject.description = req.body.description;
        subject.teacher = req.body.teacher;


        subject.save(function(err, subject){
            if(err) res.send(err);

            res.status(200).send(subject);
        });
    };

    //adnmin can update sub
    this.update = function (req, res, next) {
        var id = req.params.id;
        var searchQuery = {_id: id};

        SubjectModel.findById(searchQuery, function(err, subject){
            if(err) res.send(err);

            subject.title = req.body.title;
            subject.description = req.body.description;
            subject.teacher = req.body.teacher;

            subject.save(function(err){
                if(err) res.send(err);

                res.status(200).send(subject);
            })
        });
    };

    //admin can remove sub
    this.remove = function (req, res, next) {
        var id = req.params.id;
        var searchQuery = {_id: id};
        SubjectModel.remove(searchQuery, function(err, subject){
            if(err) res.send(err);

            res.status(200).send({success: subject + ' Subject have been removed'});
        })
    };

};

module.exports = Module;