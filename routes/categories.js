var express = require('express');
var router = express.Router();
var Handler = require('../handlers/categories');

module.exports = function (models) {
    var handler = new Handler(models);

    router.get('/categories', handler.getAll);

    router.post('/categories', handler.createCategory);

    router.route('/categories/:id')
        .get(handler.getOne)
        .post(handler.update)
        .delete(handler.remove);

    return router;
};