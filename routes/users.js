var express = require('express');
var router = express.Router();
var Handler = require('../handlers/users');

module.exports = function (models) {
    var handler = new Handler(models);

    router.get('/', handler.getAll);

    router.post('/', handler.create);

    router.route('/:id')
        .get(handler.getOne)
        .post(handler.update)
        .delete(handler.remove);

    return router;
};