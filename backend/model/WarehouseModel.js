//This file forms the schema for our warehouse entity

const mongoose = require('mongoose');
const Schema = mongoose.Schema; 

/**
 * Properties of a warehouse:
 * 
 * ID #
 * NAME ''
 * MAX_CAPACITY #
 * WIDGETS {}
 * 
 */

const WarehouseSchema = new Schema({
    
    W_ID: {
        type: Number,
        required: true
    },
    W_NAME: {
        type: String,
        required: true
    },
    MAX_CAPACITY: {
        type: Number,
        required: true
    },
    WIDGETS: {
        WIDGETCOUNT: {
            type: Number,
            default: 0
        },
        WIDGETDESIGNATION:{
            type: String,
            default: "ALPHA"
        }
    }
});

//Turning Warehouse Schema into Warehouse Model and export it
const Warehouse = mongoose.model('Warehouse', WarehouseSchema, 'WarehouseCollection');
module.exports = Warehouse;