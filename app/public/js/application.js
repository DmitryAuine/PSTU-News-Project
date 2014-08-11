'use strict';

define([
    'backbone'
], function(Backbone) {
    var ApplicationView = Backbone.View.extend({
        el: '#application',
        initialize: function() {
        },
        render: function() {
            return this;
        }
    });
    return ApplicationView;
});