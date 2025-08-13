const fs = require('fs');
const path = require('path');
const rootDir = require('../utils/path');


const favouriteDatapath = path.join(rootDir, 'Data', 'favourite.json');

module.exports = class favourite{

    static AddFavourite(HomeId, callback){
        favourite.getFavourite((favourite)=>{
            if(favourite.includes(HomeId)){
                callback("the favourite is already added")
            }else{
            favourite.push(HomeId);
            fs.writeFile(favouriteDatapath, JSON.stringify(favourite), callback);
            }
        }); 
    }
    
    static getFavourite(callback){
        fs.readFile(favouriteDatapath,(error,data)=>{
            callback(!error ? JSON.parse(data) : []);
        });
        }
}