//This file is the router that tells the database controller to execute

const router = require('express').Router();
const  mongoose = require('mongoose');
const {FindEveryWarehouse, CreateWarehouse, DeleteWarehouse, UpdateWarehouse } = require('../controller/WarehouseController');
const Warehouse = require('../model/WarehouseModel');

//GET all warehouses
//GET http://localhost:9000/warehouse
router.get('/', async(req, res)=>{
    const AllWarehouse = await FindEveryWarehouse();
    res.json(AllWarehouse);
});

//Create a new warehouse
//POST http://localhost:9000/warehouse  {JSON in body}
router.post('/', async (req,res)=>{
    try{
        const NewWarehouse = await CreateWarehouse(req.body);
        res.status(201).json(NewWarehouse);
    }
    catch(err){
        //Proper backend validation to be included in a future update. Mainly front-end for now.
        console.error(err);
        res.status(err?.status ?? 500).json(err); //?  → return null if it's empty
    }
});

//Delete a warehouse
//DELETE http://localhost:9000/warehouse/{id} 
router.delete('/:id', async(req,res)=>{
    try{
        const DoomedWarehouse = await DeleteWarehouse(req.params.id);
        res.statusMessage = `Delete Warehouse ${req.params.id} Successful`;  //Give confirmation that the correct deletion was succesful
        res.status(200).json(DoomedWarehouse);
    }
    catch(err){
        res.status(err?.status ?? 500).json(err);
    }
});

//Update a warehouse
//PUT http://localhost:9000/warehouse/{id} 
router.put('/:id', async(req,res)=>{
    try{
        const FreshWarehouse = await UpdateWarehouse(req.params.id, req.body);
        res.statusMessage = `Update Warehouse ${req.params.id} Successful`;  //Give confirmation that the correct update was succesful
        res.status(200).json(FreshWarehouse);
    }
    catch(err){
        res.status(err?.status ?? 500).json(err);
    }
});



module.exports = router;