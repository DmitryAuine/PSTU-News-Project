'use strict';

define([
    'underscore',
    'backbone',
    'text!../templates/index.html',
    'text!../templates/view.html'
], function(_, Backbone, NewTemplate, ViewTemplate) {
    var NewView = Backbone.View.extend({
        className: 'row',
        template: _.template(NewTemplate),
        viewTemplate: _.template(ViewTemplate),
        events: {
            'click .action-link-to-view': 'view'
        },
        initialize: function() {
            this.$body = $('body');
        },
        render: function() {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        },
        view: function() {
            //Maybe it's not good, but i don't want to create 
            //another yet view just for manipulate it.
            this.viewOverlay = $(this.viewTemplate(this.model.toJSON()))
                    .addClass('animated fadeInRight');
            $('body').append(this.viewOverlay);
            $('#app-view-close').on('click', this.closeView.bind(this));
        },
        closeView: function() {
            this.viewOverlay.addClass('fadeOutRight');
            this.viewOverlay.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',
                    function() {
                        this.viewOverlay.remove();
                    }.bind(this));
        }
    });
    return NewView;
});