'use strict';

define([
    'backbone',
    '../new/collections/news',
    '../new/views/index'
], function(Backbone, NewsList, NewView) {
    var NewsFeedView = Backbone.View.extend({
        id: 'news',
        className: 'news',
        initialize: function() {
            this.listenTo(NewsList, 'reset', this.addNews);
            NewsList.fetch({reset: true});
        },
        render: function() {
            return this;
        },
        addNews: function() {
            NewsList.each(function(newModel) {
                this.addNew(newModel);
            }, this);
        },
        addNew: function(newModel) {
            this.$el.append(this.createNewView(newModel).render().el);
        },
        viewNew: function() {

        },
        createNewView: function(newModel) {
            return new NewView({model: newModel});
        },
        editNew: function() {

        },
        removeNew: function() {

        }
    });
    return NewsFeedView;
});