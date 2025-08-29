const db = require('../utils/databaseutil')



module.exports = class Home{
    constructor(image,  name, address, rating, cost, description, id){
        this.image = image;
        this.name = name;
        this.address = address;
        this.rating = rating;
        this.cost = cost;
        this.description = description;
        this.id = id;
    }
    save(){
        if(this.id){
            return db.execute(
  'UPDATE  homes SET image =?, name =?, address=?, rating =?, cost =?, description =? WHERE id = ? ',[this.image, this.name, this.address, this.rating, this.cost, this.description, this.id ]
);
        }
        else{
            //insert the data
              return db.query(
  'INSERT INTO homes (image, name, address, rating, cost, description) VALUES (?, ?, ?, ?, ?, ?)',[this.image, this.name, this.address, this.rating, this.cost, this.description]
);
        }
      

        
    }
    static fetchAll(){
       return db.query('SELECT * FROM homes');
        
    }

    static FindById(HomeID){
        return db.execute('SELECT * FROM homes WHERE id = ?',[HomeID])

        
    }

    static DeleteById(HomeID){
        return db.execute('DELETE FROM homes WHERE id = ?', [HomeID])
        
    }
}