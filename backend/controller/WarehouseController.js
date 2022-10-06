//This file forms the controller logic for our warehouses

const Warehouse = require('../model/WarehouseModel'); //Import the Warehouse model

//Give back all of the warehouses
const FindEveryWarehouse = async ()=>{
    const AllWarehouse = await Warehouse.find()
    return AllWarehouse;
}

//Create a new warehouse
const CreateWarehouse = async WarehouseSpecs =>{
    try{
        const NewWarehouse = new Warehouse(WarehouseSpecs);
        await NewWarehouse.save();
        return NewWarehouse;
    }
    catch(err){
        throw err;
    }
}


module.exports = {FindEveryWarehouse, CreateWarehouse }