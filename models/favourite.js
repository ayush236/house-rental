


module.exports = class favourite{
    constructor(HomeId){ 
        this.HomeId = HomeId
    }

    save(){
        
        const db = getDB();
        return db.collection('Favourite').findOne({HomeId : this.HomeId}).then(existingfav=>{
            if(!existingfav){
                return db.collection('Favourite').insertOne(this);
            }
            return Promise.resolve();  
        })
        
    }
    static getFavourite(){
        const db =getDB();
        return  db.collection("Favourite").find().toArray();
       
        }

        static DeleteById(favhomeId){
            const db = getDB();
            return db.collection("Favourite").deleteOne({HomeId : favhomeId})
            
        }


}