let express = require("express"); //express 불러오기
let fs = require("fs"); //fs 불러오기
let app = express(); //express router 열기
let multer = require('multer'); //업로드 구현용 모듈 불러오기
let patha = require('path'); //업로드 구현용 모듈 불러오기
const shell = require('shelljs') //업로드시 자동 github 업로드를 위한 쉘 모듈 불러오기

let upload = multer({ //업로드 구현
  storage: multer.diskStorage({ //업로드 구현
    destination: function (req, file, cb) { //업로드 구현
      cb(null, path + '/uploads/'); //업로드 구현
    }, //업로드 구현
    filename: function (req, file, cb) { //업로드 구현
      cb(null, file.originalname.replace("undefined" , "")); //업로드 구현
    } //업로드 구현
  }), //업로드 구현
}); //업로드 구현

function make_img(url){ //만화만들때 img 태그 string 생성 function
    return `<img src="` + url + `" />`
}

let path = __dirname; //현재 디렉토리

function init(){ //app.get 같은거 하는곳
    app = undefined; //우선 리쎗
    app = express(); //router open

    app.get("/login" , (req , res) => { //로그인 패이지
        res.sendFile(path + "/public/html/input_upload_id.html"); //파일 보내기
    })
    
    let ids = [ //작가들 id
        "Teddy1128" , 
        "banana120813",
        "Oein219",
    ];
    
    let options = [ //id에 맞는 만화리스트
        "e두환이와포커츄의세계여행/oe대출금리는너굴은행/o",
        "e괴물과귀신이울고있다/o",
        "eTEST/o",
    ];
    
    app.get("/loginCheek" , (req , res) => { //로그인 부분
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
    
            if (!fs.existsSync(path + "/public/cartoons/" + req.param("Opt"))){
                fs.mkdirSync(path + "/public/cartoons/" + req.param("Opt"));
            }
    
            if (!fs.existsSync(path + "/public/cartoons/" + req.param("Opt") + "/" + req.param("wha").replace("화" , "").replace("%ED%99%94" , "") + "%ED%99%94")){
                fs.mkdirSync(path + "/public/cartoons/" + req.param("Opt") + "/" + req.param("wha").replace("화" , "").replace("%ED%99%94" , "") + "%ED%99%94");
            }
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
                    res.send(data.replace("$1" , options[i].replace("/o" , "</option>").replace("e" , "<option>")));
                }
            }
        });
    })
    
    app.get("/" , (req , res) => {
        res.sendFile(path + "/public/html/index.html");
    });

    app.get("/admin" , (req , res) => {
        res.sendFile(path + "/public/html/admin.html");
    });

    app.get("/reload" , (req , res) => {
        init();
        res.send("Reload Completed!");
        console.log("\n\n -- Someone come into /reload --\n\n")
    });

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
                                let imgs = "";
                                a.forEach(elemena => {
                                    imgs = imgs + make_img(`/cartoon/` + folda + "/" + element + "/" + elemena) + `<p></p>`;
                                })
                                temp = temp.replace("$1" , decodeURI(element));
                                temp = temp.replace("$2" , imgs);
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

    console.log("Reloaded!");
}

init();

app.listen(8280 , function() {
    console.log(`Erpress server started on 8280 port`);
});
