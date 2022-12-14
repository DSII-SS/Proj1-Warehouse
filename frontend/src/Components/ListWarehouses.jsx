import axios from 'axios';
import { useState, useEffect } from 'react';
import { DeleteWarehouse } from './DeleteWarehouse';
import { NewWarehouse } from './NewWarehouse';
import { UpdateWarehouse } from './UpdateWarehouse';

const Warehouses =({warehouse: {W_ID, W_NAME, MAX_CAPACITY, WIDGETS}})=>{

    return(
        
        <tr>
            <td>{W_ID}</td>
            <td>{W_NAME}</td>
            <td>{MAX_CAPACITY}</td>
            <td>{WIDGETS?.WIDGETCOUNT}</td>
            <td>{WIDGETS?.WIDGETDESIGNATION}</td>  
        </tr>
    )
}

export const ListWarehouse=()=>{
    
    
    const [WarehouseList, SetWarehouseList]=useState([]); //It will initialize to an empty array rather than undefined
    const [RenderUpdate, SetRenderUpdate]=useState(false);
    const [SubmitForm, SetSubmitForm]=useState(false);
    const [DeleteForm, SetDeleteForm]=useState(false);
    const [UpdateForm, SetUpdateForm]=useState(false);


    const btn1 = 'Submit New Warehouse';
    const btn2 = 'Return';
    const [BtnText, SetBtnText]=useState(false);

    useEffect(()=>{


        //Axios returns a fulfilled promise if the status code is < 400, Rejected @ >= 400
        axios.get('http://localhost:9000/warehouse')
            .then(res=>{SetWarehouseList(res.data); console.log(res.data);})
            .catch(err=> console.log(err)); //This could easily be to render an error display

        console.log(WarehouseList);

    }, []);

    //A bit of flavor to change the text of the submit button after we click it
    function GetBtnTxt(){
        if(BtnText == false){return btn1;}
        else{return btn2;}
    }

    return (
        <>        
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Warehouse_Name</th>
                    <th>Max_Capacity</th>
                    <th>Current_Capacity</th>
                    <th>Widget_Name</th>
                </tr>
            </thead>
            <tbody>
                {WarehouseList.map(warehouse => <Warehouses key={warehouse.id} warehouse={warehouse}/>)}
            </tbody>
        </table>
        <div>
            <button id='SubmitButton' onClick={() => {SetSubmitForm(!SubmitForm); SetBtnText(!BtnText)}}>{GetBtnTxt()}</button>
            {SubmitForm && <NewWarehouse SetWarehouseList={SetWarehouseList}/>}

            <button id='DeleteButton' onClick={() => {SetDeleteForm(!DeleteForm)}}>DELETE</button>
            {DeleteForm && <DeleteWarehouse SetRenderUpdate={SetRenderUpdate}/>}

            <button id='UpdateButton' onClick={() => {SetUpdateForm(!UpdateForm)}}>UPDATE</button>
            {UpdateForm && <UpdateWarehouse SetRenderUpdate={SetRenderUpdate}/>}
        </div>

        </>
    )

}