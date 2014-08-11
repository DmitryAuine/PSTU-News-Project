'use strict';

define([
    'backbone'
], function(Backbone) {

    var NewModel = Backbone.Model.extend({
        defaults: {
            header: '',
            sContent: '',
            content: '',
            time: ''
        }
    });
    return NewModel;
});