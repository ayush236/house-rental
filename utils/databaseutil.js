const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;

let _db;
const Mongo_URL = "mongodb+srv://House_Rental-db:root%40123@ayush.lwg3asu.mongodb.net/?retryWrites=true&w=majority&appName=AYUSH"
const MongoConnection =(callback)=>{
    MongoClient.connect(Mongo_URL)
.then(Client=>{
    _db = Client.db('renTing');
     callback(Client);

})
.catch((error)=>{
    console.log("error while connecting the mongo", error);
})

}

const getDB = ()=>{
    if(!_db){
        throw new Error('Mango not connected');
    }
     return _db;
}


exports.MongoConnection = MongoConnection;
exports.getDB = getDB;



