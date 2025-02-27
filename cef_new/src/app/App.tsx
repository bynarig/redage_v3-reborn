import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '#/shared/store'; // Adjust path as needed
import 'lang/index'
//import '#/advertisement';
import router from 'router';
import axios from 'axios';
import '#/store/assets/css/main.js';
import '#/store/assets/fonts/main.js';
import 'components/rangeslider/main.css'
import 'api/events'
import 'api/imgSave'
import 'store/customization';

import 'store/account';
import {charIsPet} from 'store/chars'
import 'store/loader';
import 'store/keys';
import {inVehicle, isInputToggled} from 'store/hud';
import 'store/quest';
import 'store/settings';
import {storeAnimBind} from 'store/animation'
import {newsData} from 'store/news'

import {executeClient} from 'api/rage'
import ViewContainer from 'components/viewcontainer/index.svelte';
import PopusContainer from 'components/popuscontainer/index.svelte';
import FadeContainer from 'components/fadecontainer/index.svelte';
import FilterBlur from './components/filterblur/index.svelte';

//Игрока'
import PlayerBattlePass from '#/store/player/battlepass/index.svelte';
import PlayerRentCar from '#/store/player/rentcar/index.svelte';
import PlayerAuthentication from '#/store/player/newauthentication/index.svelte';
import PlayerCustomization from '#/store/player/customization/index.svelte';
import PlayerAtm from '#/store/player/atm/index.svelte';
import PlayerBinder from '#/store/player/binder/index.svelte';
import PlayerDocumets from '#/store/player/documets/index.svelte';
import PlayerClothesEditor from '#/store/player/clothesEditor/index.svelte';
import PlayerCarMarket from '#/store/player/carmarket/index.svelte';
import PlayerHelp from '#/store/player/help/index.svelte';
import PlayerGameMenu from '#/store/player/menu/index.svelte';
import PlayerLicense from '#/store/player/license/index.svelte';
import PlayerPassport from '#/store/player/passport/index.svelte';
import PlayerDropinfo from '#/store/player/dropinfo/index.svelte';
import PlayerHud from '#/store/player/hudevo/index.svelte';
import PlayerLift from '#/store/player/lift/index.svelte';
import PlayerGasStation from '#/store/player/gasStation/index.svelte';
import PlayerBreakingLock from '#/store/player/breakingLock/index.svelte';
import PlayerTransfer from '#/store/player/transfer/index.svelte';
import PlayerJobSelector from '#/store/player/jobselector/index.svelte';
import PlayerReports from '#/store/player/reports/index.svelte';

//import PlayerNewYearStats from '#/store/player/newyearstats/index.svelte';
import PlayerAnimations from '#/store/player/animations/index.svelte';
import PlayerOresSale from '#/store/player/oressale/index.svelte';
import PlayerMetro from '#/store/player/metro/index.svelte';
import PlayerWedding from '#/store/player/wedding/index.svelte';
import PlayerTickets from '#/store/player/tickets/index.svelte';
import PlayerRestart from '#/store/player/restart/index.svelte';

//Администрации
//import AdminPlayersView from '#/store/admin/playersView/index.svelte';
//import AdminReport from '#/store/admin/report/index.svelte';
//Бизнес
import BusinessAutoShop from '#/store/business/autoshop/index.svelte';
import BusinessWeaponShop from '#/store/business/weaponshop/index.svelte';
import BusinessPetShop from '#/store/business/petshop/index.svelte';
import BusinessMenu from '#/store/business/menu/index.svelte';
import BusinessNewPetShop from '#/store/business/newpetshop/index.svelte';
import BusinessClothes from '#/store/business/clothes/index.svelte';

//Фракции
// /import FractionsAdverts from '#/store/fractions/adverts/index.svelte';
import FractionsBSearch from '#/store/fractions/bsearch/index.svelte';
import FractionsMats from '#/store/fractions/mats/index.svelte';
import FractionsCraft from '#/store/fractions/craft/index.svelte';
import FractionsCreate from '#/store/fractions/create/index.svelte';
import FractionsStock from '#/store/fractions/stock/index.svelte';
import FractionsPolicecomputer from '#/store/fractions/policecomputer/index.svelte';
import FractionsTicket from '#/store/fractions/ticket/index.svelte';
import FractionsBortovoi from '#/store/fractions/bortovoi/index.svelte';
import FractionsWeazelNews from '#/store/fractions/weazelnews/index.svelte';
import FractionsWar from '#/store/fractions/war/index.svelte';

//Казино
import CasinoBlackjack from '#/store/casino/blackjack/index.svelte';
import CasinoHorse from '#/store/casino/horse/index.svelte';
import CasinoJacpot from '#/store/casino/jacpot/index.svelte';
import CasinoRoullete from '#/store/casino/roullete/index.svelte';

import VehicleAir from '#/store/vehicle/air/index.svelte';
import VehicleLsCustom from '#/store/vehicle/lscustom/index.svelte';

//Games
import GamesOtherMain from '#/store/games/other/index.svelte';
import GamesOtherMafia from '#/store/games/other/mafia/index.svelte';
import GamesOtherLobby from '#/store/games/other/lobby/index.svelte';

