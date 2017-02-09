var mongoose = require('mongoose');
var crypto = require('crypto');
var schema = mongoose.Schemas.user;
// var sendMail = require('../helpers/mailer');


var Module = function (models) {
    var UserModel = models.get('user', schema);

    this.getAll = function (req, res, next) {
        var options = req.query;

        UserModel.find({})
            .then(function (docs) {

            })
            .catch(function (err) {
                return next(err);
            });
    };

    this.getOne = function (req, res, next) {

    };
};

module.exports = Module;