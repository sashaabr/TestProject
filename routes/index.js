module.exports = function (app, db) {
    'use strict';

    app.get('/', function (req, res, next) {
        res.sendfile('index.html');
    });

    app.use(errHandler);

    function errHandler(err, req, res, next) {
        var status = err.status || 500;
        var msg;

        if (err.status != 200) {
            msg = err.message;
        }

        if (process.env.NODE_ENV === 'production') {
            res.status(status).send({error: msg});
        } else {
            res.status(status).send({error: msg + '\n' + err.stack});
        }
    };
};