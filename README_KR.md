# 2cartoon
## `Oein` 의 만화 서버 생성기
## ㅤ
## ㅤ
# 서버를 키는법
## [여기](https://nodejs.org/dist/v14.15.1/node-v14.15.1-x64.msi) 에서 다운 받은 파일을 생행 시킨후 설치
## 그다음 cmd.exe 로 다운받은 폴더 까지 이동한 후 ```node index.js``` 입력
##
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
## 폴더의 이름은 ``새로운 만화`` 의 이름입니다 ( ⚠ 띄어쓰기X )
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
        새로운 줄 : <tr>
        새로운 줄 :     <td>
        새로운 줄 :         <div class="cart">
        새로운 줄 :             <a class="name" >
        새로운 줄 :                 <img src="/ctI/Thumbnail Name" />
        새로운 줄 :                 New cartoon name
        새로운 줄 :             </a>
        새로운 줄 :         </div>
        새로운 줄 :     </td>
        새로운 줄 : </tr>
    </table>
    

    <script>
        ...
    </script>
</body>
</html>
```
### tr 은 엔터의 효과를 냅니다
### td 는 tr에 새로운 만화열결버튼을 만들떄 씁니다.
###### ㅤ
## `Thumbnail Name` 과 `New cartoon name` 를 바꿔야 합니다.
## 방문자가 `<td>`를 클릭하면 아래의 페이지로 이동합니다.
## `/cartoon/<New Cartoon Name>/subCartoons.html`
### ( subCartoons.html을 만들지 마세요 )

## ㅤ
## ㅤ
## ㅤ
# X화를 만드는법
## 폴더를 여기에 만들고`/public/cartoons/CartoonName`
## 폴더의 이름을 X화로 정합니다.
## 그다음 컷들을 `/public/cartoons/` ```CartoonName``` / ```X화``` 에 넣습니다
### ( ⚠ 컷들의 이름은 숫자.png 입니다 )
### ( 컷들의 사이즈 : 1920 x 1080 )
## ㅤ
## ㅤ
## ㅤ
# 사이트의 페이지 구성
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
### 아무 작업 없이 다운받고 만화를 생성한뒤 서버를 키면 서버의 주소는 `localhost:8280` 입니다!
### 다른 컴퓨터에서 접속 못함 ( 포트포워딩 같은거 안핬을 때는 )