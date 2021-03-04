exports.ae = (app) => {
    app.get("/rank" , (req , res) => {
        res.send(`
        <html><head><title>Rank System</title><style>
        body{ background-color:#36393F }
        big {color:white;font-size:1.3em;}
        </style></head><body>
        <big>만화의 화수에 따라 분류됩니다.</big><p></p>
        <big>5개 이하 : 없음</big><p></p>
        <big>6 ~ 15 : Nomal</big><p></p>
        <big>16 ~ 25 : VIP</big><p></p>
        <big>26 ~ 40 : VIP+</big><p></p>
        <big>41 ~ 60 : VIP++</big><p></p>
        <big>61 ~ 150 : MVP</big><p></p>
        <big>151 ~ 210: MVP+</big><p></p>
        <big>211 ~ : MVP++</big><p>&nbsp;</p>
        <p>&nbsp;</p>
        <big>운영자는 권한에 따라 분류</big><p></p>
        <big>Low Level : Operator</big><p></p>
        <big>Middle Level : Operator+</big><p></p>
        <big>High Level : Operator++</big><p></p>
        </body></html>
        `);
    });
};