const express = require("express");
const app = express();
const mongoose = require("mongoose");
var fs = require("fs")
const https=require('https')

const key=fs.readFileSync('private.key')
const cert=fs.readFileSync('certificate.crt')

const cred={
  key,cert
}


const port = process.env.PORT || 8000;
const dotenv = require("dotenv");
dotenv.config();

// const PORT = process.env.PORT;

const cors = require("cors")
app.use(cors());





app.get('/.well-known/pki-validation/6DC00CA3308709EF2CD4A8C253400731.txt',(req,res)=>{
  res.sendFile(__dirname + `/6DC00CA3308709EF2CD4A8C253400731.txt`);

})


app.get('/about', function (req, res){
        res.render('dataFrom.html');
});



require('./allFiles/Allfun')

//Connection is achieved
require('./db/conn')

//to understand json file
app.use(express.json());

//We connect to the router to free the space in app js
var authRouter=require('./router/passport/oauth')
// var requestRoute=require('./router/auth')
app.use('/oauth',authRouter)
app.use(require('./router/auth'))
app.use('/aws',require('./router/aws'))
// app.use(require('./router/auth'))
app.use(require('./router/product'))
app.use(require('./router/cart'))
app.use(require('./router/order'))
app.use(require('./router/payment'))

app.use('/api',require('./router/review'))
// require('./router/auth')



app.get("/contact", (req, res) => {
  res.send("hello contact");
});
app.get("*", (req, res) => {
  res.status(404).send("hello hahaha ur wrong");
});

app.listen(port, () => {
  console.log(`server is running on port no ${port}`);
});


const httpsServer=https.createServer(cred,app)
httpsServer.listen(443)