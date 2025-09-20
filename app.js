//core module
const express = require("express");

//local module
const StoreRouter = require("./router/StoreRouter");
const { HostRouter } = require("./router/HostRouter");
const { error } = require("./controller/error");
const  {MongoConnection}  = require("./utils/databaseutil");

const app = express();

app.set("view enginee", "ejs");
app.set("views", "views");
app.use(express.static("public"));
app.use(express.urlencoded());
app.use(StoreRouter);
app.use(HostRouter);
app.use(error);

const PORT = 3000;
MongoConnection(Client=>{
  console.log(Client);
  app.listen(PORT, () => {
  console.log(`server is running at http://localhost:${PORT}`);
});
})


