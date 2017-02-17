define([
    'Backbone',
    'moment'
], function (Backbone,moment) {
    'use strict';
    var CategoryModel = Backbone.Model.extend({
        idAttribute: '_id',

        defaults: {
            title:'Category'
        },

        urlRoot: function () {
            return '/categories/'
        },

        parse: function (response) {

            return response;
        }
    });


    return CategoryModel;
});