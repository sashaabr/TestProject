define([
    'Backbone',
    '../../models/Category/CategoryModel'
], function (Backbone, CategModel) {
    'use strict';
    var CategoriesCollection = Backbone.Collection.extend({
        model: CategModel,
        url  : '/categories/',

        initialize: function (options) {
            //this.fetch(options);
        },

        parse: function (response) {
            return response;
        }
    });

    return CategoriesCollection;
});