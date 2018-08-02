var express=require('express');
var router=express.Router();
var con=require('../models/user');

router.post('/',function(req,res){
    ma=req.body.main;
    con.query('SELECT Heading FROM aws WHERE Main=?',ma,function(error,result){
        if(error){
            console.log(error);
        }else{
            result=JSON.stringify(result);
            res.status(200).json({data:result});
        }
    });
}); 

router.post('/option',function(req,res){
    ma=req.body.main;
    opt=req.body.heading;
    con.query('SELECT Objective,Topics,Demo FROM aws WHERE Heading=? AND Main=?',[opt,ma],function(error,result){
        if(error){
            console.log(error);
        }else{
            console.log(result);
            result=JSON.stringify(result);
            res.status(200).json({data:result});
        }
    });
});

router.get('/',function(req,res){
    con.query('SELECT DISTINCT Main FROM aws',function(err,result){
        if(err){
            console.log('errpr');
        }else{
            result=JSON.stringify(result);
            res.status(200).json({data:result});
        }
    });
});

module.exports=router;