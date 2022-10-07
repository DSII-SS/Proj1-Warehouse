import axios from 'axios';
import { useState, useEffect } from 'react';

const Warehouses =({warehouse: {W_ID, W_NAME, MAX_CAPACITY, WIDGETS}})=>{

    return(
        <>
        <tr>
            <td>{W_ID}</td>
            <td>{W_NAME}</td>
            <td>{MAX_CAPACITY}</td>
            <td>{WIDGETS?.WIDGETCOUNT}</td>
            <td>{WIDGETS?.WIDGETDESIGNATION}</td>  
        </tr>
        </>
    )
}

export const ListWarehouse=()=>{
    
    //It will initialize to an empty array rather than undefined
    const [WarehouseList, SetWarehouseList]=useState([]); 

    useEffect(()=>{


        //Axios returns a fulfilled promise if the status code is < 400, Rejected @ >= 400
        axios.get('http://localhost:9000/warehouse')
            .then(res=>{SetWarehouseList(res.data); console.log(res.data);})
            .catch(err=> console.log(err)); //This could easily be to render an error display

    }, []);

    return (
        <>
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Warehouse Name</th>
                    <th>Max Capacity</th>
                    <th>Current Capacity</th>
                    <th>Widget Name</th>
                </tr>
            </thead>
            <tbody>
                {WarehouseList.map(warehouse => <Warehouses key={warehouse.id} warehouses={warehouse} />)}
            </tbody>
        </table>
        </>
    )

}