// const rootDir = require("../utils/path")
const Home = require("../models/datahanding")





//add-home which is controlled by host 


exports.addHome=(req, res, next)=>{
    
    console.log('this the add-home page')

    res.render('host/edit-home.ejs', {
        title: "addHome",
        editing: false
    });
}

//editing- home controller by host

exports.getEditHome=(req, res, next)=>{
    const houseId = req.params.houseId;
    const editing = req.query.editing === "true";
    Home.FindById(houseId, house=>{
        if(!house){
            console.log("house can't be found");
            return req.redirect('/host-home-list')
        }
        console.log(houseId, editing, house)
        console.log('this the edit-home page')
        res.render('host/edit-home.ejs', {
        title: "editing-page",
        editing: editing,
        house: house
        
    });
    })
    
}




// showing the data to host

exports.getHostHome=(req, res, next)=>{
    Home.fetchAll(Rendering =>res.render('host/host-home-list.ejs', 
        { RegisterHome: Rendering,
        title: "host-home"
    }));
    console.log('this the home page');
}


//submit-home 


exports.submitHome=(req, res, next)=>{
    
    console.log('this the add-home page',req.body)
    const {image,  name, address, rating, cost}= req.body;
    const home = new Home(image,  name, address, rating, cost);
    // const home = new Home(req.body.image, req.body.name, req.body.address, req.body.rating, req.body.cost);
    home.save();

    res.render('store/submit.ejs', {
        title: "submitHome" 
    });
}

// booking-home 

exports.booking =(req, res, next)=>{

    console.log('this is the booking site of the customer');
}





