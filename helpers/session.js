var ROLES = require('../constants/roles');

var session = function () {
    function create() {

    }

    function destroy() {

    }

    function isAuthenticated(req, res, next) {
        if (req.session && req.session.isLogin && req.session.uID && req.session.uRole) {
            return next();
        }

        var err = new Error('UnAuthorized');

        err.status = 401;

        return next(err);
    }

    function isAdmin(req, res, next) {
        if (req.session && req.session.uRole === ROLES.ADMIN) {
            return next();
        }

        var err = new Error('Forbidden');

        err.status = 403;

        return next(err);
    }

    function isTeacher(req, res, next) {
        if (req.session && (req.session.uRole === ROLES.TEACHER || req.session.uRole === ROLES.ADMIN)) {
            return next();
        }

        var err = new Error('Forbidden');

        err.status = 403;

        return next(err);
    }

    function isStudent(req, res, next) {
        if (req.session && (req.session.uRole === ROLES.STUDENT || req.session.uRole === ROLES.TEACHER || req.session.uRole === ROLES.ADMIN)) {
            return next();
        }

        var err = new Error('Forbidden');

        err.status = 403;

        return next(err);
    }

    return {
        create: create,
        destroy: destroy,
        isAuthenticated: isAuthenticated,
        isAdmin: isAdmin,
        isTeacher: isTeacher,
        isStudent: isStudent
    }
};

module.exports = session;