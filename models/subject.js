module.exports = (function () {
    var SUBJECTS = require('../constants/collections').SUBJECTS;
    var mongoose = require('mongoose');
    var ObjectId = mongoose.Schema.Types.ObjectId;

    var schema = mongoose.Schema({
        title: {type: String, required: true},
        description: {type: String, required: true},
        teacher: {type: ObjectId, ref: 'user'}
    }, {collection: SUBJECTS});

    mongoose.model('subject', schema);

    if (!mongoose.Schemas) {
        mongoose.Schemas = {};
    }

    mongoose.Schemas.subjects = schema;
})();