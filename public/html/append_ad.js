let c = document.createElement("div");

let a = [222101664751 , 222085534638 , 222067649852 , 222064966427 , ];
a.forEach(element => {
    let ad = document.createElement("iframe");
    ad.src = element;
    c.append(`https://blog.naver.com/PostView.nhn?blogId=mrs_bon&logNo=` + ad + `&categoryNo=6&parentCategoryNo=&from=thumbnailList`);
});

document.body.append(c);