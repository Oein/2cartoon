let express = require("express");
let app = express();
let cv = require("./cartoonViewer");
let mv = require("./mainPage");

cv.ae(app);
mv.ae(app);

app.listen(8280);