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
## Add Thumbnail at `/public/cartoons/images/`
### (Thumbnail Size : 1920 x 1920)
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
        ...
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
        New : <tr>
        New :     <td>
        New :         <div class="cart">
        New :             <a class="name" >
        New :                 <img src="/ctI/Thumbnail Name" />
        New :                 New cartoon name
        New :             </a>
        New :         </div>
        New :     </td>
        New : </tr>
    </table>
    

    <script>
        ...
    </script>
</body>
</html>
```
## You have to change `Thumbnail Name` and `New cartoon name`
## If Accessor click This `<td>` and webbrowser goes to `/cartoon/New Cartoon Name/subCartoons.html`
### (You have to don't make `subCartoons.html` , program will make it)

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