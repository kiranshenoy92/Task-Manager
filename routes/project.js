var express = require('express');
var csrf = require('csurf');
var router = express.Router();
var isLoggedIn = require('./helpers/isLoggedIn');
var isLoggedOut = require('./helpers/isLoggedOut');

var csrfProtection = csrf();
router.get('/addProject',isLoggedIn,csrfProtection,(req,res,next)=>{
    res.render('project',{  csrfToken   : req.csrfToken(), 
                            isLoggedIn  : req.isAuthenticated(), 
                            user        : req.user});
})

router.post('/addTimeDetails',isLoggedIn,csrfProtection,(req,res,next)=>{
console.log("2project name is"+req.body.projectName);
    res.render('projectDuration',{  csrfToken   : req.csrfToken(), 
                                    isLoggedIn  : req.isAuthenticated(), 
                                    user        : req.user,
                                    projectName : req.body.projectName,
                                    projectType : req.body.projectType,
                                    projectDescription : req.body.projectDescription
                                    });
})

module.exports = router; 