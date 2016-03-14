module.exports = function(grunt) {

	// because why not
	"use strict";

	// 1. All configuration goes here
	grunt.initConfig({
		pkg: grunt.file.readJSON("package.json"),

		// this bad boy updates all the installed packages.
		devUpdate: {
			main: {
				options: {
					reportUpdated: false,
					updateType: "prompt",
					semver: false
				}
			}
    },

		uglify: {
			build: {
				files: {
					"build/scripts.min.js": "assets/js/jquery.flexslider.js"
				}
			}
		},

		// jshint: {
		//     all: ['assets/js/scripts.js']
		// },

		sass: {
			global: {
				options: {
					style: "compressed",
					precision: 10
				},
				files: {
					"assets/css/style-unprefixed.css": "assets/css/style.scss"
				}
			}
		},

		autoprefixer: {
			global: {
				src: "assets/css/style-unprefixed.css",
				dest: "build/style.css"
			}
		},

		compress: {
			main: {
				options: {
					archive: "mod_tristans_responsive_slider_0.x.x.zip",
					pretty: true,
					mode: 'zip'
				},
				files: [
					{expand: true, src: ['build/style.css'], dest: '/'},
					{expand: true, src: ['build/index.html'], dest: '/'},
					{expand: true, src: ['build/scripts.min.js'], dest: '/'},
					{expand: true, src: ['build/fonts/**'], dest: '/'},
					{expand: true, src: ['build/images/**'], dest: '/'},
					{expand: true, src: ['language/**'], dest: '/'},
					{expand: true, src: ['tmpl/**'], dest: '/'},
					{expand: true, src: ['helper.php'], dest: '/'},
					{expand: true, src: ['index.html'], dest: '/'},
					{expand: true, src: ['create_script.php'], dest: '/'},
					{expand: true, src: ['mod_tristans_responsive_slider.php'], dest: '/'},
					{expand: true, src: ['mod_tristans_responsive_slider.xml'], dest: '/'},
				]
			}
		},

		watch: {
			options: {
				spawn: false
			},
			grunt: {
				files: ["Gruntfile.js"]
			},
			js: {
				files: ["assets/js/*.js"],
				tasks: ["uglify"]
			},
			css: {
				files: ["assets/css/*.scss"],
				tasks: ["sass", "autoprefixer"]
			},
			compression: {
				files: ['assets/**/*', 'language/**/*', 'tmpl/**/*', 'helper.php', 'mod_tristans_responsive_slider.php', 'mod_tristans_responsive_slider.xml', "Gruntfile.js"],
				tasks: ["compress"]
			}
		},
  });

    // 3. Where we tell Grunt we plan to use this plug-in.
    require("load-grunt-tasks")(grunt);

    // 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
  	grunt.registerTask("default", ["compress", "sass", "autoprefixer", "uglify", "watch"]);
};
