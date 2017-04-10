var isLoggedIn = (req,res,next) =>{
    if(req.isAuthenticated())
	    return next();
	else
		req.session.redirectTo = req.originalUrl;	
		res.redirect('/user/login')
	}
module.exports = isLoggedIn;