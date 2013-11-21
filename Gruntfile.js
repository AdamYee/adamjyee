module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    watch: {
      handlebars: {
        files: ['templates/homepage/handlebars/html/*.html'],
        tasks: ['template']
      }
    },

    handlebars: {
      compile: {
        options: {
          namespace: 'homepage.templates'
        },
        files: {
          "templates/homepage/handlebars/js/test.js": "templates/homepage/handlebars/html/test.html",
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-handlebars');

  grunt.registerTask('default', ['watch']);
  grunt.registerTask('template', ['handlebars']);

};