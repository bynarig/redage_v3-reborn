import React from 'react';
import Donate from "#/pages/donate/main";
import DonateMainMenu from "#/pages/donate/main";
import PopupChange from '#/pages/donate/main/popup/popupchange';

const body = document.querySelector('body');
// @ts-ignore
body.style.background = "black";


const test: React.FC = () => {

    // @ts-ignore
    return (
        <>
            <PopupChange />

        </>
    )


};

export default test;