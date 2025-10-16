

exports.getlogin=(req, res, next)=>{
    res.render("auth/login.ejs",{title :"login page",
        isLoggedIn: false
    })
};

exports.postlogin=(req, res, next)=>{
    console.log(req.body);
    res.cookie("isLoggedIn", true)
    // req.isLoggedIn = true;    
    res.redirect('/');

}
exports.postlogout=(req, res, next)=>{
    res.cookie("isLoggedIn", false)
    res.redirect('/login');
}