import axios from 'axios';
import { useState, useEffect } from 'react';
import { ListWarehouse } from '../Components/ListWarehouses';


export const MainPage=()=>{

    const [ShowWarehouses, ToggleShowWarehouses] = useState(false);

    return(<>
    <button onClick={()=> ToggleShowWarehouses(!ShowWarehouses) }>Show Warehouses</button>
    {ShowWarehouses && <> <ListWarehouse /></>}
    </>)
}