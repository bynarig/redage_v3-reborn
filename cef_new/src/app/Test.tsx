import React from 'react';
import ClothesShop from "#/pages/business/clothes";
import BusinessMenu from "src/pages/business/menu-unneeded";
import WeaponShop from "#/pages/business/weaponshop";
import HorseBetting from "#/pages/casino/horse";
// import {useDispatch, useSelector} from 'react-redux';
// import {RootState} from '#/shared/store'; // Adjust path as needed
// import {executeClient} from '#/shared/api/rage'
// import '#/advertisement';
// import '#/store/assets/css/main.js';
// import '#/store/assets/fonts/main.js';
// import 'components/rangeslider/main.css'
// import 'api/events'
// import {charIsPet} from 'store/chars'
// import {inVehicle, isInputToggled} from 'store/hud';
// import {storeAnimBind} from 'store/animation'
// import {newsData} from 'store/news'

// import ViewContainer from '#/shared/ui/viewcontainer';
// import PopupsContainer from '#/shared/ui/popuscontainer';
// import FadeContainer from '#/shared/ui/fadecontainer';
// import PlayerHud from '#/store/player/hudevo';
// import PlayerGameMenu from '#/store/player/menu/index.svelte';
// import FilterBlur from './components/filterblur/index.svelte';
// import {setIsInputToggled} from "#/shared/store/hud";
// import {setView} from "#/app/router";
// import Views from "#/app/imports/views";
// import Popups from "#/app/imports/popups";
// import mockInitData from "#/shared/data/mockInitData";

//window.router.setView("PlayerAuthentication")
// window.router.setHud()
// window.router.setView("FractionsCreate")
// window.router.close()
// window.router.updateStatic("PlayerGameMenu");
const body = document.querySelector('body');
// @ts-ignore
body.style.background = "black";
// window.FadeScreen(false, 0);
// window.initCustomizations();
// for (let i = 0; i < 9; i++)
//     window.chat.addMessage(i + " test тектс тектс тектс тектс тектс тектс тектс тектс тектс тектс тектс тектс тектс тектс тектс тектс")


