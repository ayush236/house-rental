const fs = require('fs');
const path = require('path');
const rootDir = require('../utils/path');
const Home = require('./datahanding');


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

        static DeleteById(favhomeId, callback){
            favourite.getFavourite(homeIds=>{
                homeIds = homeIds.filter((homeId)=> favhomeId !== homeId )
                 fs.writeFile(favouriteDatapath, JSON.stringify(homeIds), error=>{
                    Home.DeleteById(homeIds, callback);
                 });

            })

        }


}