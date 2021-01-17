let express = require("express");
let app = express();
let main = require("./mainPage");
let view = require("./cartoonViewer");
let rule = require("./uploadrule");

view.ae(app);
main.ae(app);
rule.ae(app);

app.listen(8280);