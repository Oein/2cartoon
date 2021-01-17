exports.rS = (data) => {
  for(let i = 0;i < 100000;i++){
    data = data.replace(" " , "");
  }

  return data;
};