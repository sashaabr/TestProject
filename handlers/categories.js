/**
 * Created by Asus on 15.02.2017.
 */
var mongoose = require('mongoose');
var crypto = require('crypto');
var schema = mongoose.Schemas.category;
var ROLES = require('../constants/roles');

var Module = function (models){

    var CategoryModel = models.get('category', schema);

    // get all categories студент
    this.getAll = function (req, res, next) {
        CategoryModel.find({}, function(err, category){
            if (err) res.send(err);

            res.status(200).send(category);
        });
    };
    // get one category // студент може- вибирати категорії постів.

    this.getOne = function (req, res, next) {
        var id = req.params.id;
        var query = {_id: id};

        CategoryModel.findOne(query)
            .then(function (doc) {
                return res.send(doc);
            })
            .catch(function (err) {
                return next(err);
            });
    };

    // admin : add category
    this.createCategory = function (req, res, next) {

        var category = new CategoryModel();
        category.title = req.body.title;

        category.save(function(err, category){
            if(err) res.send(err);

            res.status(200).send(category);
        });
    };
//admin can redact category
    this.update = function (req, res, next) {
        var id = req.params.id;
        var searchQuery = {_id: id};

        CategoryModel.findById(searchQuery, function(err, category){
            if(err) res.send(err);

            category.title = req.body.title;
            category.save(function(err){
                if(err) res.send(err);

                res.status(200).send(category);
            })
        });
    };
//admin can remove category
    this.remove = function (req, res, next) {
        var id = req.params.id;
        var searchQuery = {_id: id};
        CategoryModel.remove(searchQuery, function(err, category){
            if(err) res.send(err);

            res.status(200).send({success: category + ' Category have been removed'});
        })
    };

};

module.exports = Module;