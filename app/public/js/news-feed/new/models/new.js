'use strict';

define([
    'backbone',
    'events'
], function(Backbone, Events) {

    var NewModel = Backbone.Model.extend({
        defaults: {
            header: '',
            sContent: '',
            content: '',
            time: ''
        },
    });
    return NewModel;
});