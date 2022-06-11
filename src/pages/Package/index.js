import React from 'react';
import PackageList from './PackageList';
import './Package.css';
function Package({packages , customers , setAppData }) {
    return (
        <PackageList packages={packages} customers={customers}
         setAppData={setAppData}/>
    );
}

export default Package;