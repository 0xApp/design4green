const express = require('express');
const app = express();

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