let express = require("express"); //express 불러오기
let fs = require("fs"); //fs 불러오기
let app = express(); //express router 열기
let multer = require('multer'); //업로드 구현용 모듈 불러오기
let shell = require('shelljs') //업로드시 자동 github 업로드를 위한 쉘 모듈 불러오기
const colors = require('colors');

let path = __dirname; //현재 디렉토리

let total = Number(fs.readFileSync(path + "/total.2t" , "utf-8"));
let today = Number(fs.readFileSync(path + "/today.2t" , "utf-8"));

function totalup(ip){
    total++;
    today++;
    console.log(("\n\n\t\tTotal : " + total + "\n\t\tToday : " + today + "\n\t\tIP : " + ip + "\n\n").bgBlue.black);
    fs.writeFileSync(path + "/total.2t" , total);
    fs.writeFileSync(path + "/today.2t" , total);
}

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

function init(){ //app.get 같은거 하는곳
    app = undefined; //우선 리쎗
    app = express(); //router open

    app.get("/login" , (req , res) => { //로그인 패이지
        res.sendFile(path + "/public/html/input_upload_id.html"); //파일 보내기
        totalup(req.ip);
    })
    
    let ids = [ //작가들 id
        "Teddy1128" , 
        "banana120813",
        "Oein219",
    ];
    
    let options = [ //id에 맞는 만화리스트
        "<option>두환이와포커츄의세계여행</option><option>대출금리는너굴은행</option>",
        "<option>괴물과귀신이울고있다</option>",
        "<option>TEST</option>",
    ];
    
    app.get("/loginCheek" , (req , res) => { //로그인 부분
        console.log(req.params);
        ids.forEach(id => {
            if(req.param("a") == id){
                res.send(`<script>location.href = location.href.split("/")[0] + "//" + location.href.split("/")[2] + "/upload?id=` + req.param("a") + `"</script>`);
            }
        });
    
        res.send(`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>로그인 실패</title></head><body><h1>Error - 로그인 실패</h1></body>`);
        totalup(req.ip);
    });
    
    app.post('/up', upload.array('profile_img'), (req, res) => { //업로드 post
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
                "/" + 
                element.replace(".png" , "").replace(".PNG" , "") + 
                ".png", 
                function(err){
            });
        });
    
        shell.exec(`cd ` + path); //git upload
        shell.exec(`git fetch`); //git upload
        shell.exec(`git pull`); //git upload
        shell.exec(`git add *`); //git upload
        shell.exec(`git commit -a -m "Uploaded!"`); //git upload
        shell.exec(`git push https://Oein:Oein02190219@github.com/Oein/2cartoon.git --all`); //git upload
        console.log(`Uploaded!`); //git upload
        totalup(req.ip);
        
        fs.writeFileSync(path + "/index.js" , fs.readFileSync(path + "/index.js" , "utf-8") + "//");
    });
    
    app.get('/upload' , (req , res) => { //업로드 페이지
        fs.readFile(path + "/public/html/upload.html", 'utf8', function (err, data) {
            for(let i = 0;i < ids.length;i++){
                if(ids[i] == req.param("id")){
                    res.send(data.replace("$1" , options[i]));
                }
            }
        });
        totalup(req.ip);
    })
    
    app.get("/" , (req , res) => { //메인
        res.sendFile(path + "/public/html/index.html");
        totalup(req.ip);
    });

    app.get("/admin" , (req , res) => { //제작자
        res.sendFile(path + "/public/html/admin.html");
        totalup(req.ip);
    });

    app.get("/reload" , (req , res) => { //reload부분
        init();
        res.send("Reload Completed!");
        console.log("\n\n -- Someone come into /reload --\n\n")
        totalup(req.ip);
    });

    fs.readFile(path + "/public/html/cartoonForm.html", 'utf8', function (err, cartoonForm) { //만화 페이지 sub~~ 생성 부분
        app.use('/ads' , express.static(path + '/public/ads')); //ads
    
        fs.readdir(path + '/public/cartoons' , function(error , filelista) { //cartoons
            console.log("cartoons : " + filelista); // Print cartoons
        
            for(let i = 0;i < filelista.length;i++){ //loop cartoons counts
                let folda = filelista[i]; //unencoded cartoon name
                let fold = encodeURI(folda); // encoded cartoon name
                app.use('/cartoon/' + fold, express.static(path + '/public/cartoons/' + fold)); //express server opens /cartoon/<EncodedCartoonName>
                fs.readdir(path + '/public/cartoons/' + folda , function(error , list){  //read folda dir
                    // Make subcartoons page
                
                    let subCartoons = `<style>* {font-size: 1.3em;}</style>`; //subcartoon style
        
                    list.sort(function(a, b) { // 오름차순
                        return a - b;
                        // 1, 2, 3, 4, 10, 11
                    });
                    
                    for(let i = 0;i < list.length;i++){ //loop 화's count
                        let element = list[i]; //element
        
                        app.use('/cartoon/' + fold + "/" + element, express.static(path + '/public/cartoons/' + folda + "/" + element));
                        console.log(path + '/public/cartoons/' + folda + "/" + element + "\t\t at " + '/cartoon/' + folda + "/" + element + "\n\n");
        
                        let main_html_path = `/cartoon/` + fold + "/" + element + `/main.html`;
                        subCartoons = subCartoons + `<p><h1><div><a href="` + main_html_path + `">` + decodeURI(element) + "화" + "</a></div></h1></p>"
                    
                        app.get(main_html_path , (req , res) => { //Make main page
                            let temp = cartoonForm;
                            fs.readdir(path + `/public/cartoons/` + folda + "/" + element, (error, a) => {
                                temp = temp.replace("$1" , a.length);
                                temp = temp.replace("$2" , folda);
                                temp = temp.replace("$3" , element);
                                temp = temp.replace("$4" , decodeURI(element));
                                res.send(temp);
                            });

                            totalup(req.ip);
                        });
                    };
        
                    app.get('/cartoon/' + fold + "/subCartoons.html" , function(req , res) { //make subcartoons.html
                        res.send(subCartoons); //send
                        totalup(req.ip);
                    })
                })
            };
        })
        
        app.use('/ctI', express.static(path + '/public/cartoons/image')); //썸네일
    });

    console.log("Reloaded!"); //say Reload Complete
    shell.exec(`git add https://Oein:Oein02190219@github.com/Oein/2cartoon.git *`); //git upload
    shell.exec(`git commit https://Oein:Oein02190219@github.com/Oein/2cartoon.git -a -m "Uploaded!"`); //git upload
    shell.exec(`git push https://Oein:Oein02190219@github.com/Oein/2cartoon.git --all`); //git upload
}

function today_init(){
    let now = new Date();  
    if(now.getHours() == 0 && now.getMinutes() == 0 && now.getSeconds() == 0){
        today = 0;
    }

    setTimeout(today_init , 500)
}

today_init();
init(); //Init

let server = app.listen(8280 , function() { //Open Server
    console.log(`Erpress server started on 8280 port`); //Log
});//