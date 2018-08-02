var express=require('express');
var bodyParser=require('body-parser');
var app=express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

var awsRoute=require('./api/routes/aws');
var courseRoute=require('./api/routes/course');
var loginRoute=require('./api/routes/login');
var emailRoutes=require('./api/routes/email');
var enrollRoutes=require('./api/routes/enroll');
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, authorization');
    next();
});

app.use('/email',emailRoutes);
app.use('/login',loginRoute);
app.use('/course',courseRoute);
app.use('/enroll',enrollRoutes);
app.use('/aws',awsRoute);


module.exports=app;