//core module
const express = require("express");
const DB_path = "mongodb+srv://House_Rental-db:root%40123@ayush.lwg3asu.mongodb.net/renTing?retryWrites=true&w=majority&appName=AYUSH";
const session = require('express-session');
const mongoDBStore = require('connect-mongodb-session')(session);


//local module
const StoreRouter = require("./router/StoreRouter");
const { HostRouter } = require("./router/HostRouter");
const { error } = require("./controller/error");
const {default: Mongoose} = require('mongoose');
const authRouter = require("./router/authRouter");
const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const store =new mongoDBStore({
  uri: DB_path,
  collection: 'sessions'
})

app.use(express.static(("public")));

app.use(express.urlencoded());

app.use(session({
  secret: 'hello learning the session ',
  resave: false,
  saveUninitialized: true,
  store
}))


app.use( (req, res, next)=>{
  req.session.isLoggedIn = req.session.isLoggedIn;
  next();
})


app.use(StoreRouter);

app.use("/host", (req, res, next)=>{
  if(!req.session.isLoggedIn){
    return res.redirect('/login')
  }else{
  next();
  }
});

app.use(HostRouter);
app.use(authRouter);

app.use(error);

const PORT = 3000;

Mongoose.connect(DB_path).then(()=>{
  console.log('Connected to Mongoose')
  app.listen(PORT, () => {
  console.log(`server is running at http://localhost:${PORT}`);
});
}).catch(error=>{
  console.log('occured in error',error);
})
  


