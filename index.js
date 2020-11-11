let express = require("express");
let fs = require("fs");
let app = express();

let path = __dirname;

app.get("/" , (req , res) => {
    res.sendFile(path + "/public/html/index.html");
});

app.use('/cartoon', express.static(path + '/public/cartoons'));
app.use('/ctI', express.static(path + '/public/cartoons/image'));

app.listen(80);