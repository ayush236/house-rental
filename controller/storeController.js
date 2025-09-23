// const rootDir = require("../utils/path")
const Home = require("../models/datahanding");
const favourite = require("../models/favourite");





// showing the data at home 

exports.Index=(req, res, next)=>{
    Home.fetchAll().then(Rendering =>{
        res.render('store/index.ejs', 
        { RegisterHome: Rendering,
        title: "INDEX"
        }
    )});
    console.log('this the home page');
}


// showing the data at home 

exports.getHome=(req, res, next)=>{
Home.fetchAll().then(Rendering =>{        
    res.render('store/home-list.ejs', 
        { RegisterHome: Rendering,
        title: "HomePage"
    })});
    console.log('this the home page');
}




// booking-home 

exports.getbooking =(req, res, next)=>{

    console.log('this is the booking site of the customer');
    Home.fetchAll().then(Rendering =>{
        res.render('store/booking.ejs', 
        { title: "BOOKING"
    })});
}

//favourite-list 


exports.favourite =(req, res, next)=>{

    console.log('this is favourite-list')
    favourite.getFavourite().then(favourites=>{
        favourites = favourites.map(favi =>favi.HomeId)
    Home.fetchAll().then(Rendering =>{
        const favouritehouse = Rendering.filter(house =>
            favourites.includes(house._id.toString())
        )
        res.render('store/favourite-list.ejs',{
        favouritehouse: favouritehouse,
        title: "FAVOURITE-LIST",
        
    })});
      });
}

//home-detail

exports. getHomeDetail = (req, res, next)=>{
    const houseid = req.params.HomeID;
    console.log("this is the value of id",houseid);
    Home.FindById(houseid).then(houses=>{
        if(!houses){
            console.log("house is not found")
            res.redirect('/Home')
        }else{
            console.log("house is found", houses)
            res.render('store/home-detail.ejs',{
            title: "HOMEDETAIL",
            house: houses
    })
        } 
    })
    
}

//add-favourite 

exports. getaddfavourite = (req, res, next)=>{
    const HomeId = req.body.id;
    const favi = new favourite(HomeId);
    favi.save().then(result=>{
        console.log('Fav add', result);
    }).catch(err=>{
        console.log("erro is :", err);
    }).finally(()=>{
        res.redirect('/favourite');
    });
}


// remove-favourite 

exports. postDeletefavourite =(req, res, next)=>{
    const homeIds = req.params.homeId;
    favourite.DeleteById(homeIds).then(result=>{
        console.log("result is :", result)
    }).catch(error=>{
        if(error){
            console.log("error is occure while removing", error);
        }
    }).finally(()=>{
    res.redirect('/favourite');
    })
}

