module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        browserify: {
            'dist/onClick.js':      ['src/onClick.js'],
            'examples/build.js':    ['examples/example.js'],
            'test/build.js':        ['test/test.js'],
            options: {
                standalone: 'onClick'
            }
        },
        watch: {
            files: [ "src/*.js", "examples/example.js", "test/test.js"],
            tasks: [ 'browserify' ]
        },
        qunit: {
            files: ['test/index.html']
        }
    });

    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-qunit');

    grunt.registerTask('test', [
        'qunit'
    ]);

    grunt.registerTask('build', [
        'test',
        'browserify'
    ]);
};
