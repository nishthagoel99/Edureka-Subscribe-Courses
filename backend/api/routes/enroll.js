var express=require('express');
var router=express.Router();
var con=require('../models/user');
var jwt=require('jsonwebtoken');


//enrolling the clicked course.
router.post('/' ,function(req,res){
var token=req.headers.authorization.split(' ')[1];
var decoded=jwt.decode(token);
console.log(decoded);
idz=decoded.id;
console.log(idz);
var course=req.body.CourseTitle;
console.log(course);

con.query('SELECT Id FROM edureka WHERE CourseTitle=?',course,function(error,result,field){
if(error){
    console.log(result);
    console.log('error in id');
}else{
    id= result[0].Id;
    console.log(id);
    newuser={
        UserID:idz,
        CourseID:id
    }
    console.log(newuser);
            con.query('SELECT * FROM enrolled WHERE UserID=? AND CourseID=?',[idz,id],function(Err,countt){
                console.log(countt.length);
                if(countt.length>0){
                    res.status(200).json({message:'exists'})
                }else{
                    con.query('INSERT INTO enrolled SET?',newuser,function(err,result3){
                        if(err){
                            res.status(404).json('hi errorrr');
                            console.log(err);
                        }else{
                            console.log('success');
                            res.status(200).json({message:'success'});
                        }
                    });
                }
            });
        }
    });
        });

//show the subscribed courses
router.get('/show',function(req,res){
    var token=req.headers.authorization.split(' ')[1];
    var decoded=jwt.decode(token);
    id=decoded.id;
  
     x=[];
    con.query('SELECT DISTINCT CourseID FROM enrolled WHERE UserID=?',id,function(error,result){
        if(error){
            res.status(404).json('hi errorrr');
            console.log(error);
        }else{
           result.forEach(function(element){
            con.query('SELECT * FROM edureka WHERE Id=?',element.CourseID,function(Errr,result2,field){
                if(Errr){
                    res.status(404).json('hi dkserrorrr');
            console.log(Errr);
                }else{
                       x.push(result2[0]);
                     } 
                     if(x.length===result.length){
                         data=JSON.stringify(x);
                        res.status(200).json({data:data});
                    }
                    });
                  
                 });   
            }
    });
});

//if the user logs in after clicking the enroll button, check if that particular course was enrolled by the user earlier or not
router.post('/co',function(req,res){
    var token=req.headers.authorization.split(' ')[1];
    var decoded=jwt.decode(token);
    if((decoded=='null')||(decoded==null)){
        res.json({message:'no header'});
    }else{
        
        idu=decoded.id;
        
    var course=req.body.CourseTitle;
    con.query('SELECT Id FROM edureka WHERE CourseTitle= ?',course,function(eror,result,field){
        if(eror){
        throw eror;
        }
        else{
            id=result[0].Id;
            con.query('SELECT * FROM enrolled WHERE UserID=? AND CourseID=? ',[idu,id],function(erro,row,field){
                if(erro)
                console.log('erorrr');
                else{
                    console.log(row[0]);
                    if(row.length=='0'){
                        console.log('notdone');
                        res.status(200).json({message:'notdone'});
                    }else{
                        console.log('done');
                        res.status(200).json({message:'done'});
                    }
                }
            });

        }
    });
   
    }
    
});

module.exports=router;