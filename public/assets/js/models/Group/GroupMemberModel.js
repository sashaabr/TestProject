define([
    'Backbone',
    'moment'
], function (Backbone,moment) {
    'use strict';
    var MemberModel = Backbone.Model.extend({
        idAttribute: '_id',

        defaults: {
            date : new Date(),
            birthday: Date.now()

        },

        urlRoot: function () {
            return '/groups/members/'
        },

        parse: function (response) {

            response.birthDay && (response.birthDay = moment(response.birthDay).format('YYYY-MM-DD'));
            return response;
        }
    });

    return MemberModel;
});