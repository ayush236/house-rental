const express =require('express');
const authRouter = express.Router();


const authController = require('../controller/authController')

authRouter.get('/login', authController.getlogin);
authRouter.post('/login', authController.postlogin);
authRouter.post('/logout', authController.postlogout);


module.exports = authRouter;