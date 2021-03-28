const express=require('express');
const router=express.Router();

const usersController=require('../controllers/users_controller');// require users controller

router.get('/profile',usersController.profile);// profile router
router.get('/sign-in',usersController.signin);// sign in router
router.get('/sign-up',usersController.signup);// sing up router
router.post('/create',usersController.create);// sign up router for post request
router.post('create-sesion',usersController.create_session);// create session for sign in router

module.exports = router;