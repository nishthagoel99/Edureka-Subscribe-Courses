var jwt=require('jsonwebtoken');
console.log('came in checkauth');
module.exports= function(req,res,next){
    console.log('c');
   // const token=localStorage.getItem('token');
    //console.log(token);
  // const token=req.body.token;
  
    if (!req.headers.authorization) res.send(400, 'missing authorization header');
    else{
        var token=req.headers.authorization.split(" ")[1];
        jwt.verify(token,process.env.JWT_ADMINKEY,function(error,result){
            if(error) {
                console.log('auth unsucesssds');
                res.status(200).json({message:'authskkajs '});
                //next();
            }
            else{
                console.log('auth success');
               // res.status(200).json({message:'auth sucessful',token:result});
                next();
            }
        });
    }
  /*
    j
    */
};