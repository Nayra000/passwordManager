const dotenv = require('dotenv');
dotenv.config({path:'./config.env'});


const express = require('express');
const path = require('path');

const app = express();


app.set('view engine', 'pug');
app.set('views' ,path.join(__dirname, 'views'));

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(3000 ,() => {console.log('listening on port 3000');});

