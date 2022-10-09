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
        const DuplicateWarehouse = await Warehouse.findOne({"W_ID": NewWarehouse.W_ID});
        if(DuplicateWarehouse){
            throw{status: 400, msg: `Duplicate Warehouse with the id ${NewWarehouse.W_ID} was found`} //Don't allow creation of warehouse with same ID
        }
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

        const CheckWarehouse = await Warehouse.findOne({"W_ID": WarehouseID});
        if(WarehouseEntry.WIDGETS.WIDGETCOUNT > CheckWarehouse.MAX_CAPACITY){
            throw{status: 400, msg: `Warehouse ${WarehouseID} has reached max capacity`} //Don't allow warehouse widgets to go above max capacity
        }
        if(CheckWarehouse == null){
            throw{status: 400, msg: `No Warehouse with the id ${WarehouseID} was found`}
        }

        //Make  sure not to give an empty widget count or name
        let FixedWarehouse = WarehouseEntry
        //console.log(FixedWarehouse.WIDGETS.WIDGETCOUNT, FixedWarehouse.WIDGETS.WIDGETDESIGNATION, CheckWarehouse.WIDGETS.WIDGETCOUNT, CheckWarehouse.WIDGETS.WIDGETDESIGNATION );
        
        //New name but no new count = keep the old count
        if(!WarehouseEntry.WIDGETS.WIDGETCOUNT && WarehouseEntry.WIDGETS.WIDGETDESIGNATION){
            //console.log('new name but no new count');
            FixedWarehouse.WIDGETS.WIDGETCOUNT = CheckWarehouse.WIDGETS.WIDGETCOUNT
        } 

        //New count but no new name = keep the old name
        if(!WarehouseEntry.WIDGETS.WIDGETDESIGNATION && WarehouseEntry.WIDGETS.WIDGETCOUNT){
            //console.log('new count but no new name');
            FixedWarehouse.WIDGETS.WIDGETDESIGNATION = CheckWarehouse.WIDGETS.WIDGETDESIGNATION
        } 

        const UpdatedWarehouse = await Warehouse.findOneAndUpdate({"W_ID": WarehouseID}, FixedWarehouse);
        
    }
    catch(err){
        throw err;
    }
}


module.exports = {FindEveryWarehouse, CreateWarehouse, DeleteWarehouse, UpdateWarehouse }