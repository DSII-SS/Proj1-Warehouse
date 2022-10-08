import { useState } from "react";
import axios from "axios";

export const DeleteWarehouse=({SetWarehouseList})=>{

    const [DoomedWarehouse, SetDoomedWarehouse] = useState('')
    //const [RenderPlease, SetRenderPlease] = useState(true)

    const RemoveWarehouse = async (event)=>{
        //event.preventDefault();

        try{
            const res = await axios.delete(`http://localhost:9000/warehouse/${DoomedWarehouse}`)
            SetWarehouseList(DoomedWarehouse => [...DoomedWarehouse, res.data]);
            //SetRenderPlease()
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