import React from 'react';


import FractionClothes from '../pages/fractions/clothes/index';

const body = document.querySelector('body');
// @ts-ignore
body.style.background = "black";


const test: React.FC = () => {

    // @ts-ignore
    return (
        <>
            <FractionClothes />

        </>
    )


};

export default test;