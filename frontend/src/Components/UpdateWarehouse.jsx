import { useState } from "react";
import axios from "axios";

export const UpdateWarehouse=({SetWarehouseList})=>{

    //const [OldWarehouse, SetOldWarehouse] = useState('')
    const [FixedWarehouseID, SetFixedWarehouseID] = useState(0);
    const [FixedWarehouseName, SetFixedWarehouseName] = useState({
        UpdatedWarehouseName: null,
    });
    const [FixedWidgetCount, SetFixedWidgetCount] = useState({
        UpdatedWidgetCount: null,
    });
    const [FixedWidgetName, SetFixedWidgetName] = useState({
        UpdatedWidgetName: null
    });

    
    const UpdateWarehouse = async (event)=>{
        event.preventDefault();
        console.log('In UpdateWarehouse');
        console.log(FixedWidgetCount);

        //Don't try to change an attribute if the field is empty in the submit form
        //Do we want to update the inventory of widgets?
        if(FixedWidgetCount){
            try{
                console.log('In the try');
                const res = await axios.put(`http://localhost:9000/warehouse/${FixedWarehouseID}`,{
                    WIDGETS:{
                        WIDGETCOUNT: FixedWidgetCount
                    }
                })
                SetWarehouseList(FixedWidgetCount => [...FixedWidgetCount]);
                console.log('Through the try');
            }
            catch(err){console.log(err)}
            
        }
        // //Do we want to update the warehouse name?
        // if(FixedWarehouseName){
        //     try{
        //         const res = await axios.put(`http://localhost:9000/warehouse/${FixedWarehouseID}`,{
        //             W_NAME : FixedWarehouseName.UpdatedWarehouseName
        //         })
        //         SetWarehouseList(FixedWarehouseName => [...FixedWarehouseName, res.data]);
        //     }
        //     catch(err){console.log(err)}
            
        // }
        
        // //Do we want to update the name of the warehouse widgets?
        // if(FixedWidgetName){
        //     try{
        //         const res = await axios.put(`http://localhost:9000/warehouse/${FixedWarehouseID}`,{
        //             WIDGETS:{
        //                 WIDGETDESIGNATION: FixedWidgetName.UpdatedWidgetName
        //             }
        //         })
        //         SetWarehouseList(FixedWidgetName => [...FixedWidgetName, res.data]);
        //     }
        //     catch(err){console.log(err)}
            
        // }
        

    }
    
    return(
        <>
            <div>
                <div>
                <label htmlFor="whID-box">ID: </label>
                <input 
                    id="whID-box"
                    type="number" 
                    min="0"
                    step="1"
                    placeholder="ID# Here" 
                    onChange={e => SetFixedWarehouseID(e.target.value)}
                    value={FixedWarehouseID}
                />
                </div>
            </div>
            <form onSubmit={UpdateWarehouse}>
                <div>
                    <div>
                    <label htmlFor="wdgCOUNT-box">New Inventory Amount: </label>
                    <input 
                        id="wdgCOUNT-box"
                        type="number" 
                        min="0"
                        step="1" 
                        placeholder="Updated Inventory Here" 
                        onChange={e => SetFixedWidgetCount(e.target.value)}
                        value={FixedWidgetCount}
                    />
                    {/* <label htmlFor="whNAME-box">New Warehouse Name: </label>
                    <input 
                        id="whNAME-box"
                        type="string" 
                        placeholder="New Name Here" 
                        onChange={e => SetFixedWarehouseName(e.target.value)}
                        value={FixedWarehouseName}
                    />
                    
                    <label htmlFor="wdgNAME-box">New Widget Name: </label>
                    <input 
                        id="wdgNAME-box"
                        type="string" 
                        placeholder="Updated Widget Here" 
                        onChange={e => SetFixedWidgetName(e.target.value)}
                        value={FixedWidgetName}
                    /> */}
                    </div>
                    <button>Submit Update</button>
                </div>
            </form>
        </>
    )
}