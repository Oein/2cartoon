let express = require("express");
let fs = require("fs");
let app = express();

let path = `/Users/S/Desktop/discord Bot/2cartoon`;

app.get("/" , (req , res) => {
    res.sendFile(path + "/public/html/index.html");
});

app.use('/cartoon', express.static(__dirname + '/public/cartoons'));
app.use('/ctI', express.static(__dirname + '/public/cartoons/image'));

app.listen(80);