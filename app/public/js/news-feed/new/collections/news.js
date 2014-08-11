'use strict';

define([
    'backbone',
    '../models/new',
    'store'
], function(Backbone, NewModel, Store) {
    var NewsList = Backbone.Collection.extend({
        url: '/news',
        model: NewModel,
//        localStorage: new Store('local-news')
    });
    return new NewsList();
});