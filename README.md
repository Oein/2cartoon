# 2cartoon
## ㅤ
## ㅤ
# How to add ads?
## Put ads image to ``/public/ads/XXXX.png``
## And edit `max_ad_number` in ``/public/html/index.html``
## ㅤ
## ㅤ
## ㅤ
# How to make `new cartoon`

## Make folder at `/public/catoons/` 
## The folder name will be Your `new cartoon` name
## And change `/public/html/index.html`
## `like this ↓`
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>2cartoon 매인 페이지</title>

    <style>
        div[class="cart"] {
            background-color: rgba(184, 184, 184, 0.479);
            width: 40%;
            height: 40%;
            padding: 0.5%;
            padding-right: 3%;
            padding-left: 0;
            border-radius: 5px;
            overflow: hidden ;
            align-items: center;
            text-align: center;
        }

        tr {
            align-items: center;
            margin-top: 5%;
        }

        td {
            margin-right: 0%;
        }

        img {
            width: 98%;
            height: 98%;
            border-radius: 5px;
            overflow: visible ;
            padding: 0%;
            padding-right: 4%;
        }

        a{
            padding-left: 5%;
            padding-bottom: 49%;
            text-decoration: white;
        }

        div[class="up"] {
            text-align: center;
            width: 100%;
            height: 3%;
            background-color: rgba(121, 121, 121, 0.658);
            color: white;
            padding-top: 1%;
            padding-bottom: 1%;
        }

        h21 {
            font-size: 3.5em;
            font-weight: bold;
            color: blanchedalmond;
        }

        img[id="ad"]{
            width: 90%;
            margin-left: 4.5%;
            border: 0.4em inset #009688;
        }
    </style>
</head>
<body onload="init()">
    <div class="up">
        <a href="/">
            <h21>
                2Cartoon
            </h21>
        </a>
    </div>
    <table>
        <tr>
            <img id="ad" src="" />
        </tr>
        <tr>
            <td>
                <div class="cart">
                    <a class="name" >
                        <img src="/ctI/Thumbnail Name" />
                        New cartoon name
                    </a>
                </div>
            </td>
        </tr>
    </table>
    

    <script>
        function init(){
            let names = document.getElementsByClassName("name");

            for(let i = 0;i < names.length;i++){
                names[i].href="/cartoon/" + names[i].innerText.replaceAll(" ","") + "/subCartoons.html";
            }

            let ad = document.getElementById("ad");
            let max_ad_number = 3;
            ad.src = "/ads/" + Math.round(Math.random() * (max_ad_number - 1) + 1) + ".png";
        }
    </script>
</body>
</html>
```
## ㅤ
## ㅤ
## ㅤ
# How to add X화?
## Make folder in /public/cartoons/`CartoonName`/`X화`
## And Put images in `/public/cartoons/` ```CartoonName``` / ```X화```
## If you finished to put images in that folder
## Make this file at `/public/cartoons/` ```CartoonName``` / `main.html`

## `main.html ↓`
```html
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>1화</title>

    <style>
        img {
            margin-left: 10%;
            width: 80%;
            height: auto;
            margin-bottom: 50px;
            border: 0.4em inset #009688;
        }
    </style>
</head>
<body>
    <script>
        for(let i = 1;i <= Images_Count;i++){
            let img = document.createElement("img");
            img.src = "/cartoon/CartoonName/1화/" + i + ".png";
            document.body.append(img);
        }
    </script>
</body>
</html>
```
## You have to change `Images_Count` and `CartoonName`
## ㅤ
## ㅤ
## ㅤ