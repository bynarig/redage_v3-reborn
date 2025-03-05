import React from 'react';

import RentCar from '../pages/business/rentcar/index';

const body = document.querySelector('body');
// @ts-ignore
body.style.background = "black";


const test: React.FC = () => {

    // @ts-ignore
    return (
        <>
            <RentCar />

        </>
    )


};

export default test;