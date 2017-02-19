define([
    'jQuery',
    'Underscore',
    'Backbone',
    'text!templates/categories/editCategory.html',
    'models/Category/CategoryModel'

], function($, _, Backbone, EditTemp, CategoryModel) {
    var EditView;
    EditView = Backbone.View.extend({

        el: '#editWrapper',

        template: _.template(EditTemp),

        initialize: function() {
            this.model || (this.model = new CategoryModel());

            this.render();
        },

        events: {
            'submit #categoryEditForm': 'categorySave',
            'click #cancelBtn'   : 'formHide'
        },

        categorySave: function(ev) {
            ev.preventDefault();

            var self = this;
            var saveData = {};
            var $formContainer = this.$el.find('#categoryEditForm');

            var title = $formContainer.find('#title').val();

            if (!title) {
                return alert('Is required field!')
            }

            title && (saveData.title = title);


            this.model.save(saveData, {
                wait   : true,
                patch  : true,
                success: function() {
                    self.collection.add(self.model);
                    self.$el.slideUp();
                },
                error  : function() {
                    alert('Error on save');
                }
            });
        },

        formHide: function(ev) {
            this.$el.slideUp();
        },

        render: function() {
            var modelData = this.model.toJSON();

            this.$el.html(this.template({
                item: modelData
            }));
            this.$el.slideDown();

            return this;
        }

    });

    return EditView;

});
