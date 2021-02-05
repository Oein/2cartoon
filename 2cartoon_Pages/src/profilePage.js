let fs = require('fs');                                                  // fs모듈(폴더 읽기용) 로드
let rS = require("./rS");                                                // 스페이스바 재거 모듈 로드
let express = require("express");
const { profile } = require('console');

let main = fs.readFileSync(__dirname + "/../html/profile.html").toString();

exports.ae = (app) => {
    app.use("/profiles/imgs", express.static(__dirname + "/../imgs"));

    let profile_list = fs.readdirSync(__dirname + "/../Profiles");

    profile_list.forEach(profile => {
        if(profile == "imgs"){

        }else{
            console.log("Load profile named " + profile.replace(".json" , ""));
            let jsonProfile = require("./../Profiles/" + profile);
                let html = main;
                html = html.replace("$1" , jsonProfile["nickname"]);
                html = html.replace("$1" , jsonProfile["nickname"]);
                html = html.replace("$2" , jsonProfile["rank"]);
                html = html.replace("$3" , jsonProfile["date"]);
                html = html.replace("$4" , jsonProfile["image_src"]);

            app.get("/profiles/" + encodeURI(profile.replace(".json" , "")) , (req , res) => {
                res.send(html);
            })

            console.log("Complete Load profile named " + profile.replace(".json" , ""))
        }
    });
}