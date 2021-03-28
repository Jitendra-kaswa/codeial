const express=require('express'); // it is not the new instance of express it the same express that we called in main index.js file then the same is passed here
const router=express.Router();

const homeController=require('../controllers/home_controller');
router.get('/',homeController.home);

router.use('/users',require('./users'));

// for any further routs,access from here
// router.use('/routerName',require('./routerfile'));
module.exports=router;