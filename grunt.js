module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: '<json:package.json>',
    test: {
      files: ['test/**/*.js']
    },
    lint: {
      files: ['grunt.js', 'lib/**/*.js', 'test/**/*.js']
    },
    watch: {
      files: '<config:lint.files>',
      tasks: 'default'
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      test: {
        options: {
          jshintrc: 'test/.jshintrc'
        }
      }
    }
  });

  // Default task.
  grunt.registerTask('default', 'lint test');

  // Travis CI task.
  grunt.registerTask('travis', 'lint test');
};
