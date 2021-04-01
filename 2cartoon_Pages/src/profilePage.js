let fs = require('fs');                                                  // fs모듈(폴더 읽기용) 로드
let express = require("express");

let sort = "장";
exports.sort = sort;

let main = `<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Profile - $1</title>
    </head>
    <body>
        <style>
            img {
                margin: 5%;
                margin-left: 18%;
                margin-right: 18%;
                width: 60%;
                border-radius: 10px;
                border: 2px solid;
            }
            div {
                margin-left: 18%;
            }
            p {
                font-size: xx-small;
            }
            table {
                border-spacing: 0 0px;
            }

            body{ background-color:#36393F }
            * { color : white; }
        </style>
        <img src="$4" onError="this.src='/No_profile.png';" />
        <div>
            <h1>
                닉네임 : $1
                <p></p>
                등급 : $2
                <p></p>
                가입일 : $3
                <p></p>
                만화` + sort + `수 : $5
            </h1>
        </div>
        <div><div></div></div>
    </body>
</html>
`;


// n { color:#71368a; }
// v { color:#d1ac17; }
// m { color:#478cbc; }
// o { color:#2eb368; }

let OprColor = "#2eb368";

let Rank = [
    {"Count":20,"Color":"#71368a","Rank":"None"},
    {"Count":50,"Color":"#d1ac17","Rank":"VIP"},
    {"Count":80,"Color":"#d1ac17","Rank":"VIP+"},
    {"Count":100,"Color":"#d1ac17","Rank":"VIP++"},
    {"Count":120,"Color":"#478cbc","Rank":"MVP"},
    {"Count":150,"Color":"#478cbc","Rank":"MVP+"},
    {"Count":170,"Color":"#478cbc","Rank":"MVP++"},
];

let Oprs = ["Oein"];

exports.Rank = Rank;

let People = {};

exports.ae = (app) => {
    app.use('/profiles/imgs/', express.static(__dirname + "/../imgs"));

    let cartoon_dir = __dirname + "/../cartoons";
    let Cartoons = fs.readdirSync(cartoon_dir , "utf-8");
    for(let i = 0;i < Cartoons.length;i++){
        if(Cartoons[i] == ".DS_Store") continue;
        let cartoon_s_dir = cartoon_dir + "/" + Cartoons[i];

        let This_cartoons_haws = fs.readdirSync(cartoon_s_dir , "utf-8");
        
        for(let ii = 0;ii < This_cartoons_haws.length;ii++){
            if(This_cartoons_haws[ii] == ".DS_Store") continue;
            if(This_cartoons_haws[ii] == "thumb.png") continue;


            let This_cartoon_s_haw_s_dir = cartoon_s_dir + "/" + This_cartoons_haws[ii];
            let This_cartoon_s_haw_s_images_list = fs.readdirSync(This_cartoon_s_haw_s_dir , "utf-8");

            let idx = This_cartoon_s_haw_s_images_list.indexOf(".DS_Store");
            if (idx > -1) This_cartoon_s_haw_s_images_list.splice(idx, 1);

            if(People[Cartoons[i].split("_")[1]] == undefined) People[Cartoons[i].split("_")[1]] = 0;
            People[Cartoons[i].split("_")[1]] += This_cartoon_s_haw_s_images_list.length;
            console.log(Cartoons[i].split("_")[1] + ":" + People[Cartoons[i].split("_")[1]]);
        }
    }

    let PeopleList = fs.readdirSync(__dirname + "/../Profiles" , "utf-8");

    for(let i = 0;i < PeopleList.length;i++){
         if(PeopleList[i] == ".DS_Store") continue;

         let HTML = main;
         let rank;
         let name = PeopleList[i].replace(".json" , "");

         if(require("./d").d) console.log("Name : " , name);
         for(let ii = 0;ii < Rank.length;ii++){
             if(require("./d").d) console.log(name + " : " + People[name]);
             if(Rank[ii]["Count"] > People[name]){
                 rank = Rank[ii];
                 if(require("./d").d) console.log("Befor for :  "  +  JSON.stringify(Rank[ii]).toString());
                 break;
             }
         }
         if(require("./d").d) console.log("After for : " + JSON.stringify(rank));

         let rankHTMLTAG = rank["Rank"].toString().replace("+" , "").replace("+" , "");
         let rankHTML = "<" + rankHTMLTAG + " style=\"color:" + rank["Color"] + "\">" + rank.Rank + "</" + rankHTMLTAG + ">";
         
         let nameHTML = "<" + rankHTMLTAG + " style=\"color:" + rank["Color"] + "\">" + name + "</" + rankHTMLTAG + ">";
         
         let  date = require("./../Profiles/" + name + ".json")["date"];

         let image_src = require("./../Profiles/" + name + ".json")["image_src"];

         HTML = HTML.replace("$1" , name);
         HTML = HTML.replace("$1" , nameHTML);
         HTML = HTML.replace("$2" , rankHTML);
         HTML = HTML.replace("$3" , date);
         HTML = HTML.replace("$4" , image_src);
         HTML = HTML.replace("$5" , People[name]);

         if(Oprs.indexOf(name) != -1){
             HTML = HTML.replace(nameHTML.split("color:")[1].split("\"")[0] , "#2fcc71");
             HTML = HTML.replace(nameHTML.split("color:")[1].split("\"")[0] , "#2fcc71");
             HTML = HTML.replace(nameHTML.split("color:")[1].split("\"")[0] , "#2fcc71");
             HTML = HTML.replace(nameHTML.split("color:")[1].split("\"")[0] , "#2fcc71");
             HTML = HTML.replace(nameHTML.split("color:")[1].split("\"")[0] , "#2fcc71");
             HTML = HTML.replace(nameHTML.split("color:")[1].split("\"")[0] , "#2fcc71");
             HTML = HTML.replace(rank.Rank , "Operator");
             HTML = HTML.replace(rank.Rank , "Operator");
             HTML = HTML.replace(rank.Rank , "Operator");
             HTML = HTML.replace(rank.Rank , "Operator");
             HTML = HTML.replace(rank.Rank , "Operator");
             HTML = HTML.replace(rank.Rank , "Operator");
             HTML = HTML.replace(rank.Rank , "Operator");
         }

         app.get("/profiles/" + encodeURI(name) , (req , res) => {
            res.send(HTML);
         });
    }
};