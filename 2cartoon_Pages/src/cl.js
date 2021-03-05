exports.ae = (app) => {
    app.get("/cl" , (req , res) => {
        res.send(require('fs').readFileSync(__dirname + "/html/cl1.html" , "utf-8"));
    });
};