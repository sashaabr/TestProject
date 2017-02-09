module.exports = (function () {
    var CATEGORY = require('../constants/collections').CATEGORY;
    var mongoose = require('mongoose');

    var schema = mongoose.Schema({
        title: {type: String, unique: true}
    }, {collection: CATEGORY});

    mongoose.model('category', schema);

    if (!mongoose.Schemas) {
        mongoose.Schemas = {};
    }

    mongoose.Schemas.category = schema;
})();