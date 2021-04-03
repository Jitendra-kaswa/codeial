const express=require('express');
const router=express.Router();
const passport=require('passport');
const usersController=require('../controllers/users_controller');// require users controller

router.get('/profile/:id',passport.checkAuthentication,usersController.profile);// profile router
router.post('/update/:id',passport.checkAuthentication,usersController.update);// update profile router
router.get('/sign-in',usersController.signin);// sign in router
router.get('/sign-up',usersController.signup);// sing up router


router.post('/create',usersController.create);// use for sign up POST /users/create 

// use passport as a middleware to authenticate
router.post('/create-session',passport.authenticate(  // use for sign in POST /users/create-session
    'local',
    {failureRedirect:'/users/sign-in'},
),usersController.create_session);// create session for sign in router


router.get('/sign-out',usersController.signout);

module.exports = router;