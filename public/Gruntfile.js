module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    sprite: {
      spriteX1: {
        src: [ 'assets/img/sprites/*.*', '!assets/img/sprites/*2k.*' ],
        destImg: 'assets/img/sprite-1k.png',
        destCSS: 'assets/sass/partials/sprite-1k.scss',
        imgPath: '/assets/img/sprite-1k.png',
        algorithm: 'binary-tree',
        engine: 'gm',
        engineOpts: {
          'imagemagick': true
        },
        cssFormat: 'scss',
        cssOpts: {
          cssClass: function (item) {
            return '.icon-' + item.name;
          }
        },
        cssVarMap: function (sprite) {
          sprite.name = 'icon-' + sprite.name;
        },
        padding: 1
      },
      spriteX2: {
        src: [ 'assets/img/sprites/*2k.*' ],
        destImg: 'assets/img/sprite-2k.png',
        destCSS: 'assets/sass/partials/sprite-2k.scss',
        imgPath: '/assets/img/sprite-2k.png',
        algorithm: 'binary-tree',
        engine: 'gm',
        engineOpts: {
          'imagemagick': true
        },
        cssFormat: 'scss',
        cssOpts: {
          cssClass: function (item) {
            return '.icon-' + item.name;
          }
        },
        cssVarMap: function (sprite) {
          sprite.name = 'icon-' + sprite.name;
        },
        padding: 2
      }
    }
  });

  grunt.loadNpmTasks('grunt-spritesmith');

  grunt.registerTask('default', [ 'sprite' ]);

}