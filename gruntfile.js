module.exports = function(grunt){
  //Configure task(s)
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean:{
      dev: ['dev/'],
      build: ['build/'],
      web: ['web/'],
    },
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
          sourceMap: true,
          preserveComments: 'all'
        },
        src: ['src/js/functions.js','src/js/**/*.js',],
        dest: 'dev/js/script.min.js'
      },
      web: {
          options: {
            beautify: true,
            mangle: false,
            compress: true,
            sourceMap: true,
            preserveComments: 'all'
          },
          src: ['src/js/functions.js','src/js/**/*.js'],
          dest: 'web/js/script.min.js'
        }
    },
    copy: {
      dev: {
        files: [
          {expand: true, cwd:'src/', src: ['fonts/*','db/*','*.html','css/*.gif','*.php','partials/**/*.html'], dest: 'dev/'},
        ],
      },
      build: {
        files: [
          {expand: true, cwd:'src/', src: ['fonts/*','*.html','css/*.gif','*.php','partials/**/*.html'], dest:'build/'}
        ]
      },
      web: {
        files: [
          {expand: true, cwd:'src/', src: ['fonts/*','db/*','*.html','css/*.gif','*.php','partials/**/*.html'], dest:'web/'}
        ]
      }
    },
    watch: {
      js: {
        files: ['src/js/**/*.js'],
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
        files: ['fonts/*','db/*','*.html','css/*.gif','*.php','partials/**/*.html'],
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
  grunt.loadNpmTasks('grunt-contrib-clean');

  //Register tasks
  grunt.registerTask('default', ['clean:dev','uglify:dev','concat:devcss','copy:dev']);
  grunt.registerTask('build', ['uglify:build','concat:buildcss','cssmin:buildcss','copy:build']);
  grunt.registerTask('web', ['clean:web','uglify:web','concat:webcss','cssmin:webcss','copy:web']);
};
