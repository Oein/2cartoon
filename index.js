const { table } = require("console");
let express = require("express");
let fs = require("fs");
const { encode } = require("punycode");
let app = express();

let path = __dirname;

app.get("/" , (req , res) => {
    let data = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>2cartoon 매인 페이지</title>
    
        <style>
            div[class="cart"] {
                background-color: rgba(218, 218, 218, 0.479);
                width: 90%;
                height: 20%;
                margin: 2%;
                padding: 2%;
                padding-bottom: 1%;
                border-radius: 5px;
                align-items: center;
                text-align: center;
                word-break:break-all;word-wrap:break-word;
            }
    
            body{
                align-items: center;
                text-align: center;
            }
    
            img {
                width: 30%;
                height: 30%;
                border-radius: 5px;
                overflow: visible ;
                padding: 0%;
                padding-right: 15%;
            }
    
            a{
                text-decoration: white;
            }
    
            div[class="up"] {
                width: 100%;
                height: 100px;
                color: #e9e9e9;
                text-align: center;
                align-items: center;
                background-color: burlywood;
            }
        </style>
    </head>
    <body onload="init()">
        <noscript>
            지원이 안되는 장치 입니다!
        </noscript>
        $1
    
        <p></p>
    </body>
    </html>`;

    let cartoon_s_count = 0;
    let cartoons;

    fs.readdir(path + '/public/cartoons' , function(error , filelista) {
        cartoon_s_count = filelista.length;
        cartoons = filelista;
    });

    let table_html = `<table>`;
    const td_html = `<td>
                        <div class="cart">
                            <a class="name" >
                                <img src="$1" class="name" />
                                $2
                            </a>
                        </div>
                    </td>`;

    if(cartoon_s_count <= 3) {
        table_html = table_html + "<tr>";

        for(let i = 0;i < cartoon_s_count;i++){
            let td = td_html;
            td.replace("$1" , "/cartoon/" + cartoons[i] + "/sum.png");
            td.replace("$2" , cartoons[i]);
            table_html = table_html + td;
        }

        table_html = table_html + "</tr></table>";
    }

    data.replace("$1" , table_html);

    console.log(table);
    res.send(data);
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
    
                    subCartoons = subCartoons + `<p><h1><div><a href="` + '/cartoon/' + fold + "/" + element + `/main.html">` + decodeURI(element) + "</a></div></h1></p>"
                };
    
                app.get('/cartoon/' + fold + "/subCartoons.html" , (req , res) => {
                    res.send(subCartoons)
                });
            });
        }
    });
    
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