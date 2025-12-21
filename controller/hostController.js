// const rootDir = require("../utils/path")
const Home = require("../models/datahanding")
const FileSystem = require('fs');


//add-home which is controlled by host 


exports.addHome=(req, res, next)=>{
    
    console.log('this the add-home page')

    res.render('host/edit-home.ejs', {
        title: "addHome",
        editing: false,
         isLoggedIn: req.session.isLoggedIn,
        user: req.session.user

    });
}

//editing- home controller by host

exports.getEditHome=(req, res, next)=>{
    const houseId = req.params.houseId;
    const editing = req.query.editing === "true";
    Home.findById(houseId).then(houses=>{
        if(!houses){
            console.log("house can't be found");
            return req.redirect('/host-home-list')
        }
        console.log(houseId, editing, houses)
        console.log('this the edit-home page')
        res.render('host/edit-home.ejs', {
        title: "editing-page",
        editing: editing,
        house: houses,
         isLoggedIn: req.session.isLoggedIn,
        user: req.session.user

        
    });
    })
    
}




// showing the data to host

exports.getHostHome=(req, res, next)=>{
    Home.find().then(Rendering =>{
        res.render('host/host-home-list.ejs', 
        { RegisterHome: Rendering,
        title: "host-home",
             isLoggedIn: req.session.isLoggedIn,
        user: req.session.user

    })});
    console.log('this the home page');
}


//submit-home 


exports.submitHome=(req, res, next)=>{
    
    const {name, address, rating, cost, description}= req.body;
    console.log(req.file);
    if(!req.file){
        return res.statue(422).send("No image provided")
    }
    const image = req.file.path
    const home = new Home({image,  name, address, rating, cost, description});
    home.save().then(()=>{
        console.log('submit the homes SUCCESS');
    });
    res.render('store/submit.ejs', {
        title: "submitHome",
         isLoggedIn: req.session.isLoggedIn,
        user: req.session.user 
    });
};


// post-edit-home

exports.PostEditHome = (req, res, next)=>{
    const {image, name, address, rating, cost, description, id } = req.body;
    Home.findById(id).then(home=>{
        home.image = image; 
        home.name=name;
        home.address=address;
        home.rating=rating;
        home.cost=cost;
        home.description=description;

        if(req.file){
            FileSystem.unlink(home.image, (err)=>{
                if(err){
                    console.log("error while deleting the file:", err);
                }else{
                    console.log("old image deleted successfully");
                }
        });
        home.image = req.file.path;
    }



          home.save().then(result=>{
        console.log("upadte the home detail", result);
     }).catch(error=>{
        console.log('Occure Error:',error);
     })
    res.redirect('/Host-Home-list');
    }).catch(error=>{
        console.log("error while finding home:", error);
    })
}

// delete-home
exports.PostDeleteHome = (req, res, next)=>{
    const homeId =req.params.homeId;
    console.log("Delete this id", homeId);
    Home.findByIdAndDelete(homeId).then(()=>{
    res.redirect('/Host-Home-list');
    }).catch((error)=>{
        console.log("error while fatching",error)
    });
}


// booking-home 

exports.booking =(req, res, next)=>{

    console.log('this is the booking site of the customer');
}





