const mongoose = require('mongoose');
const dbConnect = require('../database/conn');
const Data = require('../models/data');

//database connection
dbConnect();

//apis

//getData Api
exports.getData = async (req, res) => {
    const task = await Data.find();
    res.json({
        success: true,
        message: 'data is succcessful get',
        task
    })
}


//create data 
exports.createData = async (req, res) => {
    if(req.body.nameTask =='' || req.body.description == '') return res.json({message:'please fill the Filed', success:true})
    const crtd = await Data.create(req.body)

    if (!crtd) {
        return res.json({ success: false, message: 'The Data not created on database' })
    }
    res.json({ success: true, message: 'data is successfuly created' });
}


//delete data
exports.deleteData = async(req,res)=>{
    const {id} = req.params;
    const dlt = await Data.findByIdAndDelete(id);
    if(!dlt){
        return res.json({success:false,message:'data is not Found'});
    }
    res.json({success:true,message:'data is Deleted'});

}

//update 
exports.updateData= async(req,res)=>{
    const {id} = req.params;
    const updt = await Data.findByIdAndUpdate(id,req.body,{
        new:true
    });

    if(!updt){
        return res.json({success:false,message:"data is not Found"});
    }
    res.json({success:true,message:'Upadte successfuly'});

}