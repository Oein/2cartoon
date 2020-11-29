let express = require("express");
let fs = require("fs");
let app = express();

let path = __dirname;

app.get("/" , (req , res) => {
    res.sendFile(path + "/public/html/index.html");
});

function init(){
    app.use('/ads' , express.static(path + '/public/ads')); //ads

    fs.readdir(path + '/public/cartoons' , function(error , filelista) {
        console.log("cartoons : " + filelista); // Print cartoons
    
        for(let i = 0;i < filelista.length;i++){ //loop cartoons counts
            let folda = filelista[i]; //unencoded cartoon name
            let fold = encodeURI(folda); // encoded cartoon name
            app.use('/cartoon/' + fold, express.static(path + '/public/cartoons/' + fold)); //express server opens /cartoon/<EncodedCartoonName>
            fs.readdir(path + '/public/cartoons/' + folda , function(error , list){  //loop 화's count
                // Make subcartoons page
            
                let subCartoons = `<style>* {font-size: 1.3em;}</style>`;
    
                for(let i = 0;i < list.length;i++){
                    let element = list[i];
    
                    app.use('/cartoon/' + fold + "/" + element, express.static(path + '/public/cartoons/' + folda + "/" + element));
                    console.log(path + '/public/cartoons/' + folda + "/" + element + "\t\t at " + '/cartoon/' + folda + "/" + element + "\n\n");
    
                    let main_html_path = `/cartoon/` + fold + "/" + element + `/main.html`;
                    subCartoons = subCartoons + `<p><h1><div><a href="` + main_html_path + `">` + decodeURI(element) + "</a></div></h1></p>"
                
                    
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