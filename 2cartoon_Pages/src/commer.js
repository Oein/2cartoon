exports.ae = (app) => {
    app.use(function(req , res , next){
        if(req.originalUrl.indexOf(".png") == -1 && req.originalUrl.indexOf(".mp4") == -1){
            console.log(req.ip.replace("::ffff:" , "") + " requests a data  " + decodeURI(req.originalUrl));
        }
        next();
    });
};