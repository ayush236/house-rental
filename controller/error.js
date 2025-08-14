exports.error = (req,res, next)=>{
    res.render('404.ejs', {
        title : "404page"
    })
}