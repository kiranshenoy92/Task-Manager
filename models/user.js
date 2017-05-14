var mongoose = require('mongoose');
var bCrypto = require('bcrypt-nodejs');
var Schema = mongoose.Schema;
var Designation = require('./grades');
var User = new Schema({
    firstName : {
        type: String,
        required: true
    },
    lastName : {
        type: String,
        required: true
    },
    password : {
        type: String,
        required: true
    },
    email : {
        type: String,
        required: true,
        unique: true
    },
    employeeID : {
        type: String,
        required: true,
        unique: true
    },
    active : {
        type: Boolean,
        required : true,
        default: false
    },
    token : {
        type : String,
        required : true
    },
    resetpwdtoken : {
        type : String
    },
    manager : {
        type : Schema.Types.ObjectId,
        ref : 'User'
    },
    designation : { 
        type: Schema.Types.ObjectId, 
        ref: 'Designation' },
    profilePicture : {
        type : String,
        default: "none"
    }
})

User.methods.hashPassword = function(password) {
    return bCrypto.hashSync(password, bCrypto.genSaltSync(10), null);
}

User.methods.comparePassword = function (password) {
    return bCrypto.compareSync(password, this.password);
}

module.exports = mongoose.model('User',User);