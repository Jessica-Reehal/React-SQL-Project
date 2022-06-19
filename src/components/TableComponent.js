import React from 'react';
import Customer from './CustomerComponent';
import Book from './BookComponent';

const TableComponent=({view})=>{
    console.log(view);
    if(view==="Customer")
    {
        return(
            <div><Customer/></div>
        )
    }
    else
    {
        return(
            <div><Book/></div>
        )
    }
}
export default TableComponent;