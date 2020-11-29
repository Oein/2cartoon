let express = require("express");
let fs = require("fs");
let app = express();
const multer = require('multer');
const patha = require('path');

const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
      cb(null, new Date().valueOf() + patha.extname(file.originalname));
    }
  }),
});

let path = __dirname;

app.post('/up', upload.single('img'), (req, res) => {
    console.log(req.file);
    res.send("asd");
});

app.get('/upa' , (req , res) => {
    res.sendFile(path + "/public/html/test.html")
})

app.get("/" , (req , res) => {
    res.sendFile(path + "/public/html/index.html");
});

function init(){
    fs.readFile(path + "/public/html/cartoonForm.html", 'utf8', function (err, cartoonForm) {
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
                    
                        app.get(main_html_path , (req , res) => {
                            fs.readdir(path + `/public/cartoons/` + folda + "/" + element, (error, a) => {
                                cartoonForm = cartoonForm.replace("$1" , a.length);
                                cartoonForm = cartoonForm.replace("$2" , folda);
                                cartoonForm = cartoonForm.replace("$3" , element);
                                cartoonForm = cartoonForm.replace("$4" , decodeURI(element));
                                res.send(cartoonForm);
                            });
                        });
                    };
        
                    app.get('/cartoon/' + fold + "/subCartoons.html" , function(req , res) {
                        res.send(subCartoons)
                    })
                })
            };
        })
        
        app.use('/ctI', express.static(path + '/public/cartoons/image'));
    });
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