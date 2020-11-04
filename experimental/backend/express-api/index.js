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
res.header("Access-Control-Allow-Mathods", "GET,HEAD,OPTIONS,POST,PUT");
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


app.listen(port, () => {
    console.info(`App is live on http://localhost:${port}/`)
})