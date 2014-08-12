'use strict';

define([
    'underscore',
    'backbone',
    '../new/collections/news',
    '../new/models/new',
    '../new/views/index'
], function(_, Backbone, NewsList, NewModel, NewView) {
    var NewsFeedView = Backbone.View.extend({
        id: 'news',
        className: 'news',
        initialize: function() {
            this.initListenrs();
            NewsList.fetch({reset: true});
        },
        initListenrs: function() {
            var self = this;
            this.listenTo(NewsList, 'reset', this.addNews);
            dpd.on('new:add', function(newModelJSON) {
                self.addNewOnEmit(self.createNewModel(newModelJSON));
            });
        },
        addNews: function() {
            NewsList.each(function(newModel) {
                this.addNew(newModel);
            }, this);
        },
        addNew: function(newModel) {
            this.$el.prepend(this.createNewView(newModel).render().el);
        },
        addNewOnEmit: function(newModel) {
            var view = this.createNewView(newModel).render();
            view.$el.hide();
            this.$el.prepend(view.el);
            view.$el.slideDown();
        },
        createNewView: function(newModel) {
            return new NewView({model: newModel});
        },
        createNewModel: function(newModelJSON) {
            return new NewModel(newModelJSON);
        }
    });
    return NewsFeedView;
});