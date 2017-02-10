var mongoose = require('mongoose');
var crypto = require('crypto');
var schema = mongoose.Schemas.user;
var ROLES = require('../constants/roles');
// var sendMail = require('../helpers/mailer');


var Module = function (models) {
    var UserModel = models.get('user', schema);

    this.getAll = function (req, res, next) {
        var options = req.query;

        UserModel.find({})
            .then(function (docs) {
                return res.send(docs);
            })
            .catch(function (err) {
                return next(err);
            });
    };

    this.getOne = function (req, res, next) {
        var id = req.params.id;
        var query = {_id: id};

        UserModel.findOne(query)
            .then(function (doc) {
                return res.send(doc);
            })
            .catch(function (err) {
                return next(err);
            });
    };

    this.create = function (req, res, next) {
        var options = req.body;
        var searchQuery;

        if (checkUserField(options)) {
            searchQuery = {
                $or: [{
                    email: options.email
                }, {
                    login: options.login
                }]
            };

            UserModel.findOne(searchQuery)
                .then(function (doc) {
                    if (doc) {
                        return res.status(400).send('Email and/or login must be unique!');
                    } else {
                        return res.send()
                    }
                })
                .catch(function (err) {
                    return next(err);
                });
        } else {
            return res.status(400).send('Invalid data!');
        }
    };

    this.update = function (req, res, next) {
        var id = req.params.id;
        var searchQuery = {_id: id};

        UserModel.findOne(searchQuery)
            .then(function (doc) {
                if (doc) {
                    return res.status(400).send('Email and/or login must be unique!');
                } else {
                    return res.send()
                }
            })
            .catch(function (err) {
                return next(err);
            });
    };

    this.remove = function (req, res, next) {

    };

    function checkUserField(user) {
        var firstName = user.firstName ? user.firstName.trim() : null;
        var lastName = user.lastName ? user.lastName.trim() : null;
        var email = user.email ? user.email.trim() : null;
        var login = user.login ? user.login.trim() : null;
        var pass = user.pass ? user.pass.trim() : null;

        return firstName && lastName && email && login && pass;
    }
};

module.exports = Module;