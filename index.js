let express = require("express");
let fs = require("fs");
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
            app.use('/ads' , express.static(path + '/public/ads'))
            app.use('/cartoon/' + fold, express.static(path + '/public/cartoons/' + fold));
            fs.readdir(path + '/public/cartoons/' + folda , function(error , list){
                let subCartoons = `<style>* {font-size: 1.3em;}</style>`;
    
                for(let i = 0;i < list.length;i++){
                    let element = list[i];
    
                    app.use('/cartoon/' + fold + "/" + element, express.static(path + '/public/cartoons/' + folda + "/" + element));
                    console.log(path + '/public/cartoons/' + folda + "/" + element + "\t\t at " + '/cartoon/' + folda + "/" + element + "\n\n");
    
                    subCartoons = subCartoons + `<p><h1><div><a href="` + '/cartoon/' + fold + "/" + element + `/main.html">` + decodeURI(element) + "</a></div></h1></p>"

                    app.get('/cartoon/' + fold + "/" + element + `/main.html"` , (req , res) => {
                        
                    })
                };
    
                app.get('/cartoon/' + fold + "/subCartoons.html" , function(req , res) {
                    res.send(subCartoons)
                })
            })
        };
    })
    
    app.use('/ctI', express.static(path + '/public/cartoons/image'));
}

init();

app.get("/reload" , (req , res) => {
    init();
    res.send("Reload Completed!");
    console.log("\n\n -- Someone come into /reload --\n\n")
});

app.listen(8280 , function() {
    console.log(`Erpress server started on 8280 port`);
});