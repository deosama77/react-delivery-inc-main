import React from 'react';
import CustomerList from './CustomerList';

function Customer({customers , onDelete}) {
    return (
        <CustomerList customers={customers} onDelete={onDelete}/>
    );
}

export default Customer;