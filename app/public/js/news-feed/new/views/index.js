'use strict';

define([
    'underscore',
    'backbone',
    'text!../templates/index.html'
], function(_, Backbone, NewTemplate) {
    var NewView = Backbone.View.extend({
        className: 'row',
        template: _.template(NewTemplate),
        initialize: function() {
        },
        render: function() {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        }
    });
    return NewView;
});