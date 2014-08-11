'use strict';

define([
    'backbone',
    './news-feed/views/index'
], function(Backbone, NewsFeed) {
    var ApplicationView = Backbone.View.extend({
        el: '#application',
        initialize: function() {
            this.initNewsFeed();
        },
        render: function() {
            return this;
        },
        initNewsFeed: function() {
            this.NewsFeed = new NewsFeed();
            this.$el.append(this.NewsFeed.render().el);
        }
    });
    return ApplicationView;
});