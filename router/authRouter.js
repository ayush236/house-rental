const express =require('express');
const authRouter = express.Router();


const authController = require('../controller/authController')

authRouter.get('/login', authController.getlogin);
authRouter.post('/login', authController.postlogin);


module.exports = authRouter;