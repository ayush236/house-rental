// const rootDir = require("../utils/path")
const Home = require("../models/datahanding")


//add-home which is controlled by host 


exports.addHome=(req, res, next)=>{
    
    console.log('this the add-home page')

    res.render('host/edit-home.ejs', {
        title: "addHome",
         isLoggedIn: req.isLoggedIn,
        editing: false
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
         isLoggedIn: req.isLoggedIn,
        house: houses
        
    });
    })
    
}




// showing the data to host

exports.getHostHome=(req, res, next)=>{
    Home.find().then(Rendering =>{
        res.render('host/host-home-list.ejs', 
        { RegisterHome: Rendering,
             isLoggedIn: req.isLoggedIn,
        title: "host-home"
    })});
    console.log('this the home page');
}


//submit-home 


exports.submitHome=(req, res, next)=>{
    
    const {image,  name, address, rating, cost, description}= req.body;
    const home = new Home({image,  name, address, rating, cost, description});
    home.save().then(()=>{
        console.log('submit the homes SUCCESS');
    });
    res.render('store/submit.ejs', {
        title: "submitHome",
         isLoggedIn: req.isLoggedIn 
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





