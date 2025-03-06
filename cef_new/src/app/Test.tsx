import React from 'react';




import Wanted from '#/pages/fractions/onboardcomputer';
import PoliceComputer from '#/pages/fractions/policecomputer';
import SearchReport from '#/pages/fractions/search-report';
import Stock from '#/pages/fractions/stock';
import Ticket from '#/pages/fractions/ticket';
import WeazelNews from '#/pages/fractions/weazelnews';
import HouseBuy from '#/pages/house/buy';
import HouseBuyMenu from '#/pages/house/buymenu';
import HouseFurniture from '#/pages/house/furniture';
import ParkingComponent from '#/pages/house/furniture/elements/parking';
import HouseMenu from '#/pages/house/menu';
import RealEstateAgency from '#/pages/house/rieltagency';

const body = document.querySelector('body');
// @ts-ignore
body.style.background = "black";


const test: React.FC = () => {

    // @ts-ignore
    return (
        <>
            <RealEstateAgency />

        </>
    )


};

export default test;