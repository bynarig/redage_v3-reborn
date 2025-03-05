import React from 'react';
import LSCustoms from '../pages/business/lscustom/index';

const body = document.querySelector('body');
// @ts-ignore
body.style.background = "black";


const test: React.FC = () => {

    // @ts-ignore
    return (
        <>
            <LSCustoms />

        </>
    )


};

export default test;