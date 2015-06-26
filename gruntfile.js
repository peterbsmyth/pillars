module.exports = function(grunt){
  //Configure task(s)
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat:{
      devcss:{
        src: ['src/css/*.css'],
        dest: 'dev/css/main.min.css'
      },
      buildcss:{
        src: ['src/css/*.css'],
        dest: 'build/css/main.min.css'
      },
      webcss:{
        src: ['src/css/*.css'],
        dest: 'web/css/main.min.css'
      }
    },
    cssmin:{
      buildcss:{
        src: ['build/css/main.min.css'],
        dest: 'build/css/main.min.css'
      },
      webcss:{
        src: ['web/css/main.min.css'],
        dest: 'web/css/main.min.css'
      }
    },
    uglify: {
      build: {
        files:[
          {src: ['src/js/functions.js','src/js/*.js'], dest: 'build/js/script.min.js'},
        ]
      },
      dev: {
        options: {
          beautify: true,
          mangle: false,
          compress: false,
          preserveComments: 'all'
        },
        src: ['src/js/functions.js','src/js/*.js'],
        dest: 'dev/js/script.min.js'
      },
      web: {
        files:[
          {
            options: {
              beautify: true,
              mangle: false,
              compress: false,
              preserveComments: 'all'
            },
            src: ['src/js/functions.js','src/js/*.js'],
            dest: 'web/js/script.min.js'
          },
        ]
      }
    },
    copy: {
      dev: {
        files: [
          {expand: true, cwd:'src/', src: ['fonts/*','db/*','*.html','css/*.gif','*.php'], dest: 'dev/'},
        ],
      },
      build: {
        files: [
          {expand: true, cwd:'src/', src: ['fonts/*','*.html','css/*.gif','*.php'], dest:'build/'}
        ]
      },
      web: {
        files: [
          {expand: true, cwd:'src/', src: ['fonts/*','db/*','charts.html','daily_donut.html','css/*.gif','*.php'], dest:'web/'}
        ]
      }
    },
    watch: {
      js: {
        files: ['src/js/*.js'],
        tasks: ['uglify:dev'],
        options: {
          livereload: true,
        }
      },
      css: {
        files: ['src/css/*.css'],
        tasks: ['concat:devcss'],
        options: {
          livereload: true,
        }
      },
      other: {
        files: ['fonts/*','db/*','*.html','css/*.gif','*.php'],
        tasks: ['copy:dev'],
        options: {
          cwd: {files: 'src/'},
          livereload: true
        }
      }
    }
  });

  //Load the plugins
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');

  //Register task(s)
  grunt.registerTask('default', ['uglify:dev','concat:devcss','copy:dev']);
  grunt.registerTask('build', ['uglify:build','concat:buildcss','cssmin:buildcss','copy:build']);
  grunt.registerTask('web', ['uglify:web','concat:webcss','cssmin:webcss','copy:web']);
};
