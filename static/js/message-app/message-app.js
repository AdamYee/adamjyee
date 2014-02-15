requirejs.config({
    paths: {
        handlebars: '../notmine/handlebars-v1.1.2',
        underscore: '../bower_components/underscore-amd/underscore',
        backbone: '../bower_components/backbone-amd/backbone',
        jquery: '../bower_components/jquery/jquery'
    },
    shim: {
        'handlebars': {
            exports: 'Handlebars'
        }
    }
});
require(['jquery', 'app'], function ($, App) {
    $(function(){

        App();
        
        $('#close').click(function(){
            $('#notification').slideUp({
                done: function() {
                    $('#message-list').hide().slideDown('fast');
                }
            });
        });
        
        $('#msg').focus();
            
    });
});