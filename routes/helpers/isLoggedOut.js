var isLoggedOut = (req,res,next) =>{
    if(!req.isAuthenticated())
	    return next();
	else	
		res.redirect('/user/profile')
	}
module.exports = isLoggedOut;