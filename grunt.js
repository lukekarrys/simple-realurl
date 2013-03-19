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
    jshint: (function() {
      function parserc() {
        var rc = grunt.file.readJSON('.jshintrc'),
            settings = {
              options: rc,
              globals: {}
            };

        (rc.predef || []).forEach(function( prop ) {
          settings.globals[prop] = true;
        });
        delete rc.predef;

        return settings;
      }

      return parserc();
    })()
  });

  // Default task.
  grunt.registerTask('default', 'lint test');

  // Travis CI task.
  grunt.registerTask('travis', 'lint test');
};
