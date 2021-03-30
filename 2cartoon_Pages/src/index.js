let express = require("express");       // express (서버 open용) 를 로드
let app = express();                    // express 서버를 생성

let main = require("./mainPage");       // 메인 페이지 생성 소스 로드
let view = require("./cartoonViewer");  // 만화 뷰어 페이지 생성 소스 로드
let rule = require("./rule");           // 만화 업로드 주의사항 페이지 생성 소스 로드
let lisence = require("./lisence");     // 라이센스 페이지 생성 코드 로드
let profile = require("./profilePage");
let commer = require("./commer");
let rank = require("./rank");
let changeLog = require("./cl");

view.ae(app);                           // 만화 뷰어 페이지 생성
main.ae(app);                           // 메인 페이지 생성
rule.ae(app);                           // 만화 업로드 주의사항 페이지 생성
lisence.ae(app);                        // 라이센스 페이지 생성
setTimeout(profile.ae , 3000 , app);
commer.ae(app);
rank.ae(app);
changeLog.ae(app);

app.listen(8280);                       // 8280번 포트에서 실행