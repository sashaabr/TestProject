var express = require('express');
var router = express.Router();
var Handler = require('../handlers/subjects');

module.exports = function (models) {
    var handler = new Handler(models);

    router.get('/subjects', handler.getAll);

    router.post('/subjects', handler.createSubject());

    router.route('/subjects/:id')
        //.get(handler.getOne)
        .post(handler.update)
        .delete(handler.remove);

    return router;
};