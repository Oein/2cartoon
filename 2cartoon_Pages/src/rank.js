exports.ae = (app) => {
    app.get("/rank" , (req , res) => {
        let html = require('fs').readFileSync(__dirname + "/html/rank1.html" , "utf-8");
        
        let ranks = require("./profilePage").rc;
        let rankHTML = "";

        ranks.forEach(RankElement => {
            if(RankElement.Output != undefined){
                rankHTML += "<big> ~ " + RankElement.Over + " : <" + RankElement.Tag + ">" + RankElement.Output + "</" + RankElement.Tag + ">" + "</big><p>&nbsp;</p>\n";
            }else{
                rankHTML += "<big> ~ " + RankElement.Over + " : " + RankElement.Name + "</big><p>&nbsp;</p>\n";
            }
        });

        html = html.replace("$1" , rankHTML);

        res.send(html);
    });
};