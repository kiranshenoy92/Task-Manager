var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = require('./user');

var AssignmentSchema = new Schema({
    targetEmpID :{
        type : Schema.Types.ObjectId,
        ref  : 'User'
    },
    oldManagerID :{
        type : Schema.Types.ObjectId,
        ref  : 'User'
    },
    newManagerID :{
        type : Schema.Types.ObjectId,
        ref  : 'User'
    },
    status :{
        type: String,
        enum : ['PENDING','APPROVED','REJECT','CANCELLED'],
        default: 'PENDING'
    }
})


module.exports = mongoose.model('Assignment',AssignmentSchema);