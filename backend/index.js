//npm init -y
//npm i express mongoose cors dotenv

//Requirements
const express = require('express');
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config();  

const app = express();
app.use(cors()); 
app.use(express.json());

//Routes
const WarehouseRouter = require('./router/WarehouseRouter');
app.use('/warehouse',WarehouseRouter);


const ConnectToMongo = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI);  
        console.log(`Connected to MongoDB`);
    }
    catch (err) {
        //Runs if it fails to connect to MongoDB
        console.error(err);
        process.exit(1);  //Instantly kills the server
    }
}

//Default to port 8080 if something else goes wrong
app.listen(process.env.PORT || 8080, () =>{
    //Callback runs right when the app starts
    console.log(`Listening on port ${process.env.PORT || 8080}`);
})



ConnectToMongo();
//npm start