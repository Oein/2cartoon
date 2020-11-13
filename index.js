let express = require("express");
let multer = require("multer");
let fs = require("fs");
let app = express();

let path = __dirname;

let storagea = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/') // cb 콜백함수를 통해 전송된 파일 저장 디렉토리 설정
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname) // cb 콜백함수를 통해 전송된 파일 이름 설정
    }
  });
let upload = multer({ dest: 'uploads/' , storage: storagea });

app.get("/" , (req , res) => {
    res.sendFile(path + "/public/html/index.html");
});

app.post('/uploada', upload.single('userfile'), function(req, res){
    res.send('Uploaded! : '+req.file); // object를 리턴함
    console.log(req.file); // 콘솔(터미널)을 통해서 req.file Object 내용 확인 가능.
});

app.get('/upload' , (req , res) => {
    res.send(`
    <!doctype html>
        <html>
        <head>
            <meta charset='utf-8' />
        </head>
        <body>
            form(action='upload' method='post' enctype="multipart/form-data")
            input(type='file' name='userfile')
            input(type='submit')
    `);
});

app.get("/tt" , (req , res) =>{
    let a = {};
    a["total"] = total;
    a["today"] = today;
    res.send(a);
})

function init(){
    fs.readdir(path + '/public/cartoons' , function(error , filelista) {
        console.log("cartoons : " + filelista);
    
        for(let i = 0;i < filelista.length;i++){
            let folda = filelista[i];
            let fold = encodeURI(folda);
    
            app.use('/cartoon/' + fold, express.static(path + '/public/cartoons/' + fold));
            fs.readdir(path + '/public/cartoons/' + folda , function(error , list){
                let subCartoons = `<style>* {font-size: 1.3em;}</style>`;
    
                for(let i = 0;i < list.length;i++){
                    let element = list[i];
    
                    app.use('/cartoon/' + fold + "/" + element, express.static(path + '/public/cartoons/' + folda + "/" + element));
                    console.log(path + '/public/cartoons/' + folda + "/" + element + "\t\t at " + '/cartoon/' + folda + "/" + element + "\n\n");
    
                    subCartoons = subCartoons + `<p><h1><div><a href="` + '/cartoon/' + fold + "/" + element + `/main.html">` + decodeURI(element) + "</a></div></h1></p>"
                };
    
                app.get('/cartoon/' + fold + "/subCartoons.html" , function(req , res) {
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

function init_today(){
    const todaya = new Date();

    if(todaya.getHours() == 0){
        today = 0;
    }

    setTimeout(init_today , 1000);
}

app.listen(8280 , function() {
    console.log(`Erpress server started on 8280 port`);
    init_today();
});