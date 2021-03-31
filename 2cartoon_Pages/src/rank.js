exports.ae = (app) => {
    app.get("/rank" , (req , res) => {
        res.send(require('fs').readFileSync(__dirname + "/html/rank1.html" , "utf-8"));
    });
};