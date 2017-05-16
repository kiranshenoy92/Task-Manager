var express = require('express');
var csrf = require('csurf');
var router = express.Router();
var isLoggedIn = require('./helpers/isLoggedIn');
var isLoggedOut = require('./helpers/isLoggedOut');

//database models
var User = require('../models/user');
var Grades = require('../models/grades');

var csrfProtection = csrf();
router.get('/addProject',isLoggedIn,csrfProtection,(req,res,next)=>{
    res.render('project',{  csrfToken   : req.csrfToken(), 
                            isLoggedIn  : req.isAuthenticated(), 
                            user        : req.user});
})

router.post('/addTimeDetails',isLoggedIn,csrfProtection,(req,res,next)=>{
    res.render('projectDuration',{  csrfToken   : req.csrfToken(), 
                                    isLoggedIn  : req.isAuthenticated(), 
                                    user        : req.user,
                                    projectName : req.body.projectName,
                                    projectType : req.body.projectType,
                                    projectDescription : req.body.projectDescription
                                    });
})

router.post('/addEmployee',isLoggedIn,csrfProtection,(req,res,next)=>{
    Grades.find({'designation':{ $in:['BU Head', 'Manager','Project Manager']}})
        .select('_id')
        .exec((err,managerID)=>{
            if(err){

            } else if(managerID){
                User.find({'designation':managerID})
                    .select('_id firstName lastName')
                    .exec((err,managers)=>{
                        res.render('projectEmployees',{ 
                                    csrfToken           : req.csrfToken(), 
                                    isLoggedIn          : req.isAuthenticated(), 
                                    user                : req.user,
                                    projectName         : req.body.projectName,
                                    projectType         : req.body.projectType,
                                    projectDescription  : req.body.projectDescription,
                                    sitStartDate        : req.body.sitStartDate,
                                    sitEndDate          : req.body.sitEndDate,
                                    uatStartDate        : req.body.uatStartDate,
                                    uatEndDate          : req.body.uatEndDate,
                                    prodStartDate       : req.body.prodStartDate,
                                    prodEndDate         : req.body.prodEndDate,
                                    managers            : managers
                                    });
                    })
            }
        })
})


router.post('/submitProject',isLoggedIn,csrfProtection,(req,res,next)=>{
    console.log(req.body);
})

router.get('/getemployees/:managerID',isLoggedIn,csrfProtection,(req,res,next)=>{
    User.find({'manager':req.params.managerID})
        .populate('designation')
        .exec((err,employees)=>{
            if(err){
                console.log(err);
            }else if(employees){
                
                res.json({employees :employees})
            }
        })
})


module.exports = router; 