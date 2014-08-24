'use strict';

define([
    'backbone',
    './news-feed/views/index',
    'data'
], function(Backbone, NewsFeed, Data) {
    var ApplicationView = Backbone.View.extend({
        el: '#application',
        initialize: function() {
            this.getUserLoginData();
            this.listenTo(this, 'user:inited', this.initNewsFeed);
        },
        render: function() {
            this.$loginPanel = this.$('#login-panel');
            return this;
        },
        initNewsFeed: function(isLogin) {
            this.NewsFeed = new NewsFeed({isLogin: isLogin});
            this.$el.append(this.NewsFeed.render().el);
        },
        getUserLoginData: function() {
            dpd.users.me(function(me) {
                if (me) {
                    this.setUserLoginData(me);
                    this.trigger('user:inited', true);
                } else {
                    this.trigger('user:inited', false);
                }
            }.bind(this));
        },
        setUserLoginData: function(me) {
            this.$loginPanel.html(me.username);
            this.$loginPanel.append('<a href="/postmanager"> / postmanager</a>');
            Data.me = me;
        }
    });
    return ApplicationView;
});