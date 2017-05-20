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
    client :{
        type : String,
    },
    managerID :{
        type : Schema.Types.ObjectId,
        ref :'User'
    },
    teamMembersID :{
        type : [Schema.Types.ObjectId],
        ref : 'User'
    },
    startDate :{
        type    : Date 
    },
    endDate :{
        type    : Date,
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
    },
    PRODstartDate :{
        type    : Date 
    },
    PRODendDate :{
        type    : Date 
    },
    createdBy :{
        type : Schema.Types.ObjectId,
        ref : 'User'
    },
    lastUpdatedBy :{
        type : Schema.Types.ObjectId,
        ref : 'User'
    }
})


module.exports = mongoose.model('Project',ProjectSchema)