module.exports.home=function(req,res){
    return res.render('home',{
        title: "Home",
        css_link:"/css/home.css",
        js_link:"/js/home.js"
    })
}