const express=require('express');
const router=express.Router();
const passport=require('passport');
const usersController=require('../controllers/users_controller');// require users controller

router.get('/profile',passport.checkAuthentication,usersController.profile);// profile router
router.get('/sign-in',usersController.signin);// sign in router
router.get('/sign-up',usersController.signup);// sing up router
router.post('/create',usersController.create);// sign up router for post request
// use passport as a middleware to authenticate
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect:'/users/sign-in'},
),usersController.create_session);// create session for sign in router

module.exports = router;