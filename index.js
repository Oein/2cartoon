let express = require("express")
;
let fs = require("fs");
let app = express();
let multer = require('multer');
let patha = require('path');
const shell = require('shelljs')

let upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path + '/uploads/');
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname.replace("undefined" , ""));
    }
  }),
});

let path = __dirname;

app.get("/login" , (req , res) => {
    res.sendFile(path + "/public/html/input_upload_id.html");
})

let ids = [
    "Teddy1128" , 
    "banana120813"
];

let options = [
    "<option>두환이와포커츄의세계여행</option><option>대출금리는너굴은행</option>",
    "<option>괴물과귀신이울고있다</option>"
];

app.get("/loginCheek" , (req , res) => {
    console.log(req.params);
    ids.forEach(id => {
        if(req.param("a") == id){
            res.send(`<script>location.href = location.href.split("/")[0] + "//" + location.href.split("/")[2] + "/upload?id=` + req.param("a") + `"</script>`);
        }
    });

    res.send("a");
});

app.post('/up', upload.array('profile_img'), (req, res) => {
    res.send("업로드 완료?");
    req.files.forEach(element => {
        element = element.filename;

        if(fs.ex)
        fs.rename(
            path + 
            "/uploads/" + 
            element, 
            path + 
            "/public/cartoons/" + 
            req.param("Opt") + 
            "/" + 
            req.param("wha").replace("화" , "").replace("%ED%99%94" , "") + 
            "%ED%99%94" + "/" + 
            element.replace(".png" , "").replace(".PNG" , "") + 
            ".png", 
            function(err){
        });
    });

    shell.exec(`cd ` + path);
    shell.exec(`git fetch`);
    shell.exec(`git pull`);
    shell.exec(`git add *`);
    shell.exec(`git commit -a -m "Uploaded!"`);
    shell.exec(`git push https://Oein:Oein02190219@github.com/Oein/2cartoon.git --all`);
    console.log(`Uploaded!`);
    init();
});

app.get('/upload' , (req , res) => {
    fs.readFile(path + "/public/html/upload.html", 'utf8', function (err, data) {
        for(let i = 0;i < ids.length;i++){
            if(ids[i] == req.param("id")){
                res.send(data.replace("$1" , options[i]));
            }
        }
    });
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
                            let temp = cartoonForm;
                            fs.readdir(path + `/public/cartoons/` + folda + "/" + element, (error, a) => {
                                temp = temp.replace("$1" , a.length);
                                temp = temp.replace("$2" , folda);
                                temp = temp.replace("$3" , element);
                                temp = temp.replace("$4" , decodeURI(element));
                                res.send(temp);
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
