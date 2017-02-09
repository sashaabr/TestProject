module.exports = (function () {
    var COMMENTS = require('../constants/collections').COMMENTS;
    var mongoose = require('mongoose');
    var ObjectId = mongoose.Schema.Types.ObjectId;

    var schema = mongoose.Schema({
        title: {type: String},
        body: {type: String, required: true},
        author: {type: ObjectId, ref: 'user'},
        date: {type: Date, required: true}
    }, {collection: COMMENTS});

    mongoose.model('comment', schema);

    if (!mongoose.Schemas) {
        mongoose.Schemas = {};
    }

    mongoose.Schemas.comment = schema;
})();