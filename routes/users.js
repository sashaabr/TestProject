var express = require('express');
var router = express.Router();
var Handler = require('../handlers/users');
var Session = require('../helpers/session')();

module.exports = function (models) {
    var handler = new Handler(models);

    router.get('/', /*Session.isAuthenticated,*/ handler.getAll);
    //First check session, next get all users

    router.post('/', handler.create);

    router.route('/:id')
        .get(handler.getOne)
        .post(handler.update)
        .delete(handler.remove);

    return router;
};