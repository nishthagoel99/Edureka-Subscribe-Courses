var express=require('express');
var router=express.Router();

var Mailjet = require ('node-mailjet')
    .connect(process.env.MJ_APIKEY_PUBLIC, process.env.MJ_APIKEY_PRIVATE)

router.post('/',function(req,res){
    console.log('here');
    otp=req.body.otp;
    email=req.body.email;
    var sendEmail = Mailjet.post('send');

var emailData = {
    'FromEmail': 'hey@nish.gq',
    'FromName': 'Nishtha :)',
    'Subject': 'OTP FROM Nishthaaaaa!',
    'Text-part': 'Hi!!, YOUR OTP IS: '+otp,
    'Recipients': [{'Email': email}],
}

sendEmail
  .request(emailData)
    .then(res.status(200).json({message:'successs',emailData}))
    .catch(console.log('error'));
});


module.exports=router;