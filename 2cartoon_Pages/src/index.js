let express = require("express");       // express (서버 open용) 를 로드
let app = express();                    // express 서버를 생성

require("./cartoonViewer").ae(app);                           // 만화 뷰어 페이지 생성
require("./mainPage").ae(app);                           // 메인 페이지 생성
require("./rule").ae(app);                           // 만화 업로드 주의사항 페이지 생성
require("./lisence").ae(app);                        // 라이센스 페이지 생성
require("./commer").ae(app);
require("./rank").ae(app);
require("./cl").ae(app);
require("./profilePage").ae(app);
require("./Helpers").ae(app);

app.listen(8280);                       // 8280번 포트에서 실행