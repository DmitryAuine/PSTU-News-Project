'use strict';

require.config({
    shim: {
        bootstrap: {
            deps: [
                'jquery'
            ]
        },
        store: {
            deps: [
                'backbone'
            ],
            exports: 'Store'
        }
    },
    paths: {
        //Libs
        underscore: '../bower_components/underscore/underscore',
        backbone: '../bower_components/backbone/backbone',
        text: '../bower_components/requirejs-text/text',
        store: '../bower_components/backbone.localstorage/backbone.localStorage',
        bootstrap: '../bower_components/bootstrap/dist/js/bootstrap.min',
        jquery: '../bower_components/jquery/dist/jquery',
        events: 'js/events'
    }
});

//Preload
require([
    //Libs
    'backbone',
    'text',
    'store',
    'bootstrap'
], function() {
});

//Init map application
require([
    'js/application'
], function(Application) {
    var app = new Application();
    app.render();
});