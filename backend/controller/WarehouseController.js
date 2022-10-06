//This file forms the controller logic for our warehouses

const Warehouse = require('../model/WarehouseModel'); //Import the Warehouse model

//Give back all of the warehouses
const FindEveryWarehouse = async ()=>{
    const AllWarehouse = await Warehouse.find()
    return AllWarehouse;
}


module.exports = {FindEveryWarehouse }