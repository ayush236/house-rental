

exports.getlogin=(req, res, next)=>{
    res.render("auth/login.ejs",{title :"login page"})
};

exports.postlogin=(req, res, next)=>{
    res.redirect('/');

}