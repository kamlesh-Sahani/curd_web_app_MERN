const mongoose = require('mongoose');

const DB = 'mongodb://localhost:27017/crud-web-app'
const dbConnect = ()=>
{
    mongoose.connect(DB).then(()=>{
        console.log('database connection succesful');
    }).catch((error)=>{
        console.log(`database connection error : ${error}`)
    })
}

module.exports= dbConnect;