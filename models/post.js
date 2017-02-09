module.exports = (function () {
    var POSTS = require('../constants/collections').POSTS;
    var mongoose = require('mongoose');
    var ObjectId = mongoose.Schema.Types.ObjectId;

    var schema = mongoose.Schema({
        title: {type: String, required: true},
        body: {type: String, required: true},
        shotDescription: {type: String},
        date: {type: Date, required: true},
        author: {type: ObjectId, ref: 'user', required: true},
        category: [{type: ObjectId, ref: 'category', required: true}]
    }, {collection: POSTS});

    mongoose.model('post', schema);

    if (!mongoose.Schemas) {
        mongoose.Schemas = {};
    }

    mongoose.Schemas.user = schema;
})();