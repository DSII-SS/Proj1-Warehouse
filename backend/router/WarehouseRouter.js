//This file is the router that tells the database controller to execute

const router = require('express').Router();
const  mongoose = require('mongoose');
const {FindEveryWarehouse, CreateWarehouse } = require('../controller/WarehouseController')

//GET all warehouses
//GET http://localhost:9000/warehouse
router.get('/', async(req, res)=>{
    const AllWarehouse = await FindEveryWarehouse();
    res.json(AllWarehouse);
});

//Create a new warehouse
//POST http://localhost:9000/warehouse
router.post('/', async (req,res)=>{
    try{
        const NewWarehouse = await CreateWarehouse(req.body);
        //res.status(201).json(NewWarehouse);
    }
    catch(err){
        //Proper backend validation to be included in a future update. Mainly front-end for now.
        console.error(err);
        res.status(err?.status ?? 500).json(err); //?  → return null if it's empty
    }
});

module.exports = router;