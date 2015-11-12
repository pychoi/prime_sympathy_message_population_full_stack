/**
 * Created by samuelmoss on 11/10/15.
 */
module.exports = function(grunt){
    //Project Config
    grunt.initConfig({
        pkg : grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%=pkg.name%> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: 'client/script/app.js',
                dest: 'server/public/assets/script/app.min.js'
            }
        },
        copy: {
            bootstrap: {
                expand:true,
                cwd: "node_modules/bootstrap/dist/css/",
                src: [
                    "bootstrap.min.css"
                ],
                "dest": "server/public/vendors/"
            },
            angular: {
                expand:true,
                cwd: "node_modules/angular/",
                src: [
                    "angular.min.js",
                    "angular.min.js.map"
                ],
                "dest": "server/public/vendors/"
            },
            html: {
                expand: true,
                cwd: "client/views/",
                src: [
                    "index.html"
                ],
                "dest": "server/public/views/"
            },
            css: {
                expand: true,
                cwd: "client/styles/",
                src: [
                    "stylesheet.css"
                ],
                "dest": "server/public/assets/styles/"
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', ['copy', 'uglify']);
};