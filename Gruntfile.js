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
    },
    emberTemplates: {
      compile: {
        options: {
          templateBasePath: 'app',
          templateCompilerPath: 'bower_components/ember/ember-template-compiler.js',
          templateName: function (name) {
            return 'aurora' + name;
          },
          templateRegistration: function (name, contents) {
            return "define('" + name + "', [], function () { return " + contents + "});";
          },
          handlebarsPath: 'bower_components/handlebars/handlebars.js'
        },
        files: {
          'tmp/aurora-templates.js': ['app/templates/*.hbs']
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-ember-templates');

  grunt.registerTask('build:templates', 'Compile Handlebars templates.', ['emberTemplates:compile']);

  grunt.registerTask('lint', 'Lint all Javascript files.', ['jshint']);
};
