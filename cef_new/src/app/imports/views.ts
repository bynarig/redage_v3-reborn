import ViewContainer from 'components/viewcontainer/index.svelte';
import PopupsContainer from 'components/popuscontainer/index.svelte';
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
import PlayerLicense from '#/store/player/license/index.svelte';
import PlayerPassport from '#/store/player/passport/index.svelte';
import PlayerDropinfo from '#/store/player/dropinfo/index.svelte';
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
