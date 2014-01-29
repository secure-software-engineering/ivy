'use strict';
var LIVERELOAD_PORT = 35729;
var lrSnippet = require('connect-livereload')({
    port: LIVERELOAD_PORT
});
var mountFolder = function(connect, dir) {
    return connect.static(require('path').resolve(dir));
};

module.exports = function(grunt) {
    // show elapsed time at the end
    require('time-grunt')(grunt);
    // load all grunt tasks
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({

        watch: {
            livereload: {
                options: {
                    livereload: LIVERELOAD_PORT
                },
                files: [
                    'app/scripts/**/*.js',
                    'app/*.html',
                    'app/templates/*.html',
                    'app/styles/*.css'
                ]
            }
        },

        connect: {
            options: {
                port: 9000,
                hostname: 'localhost'
            },
            livereload: {
                options: {
                    middleware: function(connect) {
                        return [
                            lrSnippet,
                            mountFolder(connect, 'app')
                        ];
                    }
                }
            }
        },

        open: {
            server: {
                path: 'http://localhost:<%= connect.options.port %>'
            }
        },

        clean: ["dist", ".tmp"],

        useminPrepare: {
            html: 'app/index.html',
            options: {
                dest: 'dist'
            }
        },

        usemin: {
            html: 'dist/index.html'
        },

        htmlmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'app',
                    src: '*.html',
                    dest: 'dist'
                }]
            }
        },

        copy: {
            main: {
                files: [{
                    expand: true,
                    cwd: 'app/',
                    src: ['templates/*'],
                    dest: 'dist/',
                    filter: 'isFile'
                }, {
                    expand: true,
                    cwd: 'app/',
                    src: ['fonts/*'],
                    dest: 'dist/',
                    filter: 'isFile'
                }]
            }
        },

        requirejs: {
            dist: {
                options: {
                    baseUrl: "app/scripts/modules",
                    mainConfigFile: "app/scripts/modules/main.js",
                    name: "main",
                    out: "dist/scripts/modules/main.js",
                    almond: true,
                    replaceRequireScript: [{
                        files: ['dist/index.html'],
                        module: 'main'
                    }],
                }
            }
        },

        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: [
                'Gruntfile.js',
                'app/scripts/{,*/}*.js',
                'test/spec/{,*/}*.js'
            ]
        }
    });

    grunt.registerTask('serve', function(target) {
        grunt.task.run([
            'connect:livereload',
            'open',
            'watch'
        ]);
    });

    grunt.registerTask('build', [
        'clean',
        'useminPrepare',
        'concat',
        'cssmin',
        'uglify',
        'htmlmin',
        'requirejs',
        'copy',
        'usemin'
    ]);

    grunt.registerTask('default', [
        'jshint',
        // 'test',
        'build'
    ]);
};
