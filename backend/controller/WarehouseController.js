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

const DeleteWarehouse = async WarehouseID =>{
    try{
        const DoomedWarehouse = await Warehouse.findOneAndDelete({"W_ID": WarehouseID});
        if(DoomedWarehouse == null){
            throw{status: 400, msg: `No Warehouse with the id ${WarehouseID} was found`}
        }
    }
    catch(err){
        throw err;
    }
}

const UpdateWarehouse = async (WarehouseID, WarehouseEntry) =>{
    try{
        const UpdatedWarehouse = await Warehouse.findOneAndUpdate({"W_ID": WarehouseID}, WarehouseEntry);
        if(UpdatedWarehouse == null){
            throw{status: 400, msg: `No Warehouse with the id ${WarehouseID} was found`}
        }
        if(WarehouseEntry.WIDGETS.WIDGETCOUNT > UpdatedWarehouse.MAX_CAPACITY){
            throw{status: 400, msg: `Warehouse ${WarehouseID} has reached max capacity`}
        }
    }
    catch(err){
        throw err;
    }
}


module.exports = {FindEveryWarehouse, CreateWarehouse, DeleteWarehouse, UpdateWarehouse }