exports.rS = (data) => {                     // 이 모듈.rS(data)를 입력하면 아래 소스를 실행
  for(let i = 0;i < 100000;i++){             // 100000번 반복
    data = data.replace(" " , "");           // data에서 첫번째로 검색된 ' ' 을 '' 로 바꿈
  }

  return data;                               // ' '들을 ''로 바꾼 data를 전송
};