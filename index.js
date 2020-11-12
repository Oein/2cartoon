let express = require("express");
let fs = require("fs");
const { encode } = require("punycode");
let app = express();

let path = __dirname;

app.get("/" , (req , res) => {
    res.sendFile(path + "/public/html/index.html");
});

function init(){
    fs.readdir(path + '/public/cartoons' , function(error , filelista) {
        console.log("cartoons : " + filelista);
    
        for(let i = 0;i < filelista.length;i++){
            let folda = filelista[i];
            let fold = encodeURI(folda);
    
            app.use('/cartoon/' + fold, express.static(path + '/public/cartoons/' + fold));
            fs.readdir(path + '/public/cartoons/' + folda , function(error , list){
                let subCartoons = ``;
    
                for(let i = 0;i < list.length;i++){
                    let element = list[i];
    
                    app.use('/cartoon/' + fold + "/" + element, express.static(path + '/public/cartoons/' + folda + "/" + element));
                    console.log(path + '/public/cartoons/' + folda + "/" + element + "\t\t at " + '/cartoon/' + folda + "/" + element + "\n\n");
    
                    subCartoons = subCartoons + `<p><h1><div><a href="` + '/cartoon/' + fold + "/" + element + `/main.html">` + element + "</a></div></h1></p>"
                };
    
                app.get('/cartoon/' + fold + "/subCartoons.html" , (req , res) => {
                    res.send(subCartoons)
                })
            })
        };
    })
    
    app.use('/ctI', express.static(path + '/public/cartoons/image'));
    app.use('/fonts', express.static(path + '/public/fonts'));
}

init();

app.get("/reload" , (req , res) => {
    init();
    res.send("Reload Completed!");
    console.log("\n\n -- Someone come into /reload --\n\n")
});

app.listen(80 , function() {
    console.log(`Erpress server started on 80 port`);
});