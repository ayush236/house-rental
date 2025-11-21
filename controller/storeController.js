// const rootDir = require("../utils/path")
const Home = require("../models/datahanding");
const User = require('../models/user');





// showing the data at home 

exports.Index=(req, res, next)=>{
    Home.find().then(Rendering =>{
        res.render('store/index.ejs', 
        { RegisterHome: Rendering,
             isLoggedIn: req.session.isLoggedIn,
        user: req.session.user,
        title: "INDEX"
        }
    )});
    console.log('this the home page');
    console.log("session is", req.session)
}


// showing the data at home 

exports.getHome=(req, res, next)=>{
Home.find().then(Rendering =>{        
    res.render('store/home-list.ejs', 
        { RegisterHome: Rendering,
             isLoggedIn: req.session.isLoggedIn,
        user: req.session.user,
        title: "HomePage"
    })});
    console.log('this the home page');
}




// booking-home 

exports.getbooking =(req, res, next)=>{

    console.log('this is the booking site of the customer');
    Home.find().then(Rendering =>{
        res.render('store/booking.ejs', 
        { title: "BOOKING",
             isLoggedIn: req.session.isLoggedIn,
        user: req.session.user
    })});
}

//favourite-list 


exports.favourite =async (req, res, next)=>{

    console.log('this is favourite-list')
    let userid = req.session.user._id
    let user = await User.findById(userid).populate('favourite');
    console.log("user is", user);  
        res.render('store/favourite-list.ejs',{
        favouritehouse: user.favourite,
         isLoggedIn: req.session.isLoggedIn,
        user: req.session.user,
        title: "FAVOURITE-LIST",
        
    })};
      

//home-detail

exports. getHomeDetail = (req, res, next)=>{
    const houseid = req.params.HomeID;
    console.log("this is the value of id",houseid);
    Home.findById(houseid).then(houses=>{
        if(!houses){
            console.log("house is not found")
            res.redirect('/Home')
        }else{
            console.log("house is found", houses)
            res.render('store/home-detail.ejs',{
            title: "HOMEDETAIL",
             isLoggedIn: req.session.isLoggedIn,
        user: req.session.user,
            house: houses
    })
        } 
    })
    
}

//add-favourite 

exports. getaddfavourite = async (req, res, next)=>{
    const HomeId = req.body.id;
    const userid = req.session.user._id;
    const user = await User.findById(userid);
    if(!user.favourite.includes(HomeId)){
        user.favourite.push(HomeId);
        await user.save();
    }
            res.redirect('/favourite')
};


// remove-favourite 

exports. postDeletefavourite = async (req, res, next)=>{
    const homeIds = req.params.homeId;
    const userid = req.session.user._id;
    const user = await User.findById(userid);
    if(user.favourite.includes(homeIds)){
        user.favourite = user.favourite.filter((fav)=> fav != homeIds);
        await user.save();
    }

        res.redirect('/favourite');

}

