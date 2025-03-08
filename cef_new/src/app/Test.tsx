import React from 'react';

import AutoShop from '#/pages/business/autoshop/index';

const body = document.querySelector('body');
// @ts-ignore
body.style.background = "black";


const test: React.FC = () => {

    // @ts-ignore
    return (
        <>
            <AutoShop />

        </>
    )


};

export default test;