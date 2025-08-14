const express =require('express');

const StoreRouter = express.Router();
const Controllor = require('../controller/storeController')

StoreRouter.get('/', Controllor.Index)
StoreRouter.get('/Home', Controllor.getHome);
StoreRouter.get('/booking', Controllor.getbooking);
StoreRouter.get('/favourite', Controllor.favourite);

StoreRouter.get('/Home/:HomeID', Controllor.getHomeDetail)
StoreRouter.post('/favourite',Controllor.getaddfavourite);
StoreRouter.post('/favourite/delete/:homeId', Controllor.postDeletefavourite);



module.exports = StoreRouter;