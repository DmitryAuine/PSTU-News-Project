'use strict';

define([
    'underscore',
    'backbone',
    '../new/collections/news',
    '../new/models/new',
    '../new/views/index',
    'text!../templates/template.html',
    'events'
], function(_, Backbone, NewsList, NewModel, NewView, Template, Events) {
    var NewsFeedView = Backbone.View.extend({
        id: 'news',
        className: 'news',
        PROPAGATION_FORWARD: 0,
        PROPAGATION_BACK: 1,
        _currentSkip: 0,
        events: {
            'click [data-propagation]': 'propagation'
        },
        initialize: function(params) {
            this.isLogin = params.isLogin;
            this.initListenrs();
            this.fetchNews(5);
        },
        fetchNews: function(limit) {
            Events.trigger('news:fetch');
            NewsList.fetch({reset: true, data: {
                    $skip: this._currentSkip,
                    $limit: limit
                }
            });
        },
        render: function() {
            this.$el.html(Template);
            return this;
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
            return new NewView({model: newModel, isLogin: this.isLogin});
        },
        createNewModel: function(newModelJSON) {
            return new NewModel(newModelJSON);
        },
        propagation: function(evt) {
            var propagation = $(evt.target).data('propagation');

            switch (propagation) {
                case this.PROPAGATION_FORWARD:
                    {
                        if (this._currentSkip >= 5) {
                            this._currentSkip -= 5;
                        }
                        break;
                    }
                case this.PROPAGATION_BACK:
                    {
                        this._currentSkip += 5;
                        break;
                    }
            }
            this.fetchNews(5);
        }
    });
    return NewsFeedView;
});