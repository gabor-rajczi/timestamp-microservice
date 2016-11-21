var express = require("express");
var app = express();

app.set("view engine", "pug");
app.set("views", __dirname +"/views");
app.get("/", usage);
app.get("*", result);

app.listen(8080, running);

function running(){
    console.log("Timestamp Microservice App is running on port 8080!");
}

function usage(req, res){
    res.render('index', { protocol: req.protocol, url: req.hostname });
}

function result(req, res){
    var param = decodeURI(req.path.substring(1));
    var date;
    var dateOption = {year:"numeric", month:"long", day: "numeric"};
    
    if (/^\d+$/g.test(param)){
        date = new Date(Number(param)*1000);
    }
    else {
        date = new Date(param);
    }
    var natural = date.toLocaleDateString("en-US", dateOption);
    var result = {unix: date.getTime()
        , natural: natural === "Invalid Date" ? null : natural
    };
    res.send(result);
}

