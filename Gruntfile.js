module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    watch: {
      handlebars: {
        files: ['static/js/message-app/templates/*.html'],
        tasks: ['handlebars'],
        options: {
          livereload: true
        }
      },
      less: {
        files: ['static/less/**/*.less'],
        tasks: ['less']
      },
      static_files: {
        files: ['static/templates/**/*.html', "static/js/**/*.js", "static/css/**/*.css"],
        options: {
          livereload: true
        }
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
      src: {
        expand: true,
        cwd: "static/less",
        src: "*.less",
        dest: "static/css",
        ext: ".css"
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-handlebars');
  grunt.loadNpmTasks('grunt-contrib-less');

  grunt.registerTask('default', ['watch']);
  grunt.registerTask('hbs', ['handlebars']);

};