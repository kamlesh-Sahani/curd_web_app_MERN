    const express = require('express');
    const router = express.Router();
    const {getData, createData, deleteData, updateData} = require('../controller/DataController');

    //get Data
    router.get('/getdata',getData);
    //create Data
    router.post('/create',createData);
    //delete Data
    router.delete('/delete/:id',deleteData);
    //update data
    router.put('/update/:id',updateData);

    module.exports = router;