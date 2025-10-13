

exports.getlogin=(req, res, next)=>{
    res.render("auth/login.ejs",{title :"login page",
        isLoggedIn: false
    })
};

exports.postlogin=(req, res, next)=>{
    console.log(req.body);
    req.isLoggedIn = true;
    res.redirect('/');

}