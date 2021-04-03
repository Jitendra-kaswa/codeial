const express =require('express');
const router=express.Router();
const passport=require('passport');
const postController=require('../controllers/posts_controller');

router.post('/create',passport.checkAuthentication,postController.create); // router to create a post 
router.get('/destroy/:id',passport.checkAuthentication,postController.destroy); // router to destroy a post

module.exports=router;