var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = require('./user');

var ProjectSchema = new Schema ({
    name :{
        type : String,
        required : true
    },
    type :{
        type : String,
        required : true
    },
    description :{
        type : String,
        required : true
    },
    managerID :{
        type : [Schema.Types.ObjectId],
        ref :'User'
    },
    teamMembersID :{
        type : [Schema.Types.ObjectId],
        ref : 'User'
    },
    startDate :{
        type    : Date,
        required : true 
    },
    endDate :{
        type    : Date,
        required : true 
    },
    SITstartDate :{
        type    : Date 
    },
    SITendDate :{
        type    : Date
    },
    UATstartDate :{
        type    : Date 
    },
    UATendDate :{
        type    : Date 
    }
})


module.exports = mongoose.model('Project',ProjectSchema)