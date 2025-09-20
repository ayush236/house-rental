const { ObjectId } = require('mongodb');
const { getDB } = require('../utils/databaseutil')



module.exports = class Home{
    constructor(image,  name, address, rating, cost, description, _id){
        this.image = image;
        this.name = name;
        this.address = address;
        this.rating = rating;
        this.cost = cost;
        this.description = description;
        if(_id){
            this._id = _id;
        }
        
    }
    save(){
        const db = getDB();
        if (this._id){ //update case
            const update={
                image : this.image,
                  name : this.name,
                   address : this.address,
                    rating : this.rating,
                     cost : this.cost,
                      description : this.description, 

            }
            return db.collection('homes')
            .updateOne({_id : new ObjectId(String(this._id))}, {$set: update})

        }else{ // insert case
            return db.collection("homes").insertOne(this);
        

        }
    }
        
    
    static fetchAll(){
        const db =getDB();
        return  db.collection("homes").find().toArray();
        
    }

    static FindById(HomeID){
        const db =getDB();
        return db.collection("homes")
        .find({
            _id : new ObjectId(String(HomeID)) 
        })
        .next();
    }

    static DeleteById(HomeID){
        const db = getDB();
        return db.collection("homes")
        .deleteOne({
            _id : new ObjectId(String(HomeID))
        })
    }

    }