exports.ae = (app) => {
    app.use(function(req , res , next){
        console.log(req.ip.replace("::ffff:" , "") + " Comes to this server");
        next();
    });
};