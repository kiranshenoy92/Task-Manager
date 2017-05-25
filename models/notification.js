var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var NotificationSchema = new Schema({
    toEmployeeID :{
        type : Schema.Types.ObjectId,
        ref : 'User'
    },
    fromEmployeeID :{
        type : Schema.Types.ObjectId,
        ref : 'User'
    },
    targetEmployeeID :{
        type : Schema.Types.ObjectId,
        ref : 'User'
    },
    type :{
        type: String,
        enum : ['TASK_ASSIGNMENT','EMPLOYEE_MOVEMENT','EMPLOYEE_MOVEMENT_SUCCESS','EMPLOYEE_MOVEMENT_FAILURE'],
        required : true
    },
    read :{
        type :      Boolean,
        default :   false 
    },
    referenceID :{
        type : Schema.Types.ObjectId
    },
    result :{
        type : String   
    }
})

module.exports = mongoose.model('Notification',NotificationSchema);