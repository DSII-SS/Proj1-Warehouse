import { useState } from "react";
import axios from "axios";

export const NewWarehouse=({SetWarehouseList})=>{
    
    
    const [WarehouseData, SetWarehouseData] = useState({
        whID: null,
        whNAME: '',
        whMAX: null,
        whWIDGET_COUNT: null,
        whWIDGET_NAME: ''
    });

    /**
     * Users will be able to input at time of creation:
     * Warehouse ID
     * Warehouse Name
     * Max Capacity for this warehouse
     * The name of the widget for that warehouse
     */
    const SubmitWarehouse = async (event)=>{
        event.preventDefault();
        console.log(WarehouseData);
        try{ 
            const res = await axios.post('http://localhost:9000/warehouse', {
                W_ID: WarehouseData.whID,
                W_NAME: WarehouseData.whNAME,
                MAX_CAPACITY: WarehouseData.whMAX,
                WIDGETS:{
                    WIDGETDESIGNATION: WarehouseData.whWIDGET_NAME
                }
            });

            SetWarehouseList(WarehouseData => [...WarehouseData, res.data])
        }
        catch(err){
            console.log(err);
        }
    }
    
    return(
        <form onSubmit={SubmitWarehouse}>
            <div>
                <div>
                    <label htmlFor="whID-box">ID: </label>
                    <input 
                        id="whID-box"
                        type="number" 
                        min="0"
                        step="1"
                        placeholder="ID# Here" 
                        onChange={e => SetWarehouseData({...WarehouseData, whID: e.target.value})}
                        value={WarehouseData.whID}
                    />
                    <label htmlFor="whNAME-box">Name: </label>
                    <input 
                        id="whNAME-box"
                        type="text" 
                        placeholder="Warehouse Name Here" 
                        onChange={e => SetWarehouseData({...WarehouseData, whNAME: e.target.value})}
                        value={WarehouseData.whNAME}
                    />
                    <label htmlFor="whMAX-box">Maximum: </label>
                    <input 
                        id="whMAX-box"
                        type="number" 
                        min="1"
                        step="1"
                        placeholder="Maximum Capacity Here" 
                        onChange={e => SetWarehouseData({...WarehouseData, whMAX: e.target.value})}
                        value={WarehouseData.whMAX}
                    />
                </div>
                <div>
                    <label htmlFor="whWIDGET-box">Widget: </label>
                    <input 
                        id="whWIDGET-box"
                        type="text" 
                        placeholder="Widget Name Here" 
                        onChange={e => SetWarehouseData({...WarehouseData, whWIDGET_NAME: e.target.value})}
                        value={WarehouseData.whWIDGET_NAME}
                    />
                </div>
                <button>Submit</button>
            </div>
        </form>
    )
}