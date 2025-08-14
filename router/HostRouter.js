const express = require('express');

const HostRouter = express.Router();

const Controllor = require('../controller/hostController')


HostRouter.get('/add-home', Controllor.addHome);
HostRouter.post('/submit-home', Controllor.submitHome);
HostRouter.get('/Host-Home-list',Controllor.getHostHome);
HostRouter.get('/host/editing-home/:houseId', Controllor.getEditHome);
HostRouter.post('/edit-home', Controllor.PostEditHome);
HostRouter.post('/host/delete-home/:homeId', Controllor.PostDeleteHome);
exports.HostRouter =HostRouter;