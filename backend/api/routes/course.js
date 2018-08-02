var con=require('../models/user');
var express=require('express');
var router=express.Router();

//showing the courses from database
router.get('/',function(req,res){
    con.query('SELECT * FROM edureka',function(err,result,field){
        if(err){
            console.log('error in selecting');
            res.status(404).json({message:'error in selecting'});
        }else{
            console.log('showing courses');
            data=JSON.stringify(result);
            res.status(200).json({data:data});
        }
    });
});


//Creating a new course
router.post('/',function(req,res){
  var  CourseTitle=req.body.CourseTitle;
    con.query('SELECT * FROM edureka WHERE CourseTitle=?',CourseTitle,function(er,resu){
        console.log(resu.length);
        if(er){
            console.log('error 1');
        }else if(resu.length==0){
            console.log(course);
            var course={
                Id:null,
                CourseTitle:req.body.CourseTitle,
                CourseRating:req.body.CourseRating,
                CourseValue:req.body.CourseValue,
                CourseImage:req.body.CourseImage,
                CourseVideo:req.body.CourseVideo
                }
            con.query('INSERT INTO edureka SET?',course,function(err,result){
                if(err){
                    console.log(err);
                }else{
                    res.status(200).json({message:'inserted'});
                }
            });
        }else{
            res.status(200).json({message:'course exists'});
        }
    });
   
});

module.exports=router;