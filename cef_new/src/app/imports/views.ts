import ViewContainer from 'components/viewcontainer/index.tsx';
import PopupsContainer from 'components/popuscontainer/index.tsx';
import FadeContainer from 'components/fadecontainer/index.tsx';
import FilterBlur from './components/filterblur/index.tsx';

//Игрока'
import PlayerBattlePass from '#/pages/player/battlepass/index.tsx';
import PlayerRentCar from '#/pages/business/rentcar/index.tsx';
import PlayerAuthentication from '#/pages/player/newauthentication/index.tsx';
import PlayerCustomization from '#/pages/player/customization/index.tsx';
import PlayerAtm from '#/pages/player/atm/index.tsx';
import PlayerBinder from '#/pages/player/binder/index.tsx';
import PlayerDocumets from '#/pages/player/documets/index.tsx';
import PlayerClothesEditor from '#/pages/player/clothesEditor/index.tsx';
import PlayerCarMarket from '#/pages/player/carmarket/index.tsx';
import PlayerHelp from '#/pages/player/help/index.tsx';
import PlayerLicense from '#/pages/player/license/index.tsx';
import PlayerPassport from '#/pages/player/passport/index.tsx';
import PlayerDropinfo from '#/pages/player/dropinfo/index.tsx';
import PlayerLift from '#/pages/player/lift/index.tsx';
import PlayerGasStation from '#/pages/business/gasStation/index.tsx';
import PlayerBreakingLock from '#/pages/player/breakingLock/index.tsx';
import PlayerTransfer from '#/pages/player/transfer/index.tsx';
import PlayerJobSelector from '#/pages/player/jobselector/index.tsx';
import PlayerReports from '#/pages/player/reports/index.tsx';

//import PlayerNewYearStats from '#/pages/player/newyearstats/index.tsx';
import PlayerAnimations from '#/pages/player/animations/index.tsx';
import PlayerOresSale from '#/pages/player/oressale/index.tsx';
import PlayerMetro from '#/pages/business/metro/index.tsx';
import PlayerWedding from '#/pages/player/wedding/index.tsx';
import PlayerTickets from '#/pages/player/tickets/index.tsx';
import PlayerRestart from '#/pages/player/restart/index.tsx';

//Администрации
//import AdminPlayersView from '#/pages/admin/playersView/index.tsx';
//import AdminReport from '#/pages/admin/report/index.tsx';
//Бизнес
import BusinessAutoShop from '#/pages/business/autoshop/index.tsx';
import BusinessWeaponShop from '#/pages/business/weaponshop/index.tsx';
import BusinessPetShop from '#/pages/business/petshop-untoched/index.tsx';
import BusinessMenu from '#/pages/business/menu-unneeded/index.tsx';
import BusinessNewPetShop from '#/pages/business/newpetshop-utouched/index.tsx';
import BusinessClothes from '#/pages/business/clothes/index.tsx';

//Фракции
// /import FractionsAdverts from '#/pages/fractions/adverts/index.tsx';
import FractionsBSearch from '#/pages/fractions/search-report/index.tsx';
import FractionsMats from '#/pages/fractions/mats/index.tsx';
import FractionsCraft from '#/pages/fractions/craft/index.tsx';
import FractionsCreate from '#/pages/fractions/create/index.tsx';
import FractionsStock from '#/pages/fractions/stock/index.tsx';
import FractionsPolicecomputer from '#/pages/fractions/policecomputer/index.tsx';
import FractionsTicket from '#/pages/fractions/ticket/index.tsx';
import FractionsBortovoi from '#/pages/fractions/onboardcomputer/index.tsx';
import FractionsWeazelNews from '#/pages/fractions/weazelnews/index.tsx';
import FractionsWar from '#/pages/fractions/war/index.tsx';

//Казино
import CasinoBlackjack from '#/pages/casino/blackjack/index.tsx';
import CasinoHorse from '#/pages/casino/horse/index.tsx';
import CasinoJacpot from '#/pages/casino/jacpot/index.tsx';
import CasinoRoullete from '#/pages/casino/roullete/index.tsx';

import VehicleAir from '#/pages/business/air/index.tsx';
import VehicleLsCustom from '#/pages/business/lscustom/index.tsx';

//Games
import GamesOtherMain from '#/pages/games/other/index.tsx';
import GamesOtherMafia from '#/pages/games/other/mafia/index.tsx';
import GamesOtherLobby from '#/pages/games/other/lobby/index.tsx';

//
import DonateMain from '#/pages/donate/main/index.tsx';
//import DonateCards from '#/pages/donate/cards/index.tsx';
import DonateSapper from '#/pages/donate/sapper/index.tsx';


import QuestsDialog from '#/pages/player/quests/dialog/index.tsx';

//import QuestsDialog1 from '#/pages/quests/questsnew/questsnewdialog/index.tsx';
//import QuestsDialog2 from '#/pages/quests/questsnew/questsnewlist/index.tsx';
//import QuestsDialog3 from '#/pages/quests/questsnew/questsprise/index.tsx';
import EventsValentine from '#/pages/events-untouched/valentine/index.tsx';

//House
import HouseMenu from '#/pages/house/menu/index.tsx';
import HouseRielt from '#/pages/house/rieltagency/index.tsx';
import HouseBuy from '#/pages/house/buymenu/index.tsx';
import HouseFurniture from '#/pages/house/furniture/index.tsx';

let Views;
export default Views = {
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
