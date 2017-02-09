module.exports = (function () {
    var GROUPS = require('../constants/collections').GROUPS;
    var mongoose = require('mongoose');
    var ObjectId = mongoose.Schema.Types.ObjectId;

    var schema = mongoose.Schema({
        title: {type: String, required: true},
        students: [{type: ObjectId, ref: 'user'}]
    }, {collection: GROUPS});

    mongoose.model('group', schema);

    if (!mongoose.Schemas) {
        mongoose.Schemas = {};
    }

    mongoose.Schemas.group = schema;
})();