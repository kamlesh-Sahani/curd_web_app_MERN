const mongoose  = require('mongoose');

const dataSchema = new mongoose.Schema({
    nameTask:{
        type:String,
        required:true
    },
    description:String
});

module.exports = mongoose.model('Data',dataSchema);