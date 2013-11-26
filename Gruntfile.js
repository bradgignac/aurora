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
        src: ['app/javascripts/**/*.js', 'test/**/*.js'],
        options: {
          browser: true,
          globals: {
            // Ember
            Ember: true,

            // RequireJS
            define: true,
            require: true,

            // Jasmine
            describe: true,
            expect: true,
            it: true
          }
        }
      }
    },
    clean: {
      tmp: ['tmp']
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
    },
    connect: {
      server: {
        options: {
          base: ['bower_components', 'tmp'],
          livereload: true
        }
      }
    },
    karma: {
      options: {
        frameworks: ['jasmine'],
        browsers: ['PhantomJS'],
        files: [
          'bower_components/jquery/jquery.js',
          'bower_components/handlebars/handlebars.runtime.js',
          'bower_components/ember/ember.js',
          'bower_components/ember-data/ember-data.js',
          'bower_components/almond/almond.js',
          'test/test_helper.js',
          'app/javascripts/**/*.js',
          'tmp/aurora-templates.js',
          'test/**/*.js'
        ]
      },
      unit: {
        singleRun: true
      }
    },
    watch: {
      html: {
        options: {
          livereload: true
        },
        files: ['app/index.html'],
        tasks: ['build:html']
      },
      javascripts: {
        options: {
          livereload: true
        },
        files: ['app/javascripts/**/*.js'],
        tasks: ['build:javascripts']
      },
      templates: {
        options: {
          livereload: true
        },
        files: ['app/templates/**/*.hbs'],
        tasks: ['build:templates']
      },
      vendor: {
        options: {
          livereload: true
        },
        files: ['bower_components/**/*.js']
      },
      tests: {
        options: {
          livereload: false
        },
        files: [
          'bower_components/**/*.js',
          'app/javascripts/**/*.js',
          'app/templates/**/*.hbs',
          'test/**/*.js'
        ],
        tasks: ['build:templates', 'karma:unit']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-ember-templates');
  grunt.loadNpmTasks('grunt-karma');

  grunt.registerTask('default', ['lint', 'test']);

  grunt.registerTask('build', 'Compile all source files.', ['build:html', 'build:javascripts', 'build:templates']);
  grunt.registerTask('build:html', 'Compile HTML.', ['copy:html']);
  grunt.registerTask('build:javascripts', 'Compile Javascripts.', ['concat:javascripts']);
  grunt.registerTask('build:templates', 'Compile Handlebars templates.', ['emberTemplates:templates']);

  grunt.registerTask('lint', 'Lint all Javascript files.', ['jshint']);

  grunt.registerTask('server', 'Start an Aurora development server.', ['clean', 'build', 'connect:server', 'watch']);

  grunt.registerTask('test', 'Run all tests.', ['build:templates', 'karma:unit']);
  grunt.registerTask('test:watch', 'Automatically run all tests when changes are made.', ['build:templates', 'karma:unit', 'watch:tests']);
};
