exports.ae = (app) => {
    let Rank = require("./profilePage").Rank;

    let HTML = require('fs').readFileSync(__dirname + "/html/rank1.html" , "utf-8");

    HTML = HTML.replace("$1" , "장");

    let RHtml = "";

    for(let i = 0;i < Rank.length;i++){
        if(i == 0){
            RHtml += "<big style=\"color:" + Rank[i]["Color"] + "\">0 ~ " + Rank[i]["Count"] + " : " + Rank[i]["Rank"] + "</big><p></p>"
        }else{
            RHtml += "<big style=\"color:" + Rank[i]["Color"] + "\">" + (Rank[i - 1]["Count"] + 1) + " ~ " + Rank[i]["Count"] + " : " + Rank[i]["Rank"] + "</big><p></p>"
        }
    }

    HTML = HTML.replace("$2" , RHtml);

    app.get("/rank" , (req , res) => {
        res.send(HTML);
    });
};