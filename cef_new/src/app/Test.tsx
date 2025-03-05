import React from 'react';
import Donate from "#/pages/donate/main";
import DonateMainMenu from "#/pages/donate/main";

const body = document.querySelector('body');
// @ts-ignore
body.style.background = "black";


const test: React.FC = () => {

    // @ts-ignore
    return (
        <>
            <DonateMainMenu/>

        </>
    )


};

export default test;