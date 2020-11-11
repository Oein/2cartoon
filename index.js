let express = require("express");
let fs = require("fs");
let app = express();

let path = __dirname;

app.get("/" , (req , res) => {
    res.sendFile(path + "/public/html/index.html");
});

fs.readdir(path + '/public/cartoons' , function(error , filelist) {
    console.log("cartoons : " + filelist);

    filelist.forEach(fold => {
        app.use('/cartoon/' + fold, express.static(path + '/public/cartoons/' + fold));
        fs.readdir(path + '/public/cartoons/' + fold , function(error , list){
            list.forEach(element => {
                app.use('/cartoon/' + fold + "/" + element, express.static(path + '/public/cartoons/' + fold + "/" + element));
                console.log(path + '/public/cartoons/' + fold + "/" + element + "\t\t at " + '/cartoon/' + fold + "/" + element + "\n\n");
            });
        })
    });
})

app.use('/ctI', express.static(path + '/public/cartoons/image'));

app.listen(80 , function() {
    console.log(`Erpress server started on 80 port`);
});