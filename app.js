const express = require('express')

const port = 8001;

const app = express();

// const db = require ("./config/db")

const mongoose = require('mongoose');


mongoose.connect('mongodb+srv://tankkhushal001:jqduBeW23anGBvrl@cluster0.qkwdt.mongodb.net/school-Mgmt').then((res) => {
    console.log('db is connected');
})
.catch((err) =>{
    console.log('db is not connected');
})

const passport = require("passport");
const jwtPassport = require("./config/passport-jwt");
const session = require("express-session");

app.use(session({
    name: "jignesh",
    secret: "jwtToken",
    resave: false,
    saveUninitialized: false,
    cookie: {
        MaxAge: 1000 * 60 * 60
    }
}));

app.use(passport.initialize());
app.use(passport.session());


app.use(express.urlencoded());

app.use ('/api' ,require("./router/api/V1/adminrout")) 

app.listen(port , (err)=>{
    if(err)
    {
        console.log(err)
         return false
    }
    
    console.log("server is rinning" +port)
}
)