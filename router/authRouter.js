const express =require('express');
const authRouter = express.Router();


const authController = require('../controller/authController')

authRouter.get('/login', authController.getlogin);
authRouter.post('/login', authController.postlogin);
authRouter.post('/logout', authController.postlogout);
authRouter.get('/signup', authController.getSignup);
authRouter.post('/signup', authController.postSignup);


module.exports = authRouter;