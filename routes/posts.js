
var express = require('express');
var router = express.Router();
var Handler = require('../handlers/post');

module.exports = function (models) {
    var handler = new Handler(models);

    router.get('/posts', handler.getAll);

    router.post('/posts', handler.createPost);

    router.route('/posts/:id')
        .get(handler.getOne)//// get a single post
        .post(handler.update)
        .delete(handler.remove);

    return router;
};