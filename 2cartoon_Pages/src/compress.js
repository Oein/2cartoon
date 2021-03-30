let { exec } = require('child_process');
let fs = require("fs");

require('dotenv').config();

exports.ae = () => {
    exec("cd " + __dirname + "/../../;node ./node_modules/tinypng-cli/tinypng-cli.js -r -k " + process.env.API , function(err , stdout , stderr){
        console.log(err + stdout + "  " + stderr);
    });
}


