//This file is the router that tells the database controller to execute

const router = require('express').Router();
const  mongoose = require('mongoose');
const {FindEveryWarehouse } = require('../controller/WarehouseController')

//GET all warehouses
router.get('/', async(req, res)=>{
    const AllWarehouse = await FindEveryWarehouse();
    res.json(AllWarehouse);
});

module.exports = router;