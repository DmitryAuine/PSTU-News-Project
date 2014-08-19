'use strict';

define([
    'underscore',
    'backbone',
    'text!../templates/index.html',
    'text!../templates/indexLogin.html',
    'text!../templates/view.html'
], function(_, Backbone, NewTemplate, NewLoginTemplate, ViewTemplate) {
    var NewView = Backbone.View.extend({
        className: 'row',
        template: _.template(NewTemplate),
        loginTemplate: _.template(NewLoginTemplate),
        viewTemplate: _.template(ViewTemplate),
        events: {
            'click .action-link-to-view': 'view'
        },
        initialize: function(params) {
            this.isLogin = params.isLogin;
            this.$body = $('body');
        },
        render: function() {
            this.$el.html(this.login ? this.templateLogin(this.model.toJSON()) : 
                    this.template(this.model.toJSON()));
            return this;
        },
        view: function() {
            //Maybe it's not good, but i don't want to create 
            //another yet view just for manipulate it.
            this.$body.css('overflow-y', 'hidden');
            this.viewOverlay = $(this.viewTemplate(this.model.toJSON()))
                    .addClass('animated fadeInRight');
            this.$body.append(this.viewOverlay);
            $('#app-view-close').on('click', this.closeView.bind(this));
        },
        closeView: function() {
            this.viewOverlay.addClass('fadeOutRight');
            this.viewOverlay.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',
                    function() {
                        this.viewOverlay.remove();
                        this.$body.css('overflow-y', 'initial');
                    }.bind(this));
        }
    });
    return NewView;
});