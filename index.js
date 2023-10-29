require('dotenv').config();

const path = require('path');
const morgan = require('morgan');
const express = require('express');
const mongoose = require('mongoose');

const viewRouter = require('./routers/viewsRouter');

const app = express();

app.use(express.json());
app.use(express.static('./public'));

app.use(morgan('dev'));

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use('/password-app', viewRouter);

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
  })
  .then((con) => {
    console.log('DB connecting successful...');
  })
  .catch((err) => {
    console.log('DB connection ERROR!!');
  });

app.get("/", (req, res) => {
  res.send("root '/' route");
});

app.get("/app.js", (req, res) => {
  res.send("app.js route");
});

app.get("/app", (req, res) => {
  res.send("app route");
});

app.listen(3000, () => {
  console.log('listening on port 3000');
});

// allow Vercel to turn Express into a serverless function
module.exports = app;
