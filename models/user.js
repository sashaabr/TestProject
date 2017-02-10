module.exports = (function () {
    var USERS = require('../constants/collections').USERS;
    var mongoose = require('mongoose');
    var ObjectId = mongoose.Schema.Types.ObjectId;

    var schema = mongoose.Schema({
        firstName: {type: String, required: true},
        lastName: {type: String, required: true},
        email: {type: String, unique: true, required: true},
        phone: {type: String, unique: true},
        login: {type: String, unique: true},
        birthDay: {type: Date},
        pass: {type: String, required: true},
        role: {type: String, required: true},
        photo: {
            type: String,
            default: "http://1plusx.com/app/mu-plugins/all-in-one-seo-pack-pro/images/default-user-image.png"
        }
    }, {collection: USERS});

    mongoose.model('user', schema);

    if (!mongoose.Schemas) {
        mongoose.Schemas = {};
    }

    mongoose.Schemas.user = schema;
})();