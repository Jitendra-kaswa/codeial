const express=require('express');
const router=express.Router();
const passport=require('passport');

const commentsController=require('../controllers/comments_controller');

router.post('/create',passport.checkAuthentication,commentsController.create); // to create a new comment
router.get('/destroy/:id',passport.checkAuthentication,commentsController.destroy) // to destroy a comment

module.exports=router;