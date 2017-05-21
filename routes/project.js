var express = require('express');
var csrf = require('csurf');
var router = express.Router();
var isLoggedIn = require('./helpers/isLoggedIn');
var isLoggedOut = require('./helpers/isLoggedOut');

//database models
var User = require('../models/user');
var Grades = require('../models/grades');
var Project = require('../models/project');

var csrfProtection = csrf();
router.get('/addProject',isLoggedIn,csrfProtection,(req,res,next)=>{
    res.render('project',{  csrfToken   : req.csrfToken(), 
                            isLoggedIn  : req.isAuthenticated(), 
                            user        : req.user});
})

router.get('/listProjects',isLoggedIn,(req,res,next)=>{
    Project.find()
            .exec((err,projects)=>{
                if(err){
                    console.log(err)
                } else {
                    res.render('projectList',{
                        isLoggedIn  : req.isAuthenticated,
                        user        : req.user,
                        projects    : projects
                    })
                }
            })
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


router.post('/createProject',isLoggedIn,csrfProtection,(req,res,next)=>{
    console.log(req.body)
    var project = new Project({
        name            : req.body.projectName, 
        type            : req.body.projectType,
        client          : req.body.client,
        description     : req.body.projectDescription,
        managerID       : req.body.managerID,
        teamMembersID   : req.body.teamMembersID,
        startDate       : req.body.sitStartDate,
        endDate         : req.body.prodEndDate,
        SITstartDate    : req.body.sitStartDate,
        SITendDate      : req.body.sitEndDate,
        UATstartDate    : req.body.uatStartDate,
        UATendDate      : req.body.uatEndDate,
        PRODstartDate   : req.body.prodStartDate,
        PRODendDate     : req.body.prodEndDate,
        createdBy       : req.user._id,
        lastUpdatedBy   : req.user._id
    })

    project.save((err,project)=>{
        if(err){
            console.log(err)
        } else {
            if(project.teamMembersID){
                project.teamMembersID.forEach((element)=>{
                    User.findOneAndUpdate({'_id': element},{$set :{projectID : project._id}},(err, doc)=>{
                        if(err){
                            console.log("Something wrong when updating data!");
                        }
                        console.log("done updating");
                    });  
                });
            }
            var opts = [
                { path:'managerID'},
                { path:'teamMembersID'},
                { path:'createdBy'},
                { path:'lastUpdatedBy'}
            ]
            Project.populate(project,opts,(err,project)=>{       
                res.render('projectCreationSuccess',{
                    user        : req.user,
                    isLoggedIn  : req.isAuthenticated(), 
                    project     : project
                })
            })
        }
    })
})

router.post('/submitProject',isLoggedIn,csrfProtection,(req,res,next)=>{
    User.find({'_id' : {'$in' :req.body.teamMembersID}})
        .select('firstName lastName employeeID _id')
        .exec((err,teamMembers)=>{
            if(err){
                console.log(err)
            } else {
                User.findById(req.body.managerID)
                    .select('firstName lastName employeeID')
                    .exec((err,manager)=>{
                        if(err){
                            console.log(err)
                        } else {
                             res.render('projectConfirmation',{ 
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
                                    managerID           : req.body.managerID,
                                    teamIDs             : req.body.teamMembersID,
                                    teamMembers         : teamMembers,
                                    manager             : manager
                                    });
                        }
                    })
            }
        })
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