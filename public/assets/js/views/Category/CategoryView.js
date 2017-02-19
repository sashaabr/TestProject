define([
    'Backbone',
    'Underscore',
    'text!templates/categories/header.html',
    'text!templates/categories/categoriesList.html',
    '../../collections/Categories/CategoryCollection'
], function (Backbone, _, headerTemplate, listTemplate, Collection) {
    'use strict';

    var ListView = Backbone.View.extend({
        el            : '#listWrapper',
        headerTemplate: _.template(headerTemplate),
        listTemplate  : _.template(listTemplate),

        initialize: function (options) {
            this.contentType = options.contentType || 'No contentType';
            this.collection = new Collection({
                page       : 1,
                count      : 20,
                contentType: 'Users'
            });
            this.collection.on('reset', this.renderCategories, this);
            this.collection.on('add change', this.render, this);

            this.render();
        },

        events: {
            'click .deleteBtn': 'handleDeleteCategory'
        },



        handleDeleteCategory: function (ev) {
            if (!confirm('Do you realy want to delete this category ??')) {
                return;
            }

            var $target = $(ev.target);
            var $row = $target.closest('tr');
            var categoryId = $row.data('id');

            var categoryModel = this.collection.get(categoryId);

           categoryModel.destroy({
                success: function () {
                    $row.remove();
                },
                error  : function () {
                    alert('Error on delete');
                }
            });
        },

        renderCategories: function () {
            var $el = this.$el;
            var users = this.collection.toJSON();

            $el
                .find('#listWrapper')
                .find('[data-id=' + id + ']')
                .replaceWith(this.newRowTemplate(model))
                .html(this.listTemplate({users: users}));
        },

        render: function () {


            this.$el.html(this.headerTemplate({contentType: this.contentType}));

            this.collection.fetch({reset: true});

            return this;
        }
    });

    return ListView;
});