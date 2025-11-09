

exports.getlogin=(req, res, next)=>{
    res.render("auth/login.ejs",{title :"login page",
        isLoggedIn: false
    })
};

exports.postlogin=(req, res, next)=>{
    console.log(req.body);
    req.session.isLoggedIn = true;
    // req.session.isLoggedIn = true;    
    res.redirect('/');

}
exports.postlogout=(req, res, next)=>{
    req.session.destroy(()=>{
        
    res.redirect('/login');

    })
}

exports.getSignup =(req, res, next)=>{
        
    res.render("auth/signup",{
        title:"signup",
        isLoggedIn: false
    })
}


exports.postSignup=(req, res, next)=>{
    console.log(req.body)
    res.redirect('/login')
}