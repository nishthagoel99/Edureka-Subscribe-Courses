var mysql=require('mysql');

var con=mysql.createConnection({
    host:'localhost',
    password:'',
    database:'courses',
    user:'root'
});

con.connect(function(err,result){
    if(err){
        console.log('error');
    }else{
        console.log('Connected!');
    }
});

module.exports=con;