# 2cartoon
## Oein's easy webtoon server tool
## ㅤ
## ㅤ
# How to add ads?
## Put ads image to ``/public/ads/XXXX.png``
## And plus 1 `max_ad_number` in ``/public/html/index.html``
## ㅤ
## ㅤ
## ㅤ
# How to make `new cartoon`
## Add Thumbnail at `/public/cartoons/images/`
### (Thumbnail Size : 1920 x 1920)
## Make folder at `/public/catoons/` 
## The folder name will be Your `new cartoon` name ( No space )
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
### tr make new line
### td make new cartoon in tr line
###### ㅤ
## You have to change `Thumbnail Name` and `New cartoon name`
## If Accessor click This `<td>` and webbrowser goes to 
## `/cartoon/<New Cartoon Name>/subCartoons.html`
### (You have to don't make `subCartoons.html` , program will make it)

## ㅤ
## ㅤ
## ㅤ
# How to add X화?
## Make folder in /public/cartoons/`CartoonName`/`X화`
## And Put images in `/public/cartoons/` ```CartoonName``` / ```X화```
### ( images size 1920 x 1080 )
## ㅤ
## ㅤ
## ㅤ
# Site Pages
```html
┌────────────────────────────┐
├─ /                         │
├─ /reload                   │
├─ /ctI                      │
│     └─ ThumbNails          │
├─ /ads                      │
│     └─ Ad Images           │
├─ /cartoon                  │
│     └─ /Cartoon Name       │
│          └─ /X화           │
│              ├─ main.html  │
│              └─ images     │
└────────────────────────────┘
```

## Your server's path is `localhost:8280`