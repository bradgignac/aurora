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
      javascripts: {
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
    concat: {
      javascripts: {
        files: {
          'tmp/aurora-application.js': ['app/javascripts/**/*.js']
        }
      }
    },
    copy: {
      html: {
        files: {
          'tmp/index.html': ['app/index.html']
        }
      }
    },
    emberTemplates: {
      templates: {
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
          'tmp/aurora-templates.js': ['app/templates/**/*.hbs']
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-ember-templates');

  grunt.registerTask('build:html', 'Compile HTML.', ['copy:html']);
  grunt.registerTask('build:javascripts', 'Compile Javascripts.', ['concat:javascripts']);
  grunt.registerTask('build:templates', 'Compile Handlebars templates.', ['emberTemplates:compile']);

  grunt.registerTask('lint', 'Lint all Javascript files.', ['jshint']);
};
