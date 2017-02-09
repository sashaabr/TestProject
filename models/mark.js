module.exports = (function () {
    var MARKS = require('../constants/collections').MARKS;
    var mongoose = require('mongoose');
    var ObjectId = mongoose.Schema.Types.ObjectId;

    var schema = mongoose.Schema({
        student: {type: ObjectId, ref: 'user'},
        value: {type: String, unique: true},
        date: {type: Date, required: true}
    }, {collection: MARKS});

    mongoose.model('mark', schema);

    if (!mongoose.Schemas) {
        mongoose.Schemas = {};
    }

    mongoose.Schemas.mark = schema;
})();