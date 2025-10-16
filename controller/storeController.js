// const rootDir = require("../utils/path")
const Home = require("../models/datahanding");
const Favourite = require("../models/favourite");





// showing the data at home 

exports.Index=(req, res, next)=>{
    Home.find().then(Rendering =>{
        res.render('store/index.ejs', 
        { RegisterHome: Rendering,
             isLoggedIn: req.isLoggedIn,
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
             isLoggedIn: req.isLoggedIn,
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
             isLoggedIn: req.isLoggedIn
    })});
}

//favourite-list 


exports.favourite =(req, res, next)=>{

    console.log('this is favourite-list')
    Favourite.find()
    .populate("HomeId").
    then((favourites)=>{
        const favouritehome = favourites.map((favi) =>favi.HomeId)
              .filter(house => house !== null);   
        res.render('store/favourite-list.ejs',{
        favouritehouse: favouritehome,
         isLoggedIn: req.isLoggedIn,
        title: "FAVOURITE-LIST",
        
    })});
      };

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
             isLoggedIn: req.isLoggedIn,
            house: houses
    })
        } 
    })
    
}

//add-favourite 

exports. getaddfavourite = (req, res, next)=>{
    const HomeId = req.body.id;
    Favourite.findOne({HomeId : HomeId})
    .then(existingfavourite=>{
        if(existingfavourite){
            console.log("favourite is already marked");
        }else{
            const favi = new Favourite({HomeId : HomeId});
            favi.save().then(result =>{
                console.log("Fav is added", result)
            });
        }
            res.redirect('/favourite')

    }).catch(error=>{
        console.log('error while:', error);
    });  
};


// remove-favourite 

exports. postDeletefavourite =(req, res, next)=>{
    const homeIds = req.params.homeId;
    Favourite.findOneAndDelete({HomeId:homeIds}).then(result=>{  
        console.log("result is :", result)
    }).catch(error=>{
        if(error){
            console.log("error is occure while removing", error);
        }
    }).finally(()=>{
    res.redirect('/favourite');
    })
}

