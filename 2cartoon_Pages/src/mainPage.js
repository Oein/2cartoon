let fs = require('fs');                                                  // fs모듈(폴더 읽기용) 로드
let rS = require("./rS");                                                // 스페이스바 재거 모듈 로드
let express = require("express");

exports.ae = (app) => {
    let root_dir = fs.readdirSync(__dirname + "/../cartoons");           // 만화 리스트를 root_dir에 저장
    let html = "" +                                                      // 아래 html코드를 html에 저장
    `                                                         
    <html>
    <head>
    <style>
    img {
    width : 100%;
    border-radius : 10px;
    }

    div[class="name"]{
    text-align: center;
    width : 100%
    }

    * { font-size: large; }
    a { text-decoration:none; color: #EEEDED; }
    body{ background-color:#36393F }

    .asd{
        position: fixed;
        left: 10px;
        bottom: 10px;
        width: 15%;
        height: 3.1%;
        font-size: 1.05em;
        background-color:#36393F;
        border-radius: 10px;
        color: #EEEDED;
        text-align: center;
        border: black 2px solid;
    }

    .asdf{
        position: fixed;
        left: 17%;
        bottom: 10px;
        width: 13%;
        height: 3.1%;
        font-size: 1.05em;
        background-color:#36393F;
        border-radius: 10px;
        color: #EEEDED;
        text-align: center;
        border: black 2px solid;
    }

    .asdfg{
        position: fixed;
        left: 31%;
        bottom: 10px;
        width: 13%;
        height: 3.1%;
        font-size: 1.05em;
        background-color:#36393F;
        border-radius: 10px;
        color: #EEEDED;
        text-align: center;
        border: black 2px solid;
    }

    img[id="Gif"]{
        top:0px;
        width:100%
    }

    </style>
    <title>2cartoon</title>
    </head>
    <body>
    <img id="Gif" src="/MainGIf.gif" alt="2cartoon">
    <div class="asd">
    <a class="asd" href="/rule">
    만화업로드
    </a>
    </div>
    <div class="asdf">
    <a class="asdf" href="/lisence">
    라이센스
    </a>
    </div>
    <div class="asdfg">
    <a class="asdfg" href="https://discord.gg/BMWufknvvY">
    디스코드
    </a>
    </div>
    <table>
    <tr>
    `;

    for(let i = 0;i < root_dir.length;i++){                                                                     // 만화리스트에서 만화를 하나씩 읽으며 반복
    if(i % 3 == 0) html += `</tr><tr>`;                                                                         // html에 만화가 3의 배수개많큼 있으면 다음 줄로 이동
    html += "<td>";                                                                                             // html 코드 추가
    html += `<div class="cartoon"><a href="/`;                                                                  // html 코드 추가
    
    html += rS.rS(root_dir[i]);                                                                                 // html 코드 추가
    html += `/sub">`;                                                                                           // html 코드 추가
    html += `<img src="/`;                                                                                      // html 코드 추가
    html += rS.rS(root_dir[i]);                                                                                 // html 코드 추가
    html += `/thumb.png"><div class="name">`;                                                                   // html 코드 추가
    html += root_dir[i].split("_")[0];                                                                          // html 코드 추가
    html += `</div></a></div></td>`;                                                                            // html 코드 추가
    }

    html += "</tr></table><p>&nbsp</p><p>&nbsp</p><p>&nbsp</p><p>&nbsp</p><p>&nbsp</p></body></html>";          // html 코드 추가

    app.get("/" , (req , res) => {                                                                              // /에 접속하면 아래 코드 실행
    res.send(html);                                                                                             // html 전송
    });

    //favicon
    app.use("/", express.static(__dirname + "/../favicon"));
    app.use("/", express.static(__dirname + "/../imgs"));
}