let express = require("express");
let fs = require("fs");
let app = express();

let path = __dirname;

app.get("/" , (req , res) => {
    res.sendFile(path + "/public/html/index.html");
});

fs.readdir(path + '/public/cartoons' , function(error , filelist) {
    console.log("cartoons : " + filelist);

    filelist.forEach(element => {
        app.use('/cartoon/' + element, express.static(path + '/public/cartoons/' + element));
    });
})

app.use('/ctI', express.static(path + '/public/cartoons/image'));

app.listen(80 , function() {
    console.log(`Erpress server started on 80 port`);
});