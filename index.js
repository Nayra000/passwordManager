require('dotenv').config();

const path = require('path');
const morgan = require('morgan');
const express = require('express');
const mongoose = require('mongoose');

const userRouter = require('./routers/userRouter');
// const testRouter = require('./routers/testRouter');
const passwordRouter = require('./routers/passwordRouter');
const viewsRouter =require('./routers/viewsRouter');

const app = express();

// allow express accept json format data
app.use(express.json());

// serve files in 'public' folder without routing
app.use(express.static('./public'));

// HTTP request logger
app.use(morgan('dev'));

// Templates configurations
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// ROUTERS
// app.use('/test', testRouter); // THIS ROUTER JUST FOR DEBUGING

app.use('/api/passwords', passwordRouter);
app.use('/api/users', userRouter);


//Views
app.use('/' ,viewsRouter);

// DB connection URI
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

// Connect to DB with mongoose ODM
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

// SERVER CONNECTION
app.listen(3000, () => {
  console.log('listening on port 3000');
});

// Allow Vercel to turn Express into a serverless function
module.exports = app;
