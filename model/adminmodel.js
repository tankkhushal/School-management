
const mongoose = require('mongoose')
const { boolean } = require('webidl-conversions')

const adminSchema = mongoose.Schema({
    username:{
        type : String,
        require : true
    },
    email:{
        type : String,
        require : true
    },
    password:{
        type : String,
        require : true
    },
    status:{
        type : Boolean,
        require : true
    },

})
const admin = mongoose.model('admin',adminSchema);

 module.exports = admin;