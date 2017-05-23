var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var NotificationTypeSchema = new Schema({
    name :{
        type : String
    },
    description :{
        type : String
    },
    template :{
        type : String
    }
})