//
import DonateMain from '#/store/donate/main/index.svelte';
//import DonateCards from '#/store/donate/cards/index.svelte';
import DonateSapper from '#/store/donate/sapper/index.svelte';


import QuestsDialog from '#/store/quests/dialog/index.svelte';

//import QuestsDialog1 from '#/store/quests/questsnew/questsnewdialog/index.svelte';
//import QuestsDialog2 from '#/store/quests/questsnew/questsnewlist/index.svelte';
//import QuestsDialog3 from '#/store/quests/questsnew/questsprise/index.svelte';
import EventsValentine from '#/store/events/valentine/index.svelte';

//House
import HouseMenu from '#/store/house/menu/index.svelte';
import HouseRielt from '#/store/house/rieltagency/index.svelte';
import HouseBuy from '#/store/house/buymenu/index.svelte';
import HouseFurniture from '#/store/house/furniture/index.svelte';
//Popups
import PopupInput from '#/popups/input/index.svelte';
import PopupConfirm from '#/popups/confirm/index.svelte';
import HospitalPopupConfirm from '#/popups/confirm/hospital_index.svelte';
import PopupDonate from '#/popups/donate/index.svelte';
import PopupDeath from '#/popups/death/index.svelte';
import CircleMenu from '#/popups/circle/index.svelte';
//import PopupAuth from '#/popups/auth/index.svelte';
import PopupMain from '#/popups/main/index.svelte';
import PopupSelect from '#/popups/select/index.svelte';
import PopupRoulette from '#/popups/roulette/index.svelte';
import PopupUpgrade from '#/popups/upgrade/index.svelte';
import PopupCamera from '#/popups/camera/index.svelte';
import PopupWar from '#/popups/war/index.svelte';
import {setIsInputToggled} from "#/shared/store/hud";
import {setView} from "#/app/router";

const Views = {
    PlayerBattlePass,
    //PlayerNewAuthentication,
    PlayerAuthentication,//Авторизация, выбор спавна, выбор чара
    PlayerCustomization,//кастомизация
    PlayerAtm,//Банкоматы
    PlayerBinder,//биндер
    PlayerDocumets,//Документы фракционные
    PlayerClothesEditor,//Эдитор одежды (только для тестов)
    PlayerCarMarket,// авторынок НУЖНО СДЕЛАТЬ СЕЙЧАС НЕ РАБОТАЕТ
    PlayerHelp,//Хелп
    PlayerLicense,//Лицензии
    PlayerPassport,//паспорт
    PlayerTransfer,// Перенос
    PlayerJobSelector,//Выбор работы
    PlayerReports,//Репорты
    PlayerDropinfo,//Подсказки для кнопки 'поставить'
    PlayerLift,//Лифт
    PlayerGasStation,//Заправка
    PlayerBreakingLock,//Взлом сейфа
    PlayerRentCar,//Аренда авто
    //PlayerNewYearStats,
    PlayerAnimations,
    PlayerOresSale,//Продажа руд
    PlayerMetro,
    PlayerWedding,
    PlayerTickets,
    PlayerRestart,

    BusinessAutoShop,
    BusinessWeaponShop,
    BusinessPetShop,
    BusinessMenu,//24/7, черный рынок
    BusinessNewPetShop, //новый магазин животных
    BusinessClothes,

    //FractionsAdverts,//лс невс
    FractionsBSearch, //Протокол обыска
    FractionsMats,//Материал
    FractionsCraft,//Крафт
    FractionsStock,//Склад
    FractionsPolicecomputer,
    FractionsTicket,
    FractionsBortovoi,
    FractionsWeazelNews,
    FractionsWar,
    FractionsCreate,

    CasinoBlackjack,
    CasinoHorse,
    CasinoJacpot,
    CasinoRoullete,

    //AdminPlayersView,//Не работает
    //AdminReport,

    VehicleAir,
    VehicleLsCustom,//Тюнинг

    GamesOtherMain,//Меню основных мероприятий
    GamesOtherMafia,//Игра Мафия
    GamesOtherLobby,//Меню лобби

    DonateMain,
    //DonateCards,
    DonateSapper,

    QuestsDialog,
    //QuestsDialog1,
    //QuestsDialog2,
    //QuestsDialog3,
    EventsValentine,

    HouseBuy,
    HouseMenu,
    HouseRielt,
    HouseFurniture
}

//window.router.setView("PlayerAuthentication")
window.router.setHud()
//window.router.setView("FractionsCreate")
//window.router.close()
//window.router.updateStatic("PlayerGameMenu");

const Popus = {
    PopupConfirm,
    HospitalPopupConfirm,
    PopupInput,
    PopupDeath,
    PopupDonate,
    CircleMenu,
    PopupSelect,
    PopupMain,
    PopupUpgrade,
    PopupRoulette,
    PopupCamera,
    PopupWar,
};

