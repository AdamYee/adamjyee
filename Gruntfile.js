module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    watch: {
      handlebars: {
        files: ['static/templates/homepage/handlebars/html/*.html'],
        tasks: ['template']
      }
    },

    handlebars: {
      compile: {
        options: {
          namespace: 'Handlebars.templates',
          processName: function(filePath) {
            name = filePath.split('/');
            name = name[name.length-1];
            name = name.split('.')[0]
            return name;
          }
        },
        files: {
          "static/js/homepage/handlebars/message-row-default.js": "static/templates/homepage/handlebars/html/message-row-default.html",
          "static/js/homepage/handlebars/message-row-edit.js": "static/templates/homepage/handlebars/html/message-row-edit.html",
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-handlebars');

  grunt.registerTask('default', ['watch']);
  grunt.registerTask('template', ['handlebars']);

};