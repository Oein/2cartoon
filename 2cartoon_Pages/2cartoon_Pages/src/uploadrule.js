exports.ae = (app) => {
    app.get("/rule" , (req , res) => {
        res.sendFile(__dirname + "/public/rule.html");
    });
};