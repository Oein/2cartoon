const express = require('express');
let app = express();
const fs = require('fs');

let allowPages = {"/":true}

app.get("/" , (req , res) => {
    if(allowPages["/"] == true){
        res.send("This is temp page");
        allowPages["/"] = false;
    }else{
        res.send(`<body><script>location.href=location.protocol + "//" + location.host + "/404"</script></body>`);
    }
});

app.get("/404" , (req , res) => {
    res.send("404");
    res.status(404);
})

app.listen(8280);