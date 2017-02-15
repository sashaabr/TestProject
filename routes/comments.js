var express = require('express');
var router = express.Router();
var Handler = require('../handlers/comments');

module.exports = function (models) {
    var handler = new Handler(models);

    router.get('/comments', handler.getAll);

    router.post('/comments', handler.createComment);

    router.route('/comments/:id')
        .get(handler.getOne)
        .post(handler.update)
        .delete(handler.remove);

    return router;
};