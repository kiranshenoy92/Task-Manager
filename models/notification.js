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
    type :{
        type: String,
        enum : ['TASK_ASSIGNMENT','EMPLOYEE_MOVEMENT'],
        required : true
    },
    read :{
        type :      Boolean,
        default :   false 
    },
    referenceID :{
        type : Schema.Types.ObjectId
    }
})

module.exports = mongoose.model('Notification',NotificationSchema);