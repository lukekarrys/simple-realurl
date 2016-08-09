module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: '<json:package.json>',
    nodeunit: {
      all: ['test/**/*.js']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Default task
  grunt.registerTask('default', ['nodeunit']);
};
