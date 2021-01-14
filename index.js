let app = require("express")();

app.get("/" , (req , res) => {
    res.send("사죄의 말씀 드리며 서버 코드를 처음부터 다시짜고 더 나은 tocar.kro.kr로 돌아오겠습니다. 죄송합니다.");
})

app.listen(8280);