const App: React.FC = () => {
    const isMultiplayer = window.mp && window.mp.events;
    const router = useSelector((state: RootState) => state.router);
    const inVehicle = useSelector((state: RootState) => state.player.inVehicle);
    const isInputToggledState = useSelector((state: RootState) => state.input.isInputToggled);
    const keys = useSelector((state: RootState) => state.keys.keys);
    const storeAnimBind = useSelector((state: RootState) => state.animation.storeAnimBind);
    const charIsPet = useSelector((state: RootState) => state.player.charIsPet);

    const dispatch = useDispatch();

    const [isKeyBind, setIsKeyBind] = useState<number>(-1);
    const [isKeyBindUse, setIsKeyBindUse] = useState<boolean>(false);
    const [isKeyDown, setIsKeyDown] = useState<boolean>(false);
    const [fastClickData, setFastClickData] = useState<{ [key: string]: number }>({});

    const keyToBind: { [key: number]: number } = {
        48: 9,
        49: 0,
        50: 1,
        51: 2,
        52: 3,
        53: 4,
        54: 5,
        55: 6,
        56: 7,
        57: 8,
    };

    useEffect(() => {
        executeClient('client:OnBrowserInit');
        if (!isMultiplayer) {
            const body = document.querySelector('body') as HTMLElement;
            body.style.background = 'black';
            window.FadeScreen(false, 0);
            window.initCustomizations();
            window.events.callEvent('cef.inventory.InitData', '{');

            // dispatch(setIsHudNewPhone(true));

            for (let i = 0; i < 9; i++)
                window.chat.addMessage(
                    i +
                    ' test тектс тектс тектс тектс тектс тектс тектс тектс тектс тектс тектс тектс тектс тектс тектс тектс'
                );

            dispatch(setIsInputToggled(true));
        } else {
            // @ts-ignore
            dispatch(setView('PlayerAuthentication'));
        }
    }, [dispatch, isMultiplayer]);

    const SetBindToKey = (key: number) => {
        if (key === -1) setIsKeyDown(false);
        else setIsKeyDown(true);

        setIsKeyBind(key);

        executeClient('setBindToKey', key);
    };

    const FastClick = (key: string, awaitFunc: () => void, Func: () => void) => {
        if (fastClickData[key]) {
            clearTimeout(fastClickData[key]);
            const newData = {...fastClickData};
            delete newData[key];
            setFastClickData(newData);
            Func();
        } else {
            const timeoutId = setTimeout(() => {
                const newData = {...fastClickData};
                delete newData[key];
                setFastClickData(newData);
                awaitFunc();
            }, 250);
            setFastClickData({...fastClickData, [key]: timeoutId});
        }
    };

    const handleKeydown = (event: KeyboardEvent) => {
        if (!router.PlayerHud) return;
        else if (inVehicle || isInputToggledState) return;
        const {keyCode} = event;

        if (isKeyBind !== -1) {
            if (isKeyBind === keys[8]) {
                if (storeAnimBind) {
                    for (let i = 0; i < 11; i++) {
                        if (
                            keyCode === 48 + i &&
                            storeAnimBind[keyToBind[48 + i]] &&
                            storeAnimBind[keyToBind[48 + i]].split('_')
                        ) {
                            executeClient('client.animation.play', storeAnimBind[keyToBind[48 + i]]);
                            setIsKeyBindUse(true);
                            SetBindToKey(-1);
                            return;
                        }
                    }
                }
            } else if (isKeyBind === keys[55] && keyCode === keys[55]) {
                // dispatch(setIsAnimal(false));
                executeClient('client.pet.isUse', false);
                SetBindToKey(-1);
            }
        } else {
            if (isKeyDown) return;

            if (keyCode === keys[8]) {
                setIsKeyBindUse(false);
                SetBindToKey(keys[8]);
            } else if (keyCode === 32) {
                executeClient('client.animation.stop');
            } else if (charIsPet && keyCode === keys[55]) {
                // dispatch(setIsAnimal(true));
                executeClient('client.pet.isUse', true);
                SetBindToKey(keys[55]);
            }
        }
    };

    const handleKeyup = (event: KeyboardEvent) => {
        if (!isKeyDown) return;

        if (!router.PlayerHud) return;
        else if (inVehicle || isInputToggledState) return;

        const {keyCode} = event;

        if (keyCode === keys[8]) {
            SetBindToKey(-1);
            if (!isKeyBindUse) {
                executeClient('client.animation.open');
            }
        }
    };

   // @ts-ignore
return (
    <>
        <div
            onKeyDown={handleKeydown}
            onKeyUp={handleKeyup}
            tabIndex={0}
            style={{ outline: 'none' }}
        >
            <FadeContainer />
            <ViewContainer
                visible={Popus[router.popup]}
                opacity={router.opacity && router.popup !== 'PopupCamera' ? 1 : 0}
            >
                {Views[router.view] && <Views[router.view] viewData={router.viewData} />}
                <PlayerGameMenu visible={router.PlayerGameMenu} />
                <PlayerHud visible={router.PlayerHud} />
            </ViewContainer>

            <PopusContainer visible={Popus[router.popup]} opacity={router.opacity}>
                {Popus[router.popup] && (
                    <Popus[router.popup]
                        popupData={router.popupData}
                        popupFunc={router.popupFunc}
                    />
                )}
            </PopusContainer>
        </div>
    </>
);


};

export default App;