import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

export const DeleteWarehouse=({SetWarehouseList})=>{

    const [DoomedWarehouse, SetDoomedWarehouse] = useState(0)

    const RemoveWarehouse = async (event)=>{
        event.preventDefault();

        try{
            const res = await axios.delete(`http://localhost:9000/warehouse/${DoomedWarehouse}`)
            SetWarehouseList(dw => [...dw, res.data]);
            
        }
        catch(err){
            console.log(err);
        }
    }
    
    return(
        <form onSubmit={RemoveWarehouse}>
            <div>
                <div>
                    <label htmlFor="del-select">Warehouse #:</label>
                    <input
                        id="del-select"
                        type="number"
                        placeholder="0"
                        onChange={event => SetDoomedWarehouse(event.target.value) }
                        value={DoomedWarehouse}
                    />
                </div>
                <button>Delete This Warehouse</button>
            </div>
        </form>
    )
}