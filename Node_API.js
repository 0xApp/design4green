
var _expressPackage=require("express");
var _bodparserpackage=require("body-parser");

var app=_expressPackage();

app.use(_bodparserpackage.json());

app.use(function (req,res,next)
{
res.header("Access-Control-Allow-Origin","*");
res.header("Access-Control-Allow-Mathods", "GET,HEAD,OPTIONS,POST,PUT");
res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, contentType,Content-Type, Accept,Authorization");
next();
}
);

//Setup local server 

var Server =app.listen(process.env.PORT || 4000 , function () {
var port=server.address().port;
console.log("App now running on port", port);

}
);

//setup sql connection string DB connection
var sev= "" 
//server name 
var dbConfig = {
server: sev,
user:"",
password:"",
database: "",
options:{encrypt:true}
}


var QueryToExecuteInDatabase= function (response,strQuery){
var _sqlPackage=require("mssql");
_sqlPackage.connect(dbConfig, function(error){
if (error) console.log(error);
var request=new _sqlPackage.Request();
request.query(strQuery, function(error,recordset)
{
if(error) console.log(error);
console.log(recordset);
response.send(recordset);
});

});

}

app.get("/Dept", function(_req,_res){
console.log("Executing Get");
var sqlquery="exec get_departments user1";
QueryToExecuteInDatabase(_res,sqlquery);
console.log(_res); //shows result in chrome console log
});

app.get("/Dept/:id", function(_req,_res){
console.log("Executing Get");
var sqlquery="exec get_departments "+id+",123";
QueryToExecuteInDatabase(_res,sqlquery);
console.log(_res); //shows result in chrome console log
});


//post
app.post('/api/create',(req,res)=>{
var query ="insert into user (name) values (req.body.Name)";
QueryToExecuteInDatabase(_res,query);
res.send('Post request to home example');
});

//PUT
app.put('/api/user',(req,res){
var query ="update usertable set name='"+req.body.Name+"'where id="+req.body.s_id;
QueryToExecuteInDatabase(_res,query);
res.send(res.json(req.body));
});

//Delete
app.put('/api/user/:id',(req,res){
var query ="Delete from user where id="+req.params.id;
QueryToExecuteInDatabase(_res,query);

});
