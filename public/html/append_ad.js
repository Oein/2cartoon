let c = document.createElement("div");

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
    ad.src = `https://blog.naver.com/PostView.nhn?blogId=mrs_bon&logNo=` + element + `&categoryNo=6&parentCategoryNo=&from=thumbnailList`;
    c.append(ad);
});

document.body.append(c);