let express = require("express");
let app = express();
let main = require("./mainPage");
let view = require("./cartoonViewer");
let path = require('path');

view.ae(app);
main.ae(app);

app.get("/rule" , (req , res) => {
    res.sendFile(path.resolve(__dirname + "/../public/rule.html"))
});

app.listen(8280);