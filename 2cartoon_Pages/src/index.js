let express = require("express");
let app = express();
let mv = require("./mainPage");
let cv = require("./cartoonViewer");

cv.ae(app);
mv.ae(app);

app.listen(8280);