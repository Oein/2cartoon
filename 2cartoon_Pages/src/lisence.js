let fs = require("fs");                                                                 // fs 모듈 (파일 읽기 , 폴더 읽기 용 모듈) 로드

let txt_files = fs.readdirSync(__dirname + "/../../lisences");                          // fs 모듈도 라이센스 파일들이 들어있는 파일들 리스트를 txt_files에 저장
let html = "<html><head><title>2cartoon lisence</title></head><body>";                  // 라이센스 페이지 html 생성

txt_files.forEach(name => {                                                             // txt_files에 있는 항목들을 돌면서 반복
    console.log(name);                                                                  // 현재 작업중인 파일 출력
    let txt = fs.readFileSync(__dirname + "/../../lisences/" + name , "utf-8");         // 현재 작업중인 파일의 내용을 txt에 저장
    html += "<h1>" + name.replace(".txt" ,"") + "</h1><p></p><h3>";                     // html 내용을 추가
    txt.toString().split(/\n/).forEach(function(line){                                  // txt에 있는 내용을 한줄씩 읽어가며 반복
        html += line + "\n" + "<p></p>";                                                // html 내용 추가
    });                                                     
    html += "</h3><p>&nbsp;</p><p>&nbsp;</p><p>&nbsp;</p>";                             // html 내용 추가
    console.log(name + " complete!\n\n");                                               // 작업중인 파일을 완료했다고 출력
});

html += "</body></html>";                                                               // hmtl 내용 추가

exports.ae = (app) => {                                                                 // 이 소스.ae(app) 을 호출하면 아래소스를 실행
    app.get("/lisence" ,(req , res) => {                                                // /lisence에 접속하면 아래소스 실행
        res.send(html);                                                                 // 위에서 만든 html을 전송
    })
}