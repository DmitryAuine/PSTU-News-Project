'use strict';

define([
    'backbone',
    './news-feed/views/index'
], function(Backbone, NewsFeed) {
    var ApplicationView = Backbone.View.extend({
        el: '#application',
        initialize: function() {
            this.initNewsFeed();
//            dpd.on('test', function(){alert()});
        },
        render: function() {
            this.$el.append(this.NewsFeed.render().el);
            return this;
        },
        initNewsFeed: function() {
            this.NewsFeed = new NewsFeed();
        }
    });
    return ApplicationView;
});