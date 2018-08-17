//Require the gulp
const gulp = require("gulp");
const fs = require("fs");


/*
  Read from the gulp files and require their tasks
*/
fs.readdirSync(__dirname + "/build/gulp").forEach(function (task) {

  //Ignore dot files like .htaccess.
  if( (task.charAt(0) === ".") == false) {
    require("./build/gulp/" + task);
  }
});


/*
     Define your tasks here.
*/
gulp.task("dev", []);
