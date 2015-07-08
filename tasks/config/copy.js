/**
 * Copy files and folders.
 *
 * ---------------------------------------------------------------
 *
 * # dev task config
 * Copies all directories and files, exept coffescript and less fiels, from the sails
 * assets folder into the .tmp/public directory.
 *
 * # build task config
 * Copies all directories nd files from the .tmp/public directory into a www directory.
 *
 * For usage docs see:
 * 		https://github.com/gruntjs/grunt-contrib-copy
 */
module.exports = function(grunt) {

	grunt.config.set('copy', {
		dev: {
			files: [{
				expand: true,
				cwd: './assets',
				src: ['**/*.!(coffee|less)'],
				dest: '.tmp/public'
			}, {
				expand: true,
				cwd: './bower_components',
				src: [
					'jquery/dist/jquery.js',
					'bootstrap/dist/js/bootstrap.js',
					'angular/angular.js',
					'lodash/lodash.js',
					'angular-google-maps/dist/angular-google-maps.js'
				],
				flatten: true,
				dest: '.tmp/public/js/dependencies'
			}, {
				expand: true,
				cwd: './bower_components',
				src: [
					'bootstrap/dist/css/bootstrap.css',
					'bootstrap/dist/css/bootstrap.css.map',
					'font-awesome/css/font-awesome.css'
				],
				flatten: true,
				dest: '.tmp/public/styles'
			}, {
				expand: true,
				cwd: './bower_components',
				src: [
					'bootstrap/fonts/**/*',
					'font-awesome/fonts/**/*'
				],
				flatten: true,
				dest: '.tmp/public/fonts'
			}]
		},
		build: {
			files: [{
				expand: true,
				cwd: '.tmp/public',
				src: ['**/*'],
				dest: 'www'
			}]
		}
	});

	grunt.loadNpmTasks('grunt-contrib-copy');
};