const test: React.FC = () => {
//     const isMultiplayer = window.mp && window.mp.events;
//     const router = useSelector((state: RootState) => state.router);
//     const inVehicle = useSelector((state: RootState) => state.player.inVehicle);
//     const isInputToggledState = useSelector((state: RootState) => state.input.isInputToggled);
//     const keys = useSelector((state: RootState) => state.keys.keys);
//     const storeAnimBind = useSelector((state: RootState) => state.animation.storeAnimBind);
//     const charIsPet = useSelector((state: RootState) => state.player.charIsPet);
//
//     const dispatch = useDispatch();
//
//     const [isKeyBind, setIsKeyBind] = useState<number>(-1);
//     const [isKeyBindUse, setIsKeyBindUse] = useState<boolean>(false);
//     const [isKeyDown, setIsKeyDown] = useState<boolean>(false);
//     const [fastClickData, setFastClickData] = useState<{ [key: string]: number }>({});
//
//     const keyToBind: { [key: number]: number } = {
//         48: 9,
//         49: 0,
//         50: 1,
//         51: 2,
//         52: 3,
//         53: 4,
//         54: 5,
//         55: 6,
//         56: 7,
//         57: 8,
//     };
//
//     useEffect(() => {
//         executeClient('client:OnBrowserInit');
//         if (!isMultiplayer) {
//             const body = document.querySelector('body') as HTMLElement;
//             body.style.background = 'black';
//             window.FadeScreen(false, 0);
//             window.initCustomizations();
//             window.events.callEvent("cef.inventory.InitData", '{"accessories":[{"SqlId":5976,"ItemId":-4,"Count":1,"Data":"83_1_True","Index":9,"Price":0},{"SqlId":5972,"ItemId":-6,"Count":1,"Data":"79_0_True","Index":13,"Price":0}],"inventory":[{"SqlId":5971,"ItemId":100,"Count":1,"Data":"15_3_True","Index":0,"Price":0},{"SqlId":5970,"ItemId":-12,"Count":1,"Data":"13_6_True","Index":1,"Price":0},{"SqlId":5978,"ItemId":-11,"Count":1,"Data":"107_2_True","Index":8,"Price":0},{"SqlId":5995,"ItemId":229,"Count":1,"Data":"419","Index":23,"Price":0}],"fastSlots":[{"SqlId":5997,"ItemId":230,"Count":1,"Data":"","Index":1,"Price":0},{"SqlId":6005,"ItemId":263,"Count":1,"Data":"","Index":2,"Price":0},{"SqlId":6006,"ItemId":263,"Count":1,"Data":"","Index":3,"Price":0}]}', true)
//             // dispatch(setIsHudNewPhone(true));
// window.events.callEvent("cef.inventory.InitOtherData", 10, 1, {mockInitData})
//             for (let i = 0; i < 9; i++)
//                 window.chat.addMessage(
//                     i +
//                     ' test тектс тектс тектс тектс тектс тектс тектс тектс тектс тектс тектс тектс тектс тектс тектс тектс'
//                 );
//
//             dispatch(setIsInputToggled(true));
//         } else {
//             // @ts-ignore
//             dispatch(setView('PlayerAuthentication'));
//         }
//     }, [dispatch, isMultiplayer]);
//
//     const SetBindToKey = (key: number) => {
//         if (key === -1) setIsKeyDown(false);
//         else setIsKeyDown(true);
//
//         setIsKeyBind(key);
//
//         executeClient('setBindToKey', key);
//     };
//
//     const FastClick = (key: string, awaitFunc: () => void, Func: () => void) => {
//         if (fastClickData[key]) {
//             clearTimeout(fastClickData[key]);
//             const newData = {...fastClickData};
//             delete newData[key];
//             setFastClickData(newData);
//             Func();
//         } else {
//             const timeoutId = setTimeout(() => {
//                 const newData = {...fastClickData};
//                 delete newData[key];
//                 setFastClickData(newData);
//                 awaitFunc();
//             }, 250);
//             setFastClickData({...fastClickData, [key]: timeoutId});
//         }
//     };
//
//     const handleKeydown = (event: KeyboardEvent) => {
//         if (!router.PlayerHud) return;
//         else if (inVehicle || isInputToggledState) return;
//         const {keyCode} = event;
//
//         if (isKeyBind !== -1) {
//             if (isKeyBind === keys[8]) {
//                 if (storeAnimBind) {
//                     for (let i = 0; i < 11; i++) {
//                         if (
//                             keyCode === 48 + i &&
//                             storeAnimBind[keyToBind[48 + i]] &&
//                             storeAnimBind[keyToBind[48 + i]].split('_')
//                         ) {
//                             executeClient('client.animation.play', storeAnimBind[keyToBind[48 + i]]);
//                             setIsKeyBindUse(true);
//                             SetBindToKey(-1);
//                             return;
//                         }
//                     }
//                 }
//             } else if (isKeyBind === keys[55] && keyCode === keys[55]) {
//                 // dispatch(setIsAnimal(false));
//                 executeClient('client.pet.isUse', false);
//                 SetBindToKey(-1);
//             }
//         } else {
//             if (isKeyDown) return;
//
//             if (keyCode === keys[8]) {
//                 setIsKeyBindUse(false);
//                 SetBindToKey(keys[8]);
//             } else if (keyCode === 32) {
//                 executeClient('client.animation.stop');
//             } else if (charIsPet && keyCode === keys[55]) {
//                 // dispatch(setIsAnimal(true));
//                 executeClient('client.pet.isUse', true);
//                 SetBindToKey(keys[55]);
//             }
//         }
//     };
//
//     const handleKeyup = (event: KeyboardEvent) => {
//         if (!isKeyDown) return;
//
//         if (!router.PlayerHud) return;
//         else if (inVehicle || isInputToggledState) return;
//
//         const {keyCode} = event;
//
//         if (keyCode === keys[8]) {
//             SetBindToKey(-1);
//             if (!isKeyBindUse) {
//                 executeClient('client.animation.open');
//             }
//         }
//     };

    // @ts-ignore
    return (
        <>
            <HorseBetting/>
            {/*<div*/}
            {/*    onKeyDown={handleKeydown}*/}
            {/*    onKeyUp={handleKeyup}*/}
            {/*    tabIndex={0}*/}
            {/*    style={{outline: 'none'}}*/}
            {/*>*/}
            {/*    <FadeContainer/>*/}
            {/*    <ViewContainer*/}
            {/*        visible={Popups[router.popup]}*/}
            {/*        opacity={router.opacity && router.popup !== 'PopupCamera' ? 1 : 0}*/}
            {/*    >*/}
            {/*        {Views[router.view] && <Views[router.view] viewData={router.viewData} />}*/}
            {/*            <PlayerGameMenu visible={router.PlayerGameMenu} />*/}
            {/*    <PlayerHud visible={router.PlayerHud}/>*/}
            {/*</ViewContainer>*/}

            {/*<PopupsContainer visible={Popups[router.popup]} opacity={router.opacity}>*/}
            {/*    {Popups[router.popup] && (*/}
            {/*        <Popups[router.popup]*/}
            {/*        popupData={router.popupData}*/}
            {/*        popupFunc={router.popupFunc}*/}
            {/*        />*/}
            {/*        )}*/}
            {/*</PopupsContainer>*/}
            {/*</div>*/}
        </>
    )


};

export default test;