define([
    'Backbone',
    '../../models/User/UserModel'
], function (Backbone, UserModel) {
    'use strict';

    var MembersCollection = Backbone.Collection.extend({
        model: UserModel,
        url  : '/groups/members/',

        initialize: function (options) {
            //this.fetch(options);
        },

        parse: function (response) {
            return response;
        }
    });

    return MembersCollection;
});