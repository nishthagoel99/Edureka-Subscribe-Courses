var con=require('../models/user');
var checkAuth=require('../middleware/checkauth');
var express=require('express');
var router=express.Router();
var ejs=require('ejs');
var bcrypt=require('bcrypt');
var jwt=require('jsonwebtoken');

router.post('/',function(req,res){
    
    var email=req.body.email;
    if(req.body.token){
        password=jwt.decode(req.body.token).sub;
        console.log(password);
    }else{
    password=req.body.password;
    }
    con.query('SELECT * FROM login WHERE Email=?',email,function(error,result){
        if(error){
            res.status(404).json({message:'error3'});
        }else{
            console.log('he');
            if(result.length>0){
                bcrypt.compare(password,result[0].HashedPass,function(err,result1){
                    if(err){
                        res.status(404).json({message:'error2'});
                    }else{
                        if(result1){
                            if(result[0].UserID==114){
                                jwt.sign({
                                    name:result[0].Name,
                                    email:result[0].Email,
                                    id:result[0].UserID
                                },process.env.JWT_ADMINKEY,
 
                                function(err,token){
                                    if(err){
                                        res.status(404).json({message:'error in token creation'});
                                    }else{
                                           
                                        res.status(200).json({message:'Auth Successful: Success admin login',name:result[0].Name,token:token,admin:true});
                                    }
                                });
                            }else{
                                jwt.sign({
                                    name:result[0].Name,
                                    email:result[0].Email,
                                    id:result[0].UserID
                                },process.env.JWT_USERKEY,{expiresIn:'5h'},function(err,token){
                                    if(err){
                                        res.status(404).json({message:'error in token creation'});
                                    }else{       
                                        res.status(200).json({message:'',name:result[0].Name,token:token,admin:false});
                                    }
                                });
                            }  
                        }else{
                            console.log('wrong');
                            res.status(200).json({message:'Wrong Credentials!',name:null,token:'null',admin:false});
                        }
                    }
                });
            }else{
                res.status(200).json({message:'Sign up first!',token:'null',name:null,admin:false});
            }
        }
    });
});

router.get('/display',checkAuth,function(req,res){
    console.log('inside display');
           con.query('SELECT Email,Password FROM login',function(error,rows,fields){
            if(error) {
                res.status(200).json({message:'error in displyyyyyyyyyyyyy'});
            }
            else{
               var data=JSON.stringify(rows);
            
              // console.log(data);
              res.status(200).json({data:data});
               // res.render(__dirname+'/views/datasc.html',{data:rows});
            }
           
        });
    }); 

    router.post('/signup',function(req,res){
        name=req.body.name;
        var email=req.body.email;
        if(req.body.token!=null){
            pass1=jwt.decode(req.body.token).sub;
            pass2=pass1;
            console.log(pass2);
        }else{
        pass1=req.body.pass1;
        pass2=req.body.pass2;
        }
        con.query('SELECT  * FROM login WHERE Email=?',email,function(err,result){
            if(err){
                console.log('errorin signup');
            }else{
                if(result.length>0){
                    res.status(200).json({message:'User with the provided Email ID exists already!'});
                }else{
                    bcrypt.hash(pass1,10,function(Eror,result3){
                        if(Eror) console.log('eror in hashing');
                        else{
                            bcrypt.compare(pass2,result3,function(errr,result4){
                                if(errr)
                                console.log('error in comparing');
                                else{
                                    if(result4){
                                        console.log('password matches');
                                       
                                        var user={  
                                            UserID:null,
                                            Name:name,
                                            Email:email,
                                            Password:pass1,
                                            HashedPass:result3
                                        }
                                        console.log(user);
                                        con.query('INSERT INTO login SET?',user,function(err,result1){
                                            console.log(result1);
                                            if(err) throw err;
                                            else{
                                                res.status(200).json({message:'',name:user.Name,done:1,admin:false})
                                            }
                                        });
                                    }else{
                                        res.status(200).json({message:"Password don\'t match"});
                                    }
                                }
                            });
                        }
                    });
               
                }
            }
        });
    });

router.post('/check',function(req,res){
    email=req.body.email;
    console.log('here');
    con.query('SELECT  * FROM login WHERE Email=?',email,function(err,result){
        if(err){
            console.log('errorin signup');
        }else{
            if(result.length>0){
                res.status(200).json({message:'User with the provided Email ID exists already!',done:1});
            }else{
                res.status(200).json({message:'done',done:0});
            }
        }
});
    });

router.post('/change',function(req,res){
email=req.body.email;
pass1=req.body.pass1;
pass2=req.body.pass2;
bcrypt.hash(pass1,10,function(err,hash){
    bcrypt.compare(pass2,hash,function(err,result){
        if(result){
           con.query('UPDATE login SET Password=? WHERE Email=?',[pass1,email],function(err,resu){
               if(err) throw err;
               else{
                   con.query('UPDATE login SET HashedPass=? WHERE Email=?',[hash,email],function(erro,reultt){
                       if(erro) throw erro;
                       else{
                           res.status(200).json({message:'success',done:1})
                       }
                   });
               }
           });
            
        }else{
            res.status(200).json({message:'Passwords dont match',done:0})
        }
    });
});
});

module.exports=router;