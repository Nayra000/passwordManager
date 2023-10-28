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

app.listen(3000, () => {
  console.log('listening on port 3000');
});
