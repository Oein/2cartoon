let fs = require('fs');                                                  // fs모듈(폴더 읽기용) 로드
let rS = require("./rS");                                                // 스페이스바 재거 모듈 로드
let express = require("express");

let main = fs.readFileSync(__dirname + "/../Profiles/profile.html").toString();

exports.ae = (app) => {
    app.use("/profiles/imgs", express.static(__dirname + "/../Profiles/imgs"));

    let profile_list = fs.readdirSync(__dirname + "/../Profiles");

    profile_list.forEach(profile => {
        if(profile == "imgs"){

        }else{
            app.get("/profiles/" + encodeURI(profile.replace(".json" , "")) , (req , res) => {
                let jsonProfile = require("./../Profiles/" + profile);
                let html = main;
                html = html.replace("$1" , jsonProfile["nickname"]);
                html = html.replace("$1" , jsonProfile["nickname"]);
                html = html.replace("$2" , jsonProfile["rank"]);
                html = html.replace("$3" , jsonProfile["date"]);

                res.send(html);
            })
        }
    });
}