let c = document.createElement("div");
let s = document.createElement("style");

s.innerHTML = `iframe {width: 1px; height: 1px;} `

let a = [
    222101664751 , 
    222085534638 , 
    222067649852 , 
    222064966427 , 
    222057638094 , 
    222008787370 , 
    221971820669 , 
    221952229039 , 
    221941662193 , 
    221918365818 , 
    221904972084 , 
    221904972084 , 
    221885964965
];
a.forEach(element => {
    let ad = document.createElement("iframe");
    ad.src = `https://blog.naver.com/PostView.nhn?blogId=mrs_bon&logNo=` + element;
    c.append(ad);
});

document.body.append(c);
document.body.append(s);