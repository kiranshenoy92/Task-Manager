var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var Designation = new Schema({
    designation : {
        type : String
    }
})

module.exports = mongoose.model('Designation',Designation);
