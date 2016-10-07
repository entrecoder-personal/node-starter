module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    dust: {
      options: {
        helper: "dust",
        dependencies: {
          dust: "dust"
        },
        optimizers: {
          format: function(ctx, node) { return node; }
        }
      },
      build: {
        expand: true,
        cwd: "app/server/views/templates",
        src: "**/*.dust",
        dest: "app/public/templates", 
        ext: ".js",
        filter: "isFile"
      }
    }
  });

  grunt.loadNpmTasks('grunt-dustjs-linkedin');

  // Default task(s).
  grunt.registerTask('default', ['dust']);
};