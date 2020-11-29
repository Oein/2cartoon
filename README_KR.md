# 2cartoon
## `Oein` 의 만화 서버 생성기
## ㅤ
## ㅤ
# 광고를 넣는법
## 광고 사진을 ``/public/ads`` 에 ``숫자.png`` 로넣고
## ``/public/html/index.html``에 있는 `max_ad_number` 를 1 늘린다
## ㅤ
## ㅤ
## ㅤ
# 새로운 만화를 만드는법
## 썸네일을 `/public/cartoons/images/` 에 넣으세요
### (썸네일 크기 : 1920 x 1920)
## 폴더를 `/public/catoons/` 에 만드세요
## 폴더의 이름은 ``새로운 만화`` 의 이름입니다 ( 띄어쓰기X )
## 그다음 `/public/html/index.html` 파일을 편집하세요
## `아래 처럼 ↓`
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
        새로운  : <tr>
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