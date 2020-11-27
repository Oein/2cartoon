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
## like this
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