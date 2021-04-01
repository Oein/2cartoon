exports.ae = (app) => {
    let People = require("fs").readdirSync(__dirname + "/../Profiles" , "utf-8");

    let html = require("fs").readFileSync(__dirname + "/html/Helpers1.html");

    let PeopleHTML = "";
    for(let i = 0;i < People.length;i++){
        if(People[i] == ".DS_Store") continue;

        PeopleHTML += "<big><a href=\"/profiles/" + People[i].replace(".json" , "") + "\">" + People[i].replace(".json" , "") + "</a></big><p></p>\n";
        console.log(PeopleHTML);
    }

    html = html.toString();
    html = html.replace("$1" , PeopleHTML);

    app.get("/helper" , (req , res) => {
        res.send(html);
    });
}