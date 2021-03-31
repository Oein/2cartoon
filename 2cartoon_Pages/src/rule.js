exports.ae = (app) => {                                                                                                    // 이 모듈.ae(app) 을 입력하면 아래 소스를 실행
    app.get("/rule" , (req , res) => {                                                                                     // /rule에 접속하면 아래 소스를 실행
        res.send(require("fs").readFileSync(__dirname + "/html/rule1.html" , "utf-8"));
    });
};