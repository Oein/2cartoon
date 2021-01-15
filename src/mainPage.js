let path = require('path');
let fs = require('fs');
let rS = require("./rS");

exports.ae = (app) => {
    let root_dir = fs.readdirSync(__dirname + "/../cartoons");
    let html = `
    <html>
    <head>
    <style>
    img {
    width : 100%;
    border-radius : 10px;
    }

    div[class="name"]{
    text-align: center;
    width : 100%
    }

    * { font-size: large; }
    a { text-decoration:none; color: #EEEDED; }
    body{ background-color:#0075C9 }
    </style>
    </head>
    <body>
    <table>
    <tr>
    `;

    for(let i = 0;i < root_dir.length - 1;i++){
    if(i % 3 == 0) html += `</tr><tr>`;
    html += "<td>";
    html += `<div class="cartoon"><a href="/`;
    html += rS.rS(root_dir[i]);
    html += `/sub">`;
    html += `<img src="/`;
    html += rS.rS(root_dir[i]);
    html += `/thumb.png"><div class="name">`;
    html += root_dir[i];
    html += `</div></a></div></td>`;
    }

    html += "</tr></table></body></html>";

    app.get("/" , (req , res) => {
    res.send(html);
    });
}