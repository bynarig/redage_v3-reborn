import React from 'react';




import Wanted from '#/pages/fractions/onboardcomputer';
import PoliceComputer from '#/pages/fractions/policecomputer';

const body = document.querySelector('body');
// @ts-ignore
body.style.background = "black";


const test: React.FC = () => {

    // @ts-ignore
    return (
        <>
            <PoliceComputer />

        </>
    )


};

export default test;