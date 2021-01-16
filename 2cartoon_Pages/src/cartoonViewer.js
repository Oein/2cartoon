let path = require('path');
let fs = require('fs');
let rS = require("./rS");
let express = require("express");

exports.ae = (app) => {
    fs.readdir(__dirname + "/../cartoons", function(error, cartoon_names){
        cartoon_names.forEach(nows_cartoon_name => {
          let isNamePrinted = true;
          app.use('/' + encodeURI(rS.rS(nows_cartoon_name)), express.static(__dirname + "/../cartoons/" + nows_cartoon_name));
          let subcartoons_html = "<html><head><style>* {font-size: 1.3em;}  a { text-decoration:none; color: #EEEDED; margin-left: 10px; } body{ background-color:#0075C9 } </style></head><body>\n\n";
      
          fs.readdir(__dirname + "/../cartoons/" + nows_cartoon_name , function(error , nows_cartoons_hwas){
            if(nows_cartoons_hwas.length == 1){
              subcartoons_html += "<p><h1><a>아직 아무것도 없나보네요</a></h1></p>";
            }
            nows_cartoons_hwas.forEach(nows_cartoons_hwa => {
              if(nows_cartoons_hwa != "thumb.png" && nows_cartoons_hwas.length != 1){
                if(isNamePrinted) {
                  console.log("cartoon_name : " , nows_cartoon_name);
                  isNamePrinted = false;
                }
                console.log("nows_cartoons_hwa : " , nows_cartoons_hwa);
      
                subcartoons_html += `<p><h1><a href="/`;
                subcartoons_html += rS.rS(nows_cartoon_name);
                subcartoons_html += "/";
                subcartoons_html += nows_cartoons_hwa;
                subcartoons_html += `/main">`;
                subcartoons_html += nows_cartoons_hwa;
                subcartoons_html += "화</a></h1></p>\n\n";
        
                // web/만화이름/화/main
                // <p><h1><a href="web/만화이름/화/main">{화}화</a></h1></p>
      
                let cartoon_page_html = `
                <html>
                <head>
                <style>
                img , video {
                  margin: 5%;
                  margin-top:1%;
                  width: 90%;
                  border: 2px black solid;
                }
      
                body{ background-color:#0075C9 }
                </style>
                </head>
                <body>
      
                `
                
                files = fs.readdirSync(__dirname + "/../cartoons/" + nows_cartoon_name + "/" + nows_cartoons_hwa)
      
      
                files.sort((a , b) => {
                  let aa = Number(rS.rS(a).split(".")[0]);
                  let bb = Number(rS.rS(b).split(".")[0]);
      
                  return aa > bb ? 1 : aa == bb ? 0 : -1;
                })
                   
                files.forEach(haw_file => {
                if(path.extname(haw_file) == ".mp4"){
                  //영상
                  cartoon_page_html += `
                  <video controls loop preload="auto">
                    <source src="/`;
                  cartoon_page_html += rS.rS(nows_cartoon_name);
                  cartoon_page_html += "/";
                  cartoon_page_html += nows_cartoons_hwa;
                  cartoon_page_html += `/`;
                  cartoon_page_html += haw_file;
                  cartoon_page_html += `">
                  </video><p></p>
                  `;
                }else{
                  //나머지
                  cartoon_page_html += `<img src="/`;
                  cartoon_page_html += rS.rS(nows_cartoon_name);
                  cartoon_page_html += "/";
                  cartoon_page_html += nows_cartoons_hwa;
                  cartoon_page_html += `/`;
                  cartoon_page_html += haw_file;
                  cartoon_page_html += `" /><p></p>`;
                }
                });
      
                cartoon_page_html += "</body></html>";
      
                app.get("/" +  encodeURI(rS.rS(nows_cartoon_name)) + "/" + nows_cartoons_hwa + "/main", function(req , res){
                  res.send(cartoon_page_html);
                }) 
              };
            });
      
            subcartoons_html += "</body></html>"
      
            console.log("\n");
          })
      
          app.get('/' + encodeURI(rS.rS(nows_cartoon_name)) + "/sub" , function(req , res){
            res.send(subcartoons_html);
          });
        });
    })
}