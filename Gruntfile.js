module.exports = function (grunt) {
  'use strict';

  grunt.initConfig({
    jshint: {
      options: {
        camelcase: true,
        eqeqeq: true,
        forin: true,
        immed: true,
        indent: 2,
        latedef: true,
        newcap: true,
        noarg: true,
        noempty: true,
        nonew: true,
        strict: true,
        trailing: true,
        undef: true,
        unused: true
      },
      build: {
        src: ['Gruntfile.js'],
        options: {
          node: true
        }
      },
      javascript: {
        src: ['app/javascripts/**/*.js'],
        options: {
          browser: true,
          globals: {
            Ember: true,
            define: true,
            require: true
          }
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.registerTask('lint', 'Lint all Javascript files.', ['jshint']);
};
