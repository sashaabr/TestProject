define([
    'jQuery',
    'Underscore',
    'Backbone',
    'text!templates/login/login.html',
    '../models/User/UserModel'
], function ($, _, Backbone,LoginTemplate, UserModel) {
    var LoginView;

    LoginView = Backbone.View.extend({
        el: '#wrapper',

        template: _.template(LoginTemplate),

        initialize: function () {
            this.model || (this.model = new UserModel());

            this.render();
        },

        events: {

            'click #uLoginBtn': 'loginBtn'
        },

        login: function(event){
            event.preventDefault();

            var userlogin = $loginform.find('#login').val();
            var userpass =  $loginform.find('#pass').val();

            var data = {
                login: userlogin,
                pass: userpass
            };

            var user = new UserModel(data);
            user.urlRoot = '/login';
            user.save(null, {
                success: function (response, xhr) {
                    if (response.attributes.fail) {
                        alert(response.attributes.fail);
                        console.log(response.attributes.fail);
                    } else {


                        App.authorised = true;
                        localStorage.setItem('loggedIn', 'true');

                        App.myId = response.id;
                        localStorage.setItem('myId', App.myId);

                        App.me = response;

                        Backbone.history.navigate('/main', {trigger: true});
                    }
                },
                error  : function (err, xhr) {
                    alert('Some error');
                }
            });
            // var self = this
        },

        render: function () {

            var self = this;
            this.$el.html(this.template());
            return this;
        }
    });

    return LoginView;

});