

exports.getlogin=(req, res, next)=>{
    res.render("auth/login.ejs",{title :"login page"})
}