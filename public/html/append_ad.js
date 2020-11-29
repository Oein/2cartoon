<iframe src="https://blog.naver.com/PostView.nhn?blogId=mrs_bon&logNo=" />
<iframe src="https://blog.naver.com/PostView.nhn?blogId=mrs_bon&logNo=222085534638&categoryNo=6&parentCategoryNo=&from=thumbnailList" />
<iframe src="https://blog.naver.com/PostView.nhn?blogId=mrs_bon&logNo=222067649852&categoryNo=6&parentCategoryNo=&from=thumbnailList" />

let c = document.createElement("div");

let a = [222101664751 , ];
a.forEach(element => {
    let ad = document.createElement("iframe");
    ad.src = element;
    c.append(`https://blog.naver.com/PostView.nhn?blogId=mrs_bon&logNo=` + ad + `&categoryNo=6&parentCategoryNo=&from=thumbnailList`);
});