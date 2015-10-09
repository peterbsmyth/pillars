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
        src: ['src/client/css/*.css'],
        dest: 'dev/client/css/main.min.css'
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
        src: ['src/client/js/functions.js','src/client/js/**/*.js',],
        dest: 'dev/client/js/script.min.js'
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
      client: {
        files: [
          {expand: true, cwd:'src/client/', src: ['fonts/*','db/*','*.html','css/*.gif','*.php','views/**/*.html'], dest: 'dev/client'},
        ]
      },
      server: {
        files: [
          {expand: true, cwd:'src/server/', src: ['**/*.js','**/*.ejs'], dest: 'dev/server'}
        ]
      },
      main: {
        files: [
          {expand: true, cwd:'src/', src: 'server.js', dest: 'dev/'}
        ]
      },
      build: {
        files: [
          {expand: true, cwd:'src/', src: ['fonts/*','*.html','css/*.gif','*.php','views/**/*.html'], dest:'build/'}
        ]
      },
      web: {
        files: [
          {expand: true, cwd:'src/', src: ['fonts/*','db/*','*.html','css/*.gif','*.php','views/**/*.html'], dest:'web/'}
        ]
      }
    },
    watch: {
      js: {
        files: ['src/client/js/**/*.js'],
        tasks: ['uglify:dev']
      },
      css: {
        files: ['src/client/css/*.css'],
        tasks: ['concat:devcss']
      },
      client: {
        files: ['fonts/*','db/*','*.html','css/*.gif','*.php','views/**/*.html'],
        tasks: ['copy:client'],
        options: {
          cwd: {files: 'src/client/'}
        }
      },
      server: {
        files: ['*.js'],
        tasks: ['copy:server'],
        options: {
          cwd: {files: 'src/server/'}
        }
      },
      main: {
        files: ['server.js'],
        tasks: ['copy:main'],
        options: {
          cwd: {files: 'src/'}
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
  grunt.registerTask('default', ['clean:dev','uglify:dev','concat:devcss','copy:main','copy:server','copy:client']);
  grunt.registerTask('build', ['uglify:build','concat:buildcss','cssmin:buildcss','copy:build']);
  grunt.registerTask('web', ['clean:web','uglify:web','concat:webcss','cssmin:webcss','copy:web']);
};
