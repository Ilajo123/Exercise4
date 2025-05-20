require('dotenv').config();
const express = require('express');
const app = express();
const logEvents = require('./middleware/logEvents');
const PORT  = process.env.PORT || 3000;
const cors = require('cors')
const corsOption = require('./config/corsOptions');
const credentials = require('./config/credentials');
const path = require('path');
const mongoose = require('mongoose');
const connectDB = require('./config/connectDB.js');
const cookieParser = require('cookie-parser');


connectDB();
app.use((req,res,next) => {
  logEvents(`${req.method} - ${req.headers.origin} - ${req.url}`, 'serverLog.txt');
  next();
});
app.use(express.urlencoded({extended: false}));
app.use(credentials);
app.use(cors(corsOption));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname,'/public')));
app.get('/', (req,res) => {
  res.send('Hi');
});

app.use('/login', require('./routes/login'));
app.use('/register', require('./routes/register'));
app.use('/refresh', require('./routes/refresh.js'));
app.use('/logout', require('./routes/logout.js'));
app.all('/*splat', (req,res) => {
  res.status(404);
  if (req.accepts('html')){
    res.sendFile(path.join(__dirname,'views','404.html'));
  } else if(req.accepts('json')) {
    res.json({error: "404 Page Not Found"})
  } else {
    res.type('txt').send("Error 404 - Page Not Found");
  }
  
});

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => {
    console.log(`Listening to PORT ${PORT}`)
  });  
})


