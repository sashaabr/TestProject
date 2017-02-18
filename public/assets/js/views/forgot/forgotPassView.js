define([
    'Backbone',
    'Underscore',
    '../../models/User/UserModel',
    'text!templates/forgotpasss/forgotPassword.html'
], function (Backbone, _, UserModel, forgotTemplate) {
    var View = Backbone.View.extend({
        el: "#wrapper",
        template: _.template(forgotTemplate),

        events: {
            'click #sendPass': 'sendPassword'
        },

        initialize: function (options) {
            this.render();
        },

        sendPassword: function (e) {
            e.preventDefault();

            var $reset = this.$el.find('#uemail');
            var email = $reset.val();

            if(!email) {
                return alert("Is required field! Enter your email!");
            }

            var saveData = {
                email: email
            };

            var user = new UserModel(saveData);
            user.urlRoot = '/reset';

            user.save(null, {
                success: function (response, xhr) {
                    if (response.attributes.fail) {
                        alert(response.attributes.fail);
                        console.log(response.attributes.fail);
                    } else {
                        Backbone.history.navigate('/login', {trigger: true});
                    }
                },
                error: function (err, xhr) {
                    alert('Error');
                }
            });
        },

        render: function () {
            var self = this;
            this.$el.html(this.template());
            return this;
        }
    });

    return View;
});
