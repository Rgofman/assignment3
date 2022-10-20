const express = require("express");
const app = express();
const path = require('path');
const handlebars = require("express-handlebars");
const bodyParser = require("body-parser")
const multer = require("multer");

app.engine(".hbs", handlebars.engine({ extname: '.hbs' }));
app.set("view engine", ".hbs");
app.use(express.static("./"));
app.use(bodyParser.urlencoded({ extended: false }));

let multer_obj = multer.diskStorage({
    destination: './views'
});


app.get("/", function (req, res) {
    res.render("blog", { layout: "main2" });
});

app.get("/login", function (req, res) {
    res.render("login", { layout: "main" });
});

app.get("/dashboard", function (req, res) {
    res.render("dashboard", { layout: "main2" });
});

app.post("/login", function (req, res) {
    var data = {
        userInfo: {
            username: req.body.username,
            password: req.body.password
        },
        errorMsg: {
            username: "",
            password: ""
        }
    };
    if (!data.userInfo.username) {
        data.errorMsg.username = "The username is required";
    }
    if (/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(data.userInfo.username)) {
        data.errorMsg.username = "Cant have special characters";
    }
    if (!data.userInfo.password) {
        data.errorMsg.password = "The password is required";
    }
    res.render("login", { data: data, layout: "main" });
});


app.get("/registration", function (req, res) {
    res.render("registration", { layout: "main" });
});

app.post("/read_more", function (req, res) {
    res.render("read_more", { layout: "main" });
})

app.post("/registration", function (req, res) {
    var data = {
        userInfo: {
            name: req.body.name,
            lname: req.body.lname,
            password: req.body.password,
            comfPassword: req.body.comfPassword,
            phone: req.body.password,
            email: req.body.email
        },
        errorMsg: {
            name: "",
            lname: "",
            password: "",
            comfPassword: "",
            email: "",
            phone: "",
            yn: ""
        }
    };

    if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(data.userInfo.email))) {
        data.errorMsg.email = "Must be valid"
        data.errorMsg.yn = 1;
    }



    if ((/^\d+$/.test(data.userInfo.phone))) {
        data.errorMsg.phone = "Numbers only"
        data.errorMsg.yn = 1;
    }
    if (data.userInfo.phone <= 999999999 || data.userInfo.phone >= 10000000000) {
        data.errorMsg.phone = "Must be valid number"
        data.errorMsg.yn = 1;
    }

    if (!data.userInfo.name) {
        data.errorMsg.name = "Required";
        data.errorMsg.yn = 1;
    }
    if (!data.userInfo.lname) {
        data.errorMsg.lname = "Required";
        data.errorMsg.yn = 1;
    }

    if (!data.userInfo.password) {
        data.errorMsg.password = "Password is required";
        data.errorMsg.yn = 1;
    }

    else if (data.userInfo.password.length < 6 || data.userInfo.password.length > 12) {
        data.errorMsg.password = "6-12 characters";
        data.errorMsg.yn = 1;
    }

    else if (!(/\d/.test(data.userInfo.password))) {
        data.errorMsg.password = "Must have 1 number";
        data.errorMsg.yn = 1;
    }

    else if (!(/[a-z]/i.test(data.userInfo.password))) {
        data.errorMsg.password = "Must have 1 letter";
        data.errorMsg.yn = 1;
    }

    if (data.userInfo.password != data.userInfo.comfPassword) {
        data.errorMsg.comfPassword = "Passwords don't match";
        data.errorMsg.yn = 1;
    }
    if (data.errorMsg.yn != 1) {
        res.render("dashboard", { layout: "main2" });
    }

    else {
        res.render("registration", { data: data, layout: "main" });
    }

});


var port = process.env.PORT || 8080;
app.listen(port);
