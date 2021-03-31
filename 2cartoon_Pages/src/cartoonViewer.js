let path = require('path');                                                                                                                                                                                 // 현재 폴더 주소 로드용 모듈
let fs = require('fs');                                                                                                                                                                                     // fs 모듈 로드
let rS = require("./rS");                                                                                                                                                                                   // 스페이스바 제거 모듈
let express = require("express");                                                                                                                                                                           // 폴더를 그대로 어떤 주소에 올리기 위해서 express 모듈 로드

exports.ae = (app) => {                                                                                                                                                                                  // 이 모듈.ae(app)을 입력하면 아래 코드 실행
    let cartoon_names = fs.readdirSync(__dirname + "/../cartoons");                                                                                                                                 // 만화들이 들어있는 폴더를 읽은뒤 아래 코드 실행
    cartoon_names.forEach(nows_cartoon_name => {   
        if(nows_cartoon_name != ".DS_Store"){                                                                                                                                                 // 만화들 리스트에서 한 만화씩 읽으면서 반복
            let isNamePrinted = true;                                                                                                                                                                       // 지금 이 만화가 전에 출력이 안되었다고 저장
            app.use('/' + encodeURI(rS.rS(nows_cartoon_name)), express.static(__dirname + "/../cartoons/" + nows_cartoon_name));                                                                            // 썸네일을 인터넷에 업로드
            let subcartoons_html = "<html><head><title>";                                                                                                                                                   // 만화 선택창 html
            subcartoons_html += nows_cartoon_name.split("_")[0] + "</title>";                                                                                                                                             // 만화 이름을 title로 사용
            subcartoons_html += "<style>* {font-size: 1.3em;}  a { text-decoration:none; color: #EEEDED; margin-left: 10px; } body{ background-color:#36393F } </style></head><body>\n\n";                  // style을 html에 추가

            fs.readdir(__dirname + "/../cartoons/" + nows_cartoon_name, function(error, nows_cartoons_hwas) {    
                let name_of_thi = nows_cartoon_name.split("_")[1] == "" ? "아직 설정되지 않았어요" :  nows_cartoon_name.split("_")[1]
                subcartoons_html += "<p><h1><a href=\"/profiles/" + nows_cartoon_name.split("_")[1] + "\">제작자 : " + name_of_thi + "</a></h1></p>";
                if (nows_cartoons_hwas.length == 1) {                                                                                                                                                       // 썸네일만 있으면 아무것도 없나보내요를 html에 추가
                    subcartoons_html += "<p><h1><a>아직 아무것도 없나보네요</a></h1></p>";
                }

                require("./profilePage").add(nows_cartoon_name.split("_")[1] , nows_cartoons_hwas.length - 1);

                nows_cartoons_hwas.forEach(nows_cartoons_hwa => {                                                                                                                                           // 읽어진 화들을 읽으면서 반복
                    if (nows_cartoons_hwa != ".DS_Store" && nows_cartoons_hwa != "thumb.png" && nows_cartoons_hwas.length != 1) {                                                                                                               // 썸네일만 있지 않다면 아래 코드 실행
                        if (isNamePrinted) {                                                                                                                                                                // 이만화의 이름전 전에 출력되지 않았다면 아래 코드 실행
                            console.log("cartoon_name : ", nows_cartoon_name);                                                                                                                              // 이만화의 이름 출력
                            isNamePrinted = false;                                                                                                                                                          // 이 만화의 이름이 전에 출력됬다고 저장
                        }
                        console.log("nows_cartoons_hwa : ", nows_cartoons_hwa);

                        subcartoons_html += `<p><h1><a href="/`;
                        subcartoons_html += rS.rS(nows_cartoon_name);
                        subcartoons_html += "/";
                        subcartoons_html += nows_cartoons_hwa;
                        subcartoons_html += `/main">`;
                        subcartoons_html += nows_cartoons_hwa;
                        subcartoons_html += "화</a></h1></p>\n\n";

                        // web/만화이름/화/main
                        // <p><h1><a href="web/만화이름/화/main">{화}화</a></h1></p>

                        files = fs.readdirSync(__dirname + "/../cartoons/" + nows_cartoon_name + "/" + nows_cartoons_hwa);

                        let cartoon_page_html = `
                        <html>
                        <head>
                        <style>
                        img , video {
                            margin: 5%;
                            margin-top:1%;
                            width: 90%;
                            border: 2px black solid;
                            border-radius: 10px;
                        }
                
                        body{ background-color:#36393F }
                        </style>
                        <title>` + nows_cartoon_name.split("_")[0] + " / " + nows_cartoons_hwa + "화" + " / " + files.length + "개의 파일 있음" + `</title>
                        </head>
                        <body>
                
                        `


                        files.sort((a, b) => {
                            let aa = Number(rS.rS(a).split(".")[0]);
                            let bb = Number(rS.rS(b).split(".")[0]);

                            return aa > bb ? 1 : aa == bb ? 0 : -1;
                        })

                        files.forEach(haw_file => {
                            if(haw_file != ".DS_Store"){
                                let extn = path.extname(haw_file);
                                if (extn == ".mp4") {
                                    //영상
                                    cartoon_page_html += `
                        <video controls loop preload="auto">
                            <source src="/`;
                                    cartoon_page_html += rS.rS(nows_cartoon_name);
                                    cartoon_page_html += "/";
                                    cartoon_page_html += nows_cartoons_hwa;
                                    cartoon_page_html += `/`;
                                    cartoon_page_html += haw_file;
                                    cartoon_page_html += `">
                        </video><p></p>
                        `;
                                } else if (extn == ".png" || extn == ".jpg" || extn == ".bmp") {
                                    //나머지
                                    cartoon_page_html += `<img src="/`;
                                    cartoon_page_html += rS.rS(nows_cartoon_name);
                                    cartoon_page_html += "/";
                                    cartoon_page_html += nows_cartoons_hwa;
                                    cartoon_page_html += `/`;
                                    cartoon_page_html += haw_file;
                                    cartoon_page_html += `" /><p></p>`;
                                }
                            }
                        });

                        cartoon_page_html += "</body></html>";

                        app.get("/" + encodeURI(rS.rS(nows_cartoon_name)) + "/" + nows_cartoons_hwa + "/main", function(req, res) {
                            res.send(cartoon_page_html);
                        });

                        console.log(nows_cartoons_hwa , " complete!\n");
                    };
                });

                subcartoons_html += "</body></html>"

                console.log("\n");
            })

            app.get('/' + encodeURI(rS.rS(nows_cartoon_name)) + "/sub", function(req, res) {
                res.send(subcartoons_html);
            });
        }
    });
}