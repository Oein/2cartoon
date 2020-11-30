let shell = require("shelljs");

shell.exec("git add *");
console.log("a");
shell.exec("git commit -a -m \"uplaod!\"");
console.log("b");
shell.exec("git push");
console.log("c");
