const express = require('express');
const PORT =5000;
const app = express();
const cors = require('cors');
const{getData} = require('./controller/DataController')
const data = require('./routes/dataRoutes');
app.use(cors());
app.use(express.json());
app.use(data)

    
app.listen(PORT,()=>{
    console.log(`server is running on : http://localhost:${PORT}`)
});

