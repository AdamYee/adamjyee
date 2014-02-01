module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    watch: {
      handlebars: {
        files: ['static/templates/homepage/handlebars/html/*.html'],
        tasks: ['template']
      }
    },

    //todo - consolidate to single .js amd template
    handlebars: {
      compile: {
        options: {
          namespace: 'Handlebars.templates',
          amd: true,
          processName: function(filePath) {
            name = filePath.split('/');
            name = name[name.length-1];
            name = name.split('.')[0]
            return name;
          }
        },
        expand: true,
        src: ['static/js/message-app/templates/*.html'],
        dest: './',
        ext: '.js'
      }
    },

    less: {
      options: {
        paths: ["static/less"]
      },
      files: {
        "static/css/message-app/app.css": "static/less/message-app/app.less"
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-handlebars');
  grunt.loadNpmTasks('grunt-contrib-less');

  grunt.registerTask('default', ['watch']);
  grunt.registerTask('hbs', ['handlebars']);

};