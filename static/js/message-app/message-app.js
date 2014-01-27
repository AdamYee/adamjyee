requirejs.config({
    //By default load any module IDs from js/lib
    // baseUrl: 'static/js/homepage/message-app',
    //except, if the module ID starts with "app",
    //load it from the js/app directory. paths
    //config is relative to the baseUrl, and
    //never includes a ".js" extension since
    //the paths config could be for a directory.
    paths: {
    	handlebars: '../notmine/handlebars-v1.1.2',
    },
    shim: {
        'handlebars': {
            exports: 'Handlebars'
        }
    }
});