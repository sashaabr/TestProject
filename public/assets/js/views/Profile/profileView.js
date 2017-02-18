define([
    'Backbone',
    'Underscore',
    '../../models/User/UserModel',
    'text!templates/profile.html',
    'text!templates/profileEdit.html'
], function (Backbone, _, UserModel, profileTemplate, profileEditTemplate) {
    var View = Backbone.View.extend({
        el: "#profile",
        template: _.template(profileTemplate),

        events: {
            'click #editProfileBtn': 'edit',
            'click #cancelBtn': 'cancel',
            'click #saveBtn': 'save'
        },

        edit: function (e) {
            var self = this;
            e.preventDefault();
            self.template = _.template(profileEditTemplate);
            self.render();
        },

        cancel: function (e) {
            var self = this;
            e.preventDefault();
            self.template = _.template(profileTemplate);
            self.render();
        },

        save: function (e) {
            var self = this;
            e.preventDefault();

            var user = self.model;


            var firstName = this.$el.find('#firstName').val();
            var lastName = this.$el.find('#lastName').val();
            var dateOfBirth = this.$el.find('#birthDay').val();
            var phone = this.$el.find('#phone').val();
            var email = this.$el.find('#email').val();
            var password = this.$el.find('#password').val();
            var photo = this.$el.find('#photoURL').val();


            var data = {

                firstName: firstName,
                lastName: lastName,
                dateOfBirth: dateOfBirth,
                phone:phone,
                email: email,
                password: password,
                photo: photo

            };

            user.validate = function(attrs, options) {
                if (!(attrs.firstName && attrs.lastName && attrs.email && attrs.location && attrs.dateOfBirth)) {
                    alert("Required fields can't be empty")
                    return "Required fields can't be empty";
                }
            };

            user.save(data, {
                success: function (response, xhr) {
                    self.template = _.template(profileTemplate);
                    self.render();
                },
                error: function (err, xhr) {
                    alert('Some error');
                }
            });
        },


        initialize: function (options) {
            var self = this;
            var user = new UserModel();
            this.model = user;
            user.fetch({
                success: function () {
                    var $friendsCounter = $('#friendsCount');
                    var $userNameLogo = $("#userName");
                    var friendsCount = user.get('friends').length;

                    APP.me = APP.me || user;
                    $friendsCounter.html(friendsCount);
                    $userNameLogo.html(user.get('firstName'));
                    self.render();
                },
                error: function (err, xhr) {
                    alert('Some error');
                }
            });
        },


        render: function () {
            var self = this;
            this.$el.html(this.template({user: self.model.attributes}));

            return this;
        }
    });

    return View;
});
