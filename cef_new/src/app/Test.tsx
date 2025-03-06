import React from 'react';


import FractionsCraft from "#/pages/fractions/craft"

const body = document.querySelector('body');
// @ts-ignore
body.style.background = "black";


const test: React.FC = () => {

    // @ts-ignore
    return (
        <>
            <FractionsCraft />

        </>
    )


};

export default test;