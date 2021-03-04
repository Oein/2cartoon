let fs = require('fs');                                                  // fs모듈(폴더 읽기용) 로드
let express = require("express");

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

            n { color:#71368a; }
            v { color:#d1ac17; }
            m { color:#478cbc; }
            o { color:#2eb368; }

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
            </h1>
        </div>
        <div><div></div></div>
    </body>
</html>
`;

let cartoons = {};

exports.add = (nameOfperson , many) => {
    if(cartoons[nameOfperson] == undefined){
        cartoons[nameOfperson] = 0;
    }
    cartoons[nameOfperson] += many;
    if(require("./d").d) console.log(nameOfperson , "   " , cartoons[nameOfperson])
};

function getRank(name , t , s){
    let c = cartoons[name]; //count
    if(require("./d").d) console.log(name , "   " , c);

    if(name == "Oein"){
        if(t == 0) return "o";
        if(t == 1) return "<o style=\"" + s + "\">Operator++</o>";
    }

    if(c <= 5){
        if(t == 1) return "아직 만화의 화 수가 5개 이상 없어서 랭크가 없습니다";
    }

    if(c <= 15){
        if(t == 0) return "n";
        if(t == 1) return "<n style=\"" + s + "\">Nomal</n>";
    }

    if(c <= 25){
        if(t == 0) return "v";
        if(t == 1) return "<v style=\"" + s + "\">Vip</v>";
    }

    if(c <= 40){
        if(t == 0) return "v";
        if(t == 1) return "<v style=\"" + s + "\">VIP+</v>";
    }

    if(c <= 60){
        if(t == 0) return "v";
        if(t == 1) return "<v style=\"" + s + "\">VIP++</v>";
    }

    if(c <= 150){
        if(t == 0) return "m";
        if(t == 1) return "<m style=\"" + s + "\">MVP</m>";
    }

    if(c <= 210){
        if(t == 0) return "m";
        if(t == 1) return "<m style=\"" + s + "\">MVP+</m>";
    }

    if(c > 210){
        if(t == 0) return "m";
        if(t == 1) return "<m style=\"" + s + "\">MVP++</m>";
    }

    return "NONE";
}

exports.ae = (app) => {
    app.use("/profiles/imgs", express.static(__dirname + "/../imgs"));

    let profile_list = fs.readdirSync(__dirname + "/../Profiles");

    profile_list.forEach(profile => {
        if(profile == "imgs"){

        }else{
            console.log("Load profile named " + profile.replace(".json" , ""));
            let jsonProfile = require("./../Profiles/" + profile);
                let html = main;
                let f =  getRank(jsonProfile["nickname"] , 0 , jsonProfile["style"]);
                html = html.replace("$1" , jsonProfile["nickname"]);
                html = html.replace("$1" , "<" + f + " style=\"" + jsonProfile["style"] +  "\"" + ">" + jsonProfile["nickname"] + "</" + f + ">");
                html = html.replace("$2" , getRank(jsonProfile["nickname"] , 1 , jsonProfile["style"]));
                html = html.replace("$3" , jsonProfile["date"]);
                html = html.replace("$4" , jsonProfile["image_src"]);

            app.get("/profiles/" + encodeURI(profile.replace(".json" , "")) , (req , res) => {
                res.send(html);
            })

            console.log("Complete Load profile named " + profile.replace(".json" , ""));
            console.log("\n");
        }
    });

    app.get("/profiles/" , (req , res) => {
        let main = `<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Profile - Every Thing Is Not Seted</title>
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
                닉네임 : 아직 설정되지 않았어요
                <p></p>
                등급 : 아직 설정되지 않았어요
                <p></p>
                가입일 : 아직 설정되지 않았어요
            </h1>
        </div>
        <div><div></div></div>
    </body>
</html>
`;

            res.send(main);
    })
}