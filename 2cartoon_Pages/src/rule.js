exports.ae = (app) => {
    app.get("/rule" , (req , res) => {
        res.send(`<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>만화업로드 주의사항</title>
            <style>
                body{
                    background-color: #4d4de7;
                    color: #7DE8D4;
                }
            </style>
        </head>
        <body>
            <h3>만화 파일 이름 규칙</h3>
            <h4><li>1.~~~ 2.~~~ 처럼 1부터 1씩 올려가면서 파일 이름을 사용</h4></li>
            
            <p>&nbsp;</p>
        
            <h3>만화 파일 전송규칙</h3>
            <h4><li>만화파일은 Oein0219@gmail.com에 전송</li></h4>
            <h4><li>만화 이미지를 보낼때는 한 화를 한번에 전송</li></h4>
        
            <p>&nbsp;</p>
        
            <h3>새로운 만화 생성전 주의사항</h3>
            <h4><li>전에 만들던 만화가 있으면 전에 만들던 만화를 최소 15화 까지 만들어야 새 만화를 생성 가능</li></h4>
        
            <p>&nbsp;</p>
        
            <h3>이미지의 사이즈</h3>
            <h4><li>썸네일 이미지는 1920x1920으로 제작</li></h4>
            <h4><li>컷들은 1920x1080으로 제작</li></h4>
        </body>
        </html>`);
    });
};