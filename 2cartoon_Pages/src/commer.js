exports.ae = (app) => {
    app.use(function(req , res , next){
        console.log(req.ip.replace("::ffff:" , "") + " requests a data");
        next();
    });
};