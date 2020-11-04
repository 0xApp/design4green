const express = require('express');
const _bodyParsepack= require('body-parser');
const app = express();
const zip_comp = require('compression');

//compress all http responses
app.use(zip_comp());
app.use(_bodyParsepack.json());

//cross domain enable
app.use(function (req,res,next){
	res.header("Access-Control-Allow-Origin","*");
res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, contentType,Content-Type, Accept,Authorization");
next();
}
)

const port = 3001;

const randomString = (length) => {
    var result = '';
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
};

app.get('/', (req, res) => {
    var result = [];
    for(let i = 0; i < 1000; i++){
        result.push(randomString(50));
    }
    res.send({
        data: result
    });
});

//post
app.post('/api/create',(req,res)=>{
var query ="insert into user (name) values (req.body.Name)";
//QueryToExecuteInDatabase(_res,query);
res.send('Post request to home example for insert');
});

//PUT
app.put('/api/user',(req,res)=>{
var query ="update usertable set name='"+req.body.Name+"'where id="+req.body.s_id;
//QueryToExecuteInDatabase(_res,query);
//res.send(res.json(req.body));
res.send('Put Request working for update');
});

//Delete
app.delete('/api/user/:id',(req,res)=>{
var query ="Delete from user where id="+req.params.id;
//QueryToExecuteInDatabase(_res,query);
res.send('Delete working');
});


app.listen(port, () => {
    console.info(`App is live on http://localhost:${port}/`)
})