exports.ae = (app) => {
    app.get("/rank" , (req , res) => {
        res.send(`
        <html><head><title>Rank System</title><style>
        body{ background-color:#36393F }
        big {color:white;font-size:1.3em;}
        n { color:#71368a; }
        v { color:#d1ac17; }
        m { color:#478cbc; }
        o { color:#2eb368; }
        </style></head><body>
        <big>만화의 화수에 따라 분류됩니다.</big><p></p>
        <big>5개 이하 : 없음</big><p></p>
        <big>6 ~ 15 : <n>Nomal</n></big><p></p>
        <big>16 ~ 25 : <v>VIP</v></big><p></p>
        <big>26 ~ 40 : <v>VIP+</v></big><p></p>
        <big>41 ~ 60 : <v>VIP++</v></big><p></p>
        <big>61 ~ 150 : <m>MVP</m> 원하는 색 설정 가능</big><p></p>
        <big>151 ~ 210: <m>MVP+</m> 원하는 색 설정 가능</big><p></p>
        <big>211 ~ : <m>MVP++</m> 원하는 색 설정 가능</big><p>&nbsp;</p>
        <p>&nbsp;</p>
        <big>운영자는 권한에 따라 분류</big><p></p>
        <big>Low Level : <o>Operator</o> 원하는 색 설정 가능</big><p></p>
        <big>Middle Level : <o>Operator+</o> 원하는 색 설정 가능</big><p></p>
        <big>High Level : <o>Operator++</o> 원하는 색 설정 가능</big><p></p>
        </body></html>
        `);
    });
};