let fs = require("fs");

String.prototype.replaceAll = function(org, dest) {
    return this.split(org).join(dest);
}

let txt_files = fs.readdirSync(__dirname + "/../../lisences");
let html = "<html><head><title>2cartoon lisence</title></head><body>";

txt_files.forEach(name => {
    console.log(name);
    let txt = fs.readFileSync(__dirname + "/../../lisences/" + name , "utf-8");
    html += "<h1>" + name.replace(".txt" ,"") + "</h1><p></p><h3>";
    txt.toString().split(/\n/).forEach(function(line){
        html += line + "\n" + "<p></p>";
    });
    html += "</h3><p>&nbsp;</p><p>&nbsp;</p><p>&nbsp;</p>";
    console.log(name + " complete!\n\n");
});

html += "</body></html>";

exports.ae = (app) => {
    app.get("/lisence" ,(req , res) => {
        res.send(html);
    })
}