const fs = require('fs')
const rootDir = require('../utils/path')
const path = require('path');
const filepath = path.join(rootDir, 'Data', 'home.json')



//fake database
// const RegisterHome = [];


module.exports = class Home{
    constructor(image,  name, address, rating, cost){
        this.image = image;
        this.name = name;
        this.address = address;
        this.rating = rating;
        this.cost = cost;
    }
    save(){
        Home.fetchAll(RegisterHome =>{
            if(this.id){
                RegisterHome = RegisterHome.map(home=>
                    home.id === this.id ? this : home)
            }else{
                this.id = Math.random().toString();
            RegisterHome.push(this);
            }
        fs.writeFile(filepath, JSON.stringify(RegisterHome), (error)=>{
            console.log('file writinf is concluded', error);
        });
        });
    }
    static fetchAll(callback){
        fs.readFile(filepath, (error, data)=>{
            console.log("file is read:", error, data);
            callback(!error ? JSON.parse(data) : []);
        });
    }

    static FindById(HomeID, callback){
        this.fetchAll(houses=>{
            const house = houses.find((house)=>
                house.id === HomeID);
            callback(house);      
        })
    }

    static DeleteById(HomeID, callback){
        this.fetchAll(houses=>{
            const house = houses.filter((house)=> house.id !== HomeID)
            fs.writeFile(filepath, JSON.stringify(house), callback);
        })
    }
}