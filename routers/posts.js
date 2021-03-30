const express =require('express');
const router=express.Router();

const postController=require('../controllers/posts_controller');
router.post('/',postController.create);

module.exports=router;