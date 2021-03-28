module.exports.home=function(req,res){
    //console.log(req.cookies);
    //res.cookie('user_id','255')
    return res.render('home',{
        title: "Home",
        css_link:"/css/home.css",
        js_link:"/js/home.js"
    })
}