import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {translateText} from '../../../utils/lang';
import {formatMoney} from '../../../utils/formatter';
import {executeClient} from '../../../api/rage';
import {RootState} from '../../../store';
import {setSelectedView} from '../../../store/donateSlice';
import UniqueBonus from './bonus/unique';
import UniqueNew from './bonus/uniquenew';
import ShopSection from './elements/shop';
import PersonalSection from './elements/personal';
import PremiumSection from './elements/premium';
import CasesSection from './elements/roulette/list';
import RouletteSection from './elements/roulette';

// Popup components
import PopupChange from './popup/popupchange';
import PopupPremium from './elements/premium/popup';
import PopupDpPopup from './elements/personal/dpPopup';
import PopupPPopup from './elements/shop/pPopup';
import PopupCPopup from './elements/shop/cPopup';
import PopupNomer from './popup/popupnomer';
import PopupSim from './popup/popupsim';
import PopupInfo from './popup/popupinfo';
import PopupPayment from './popup/popuppayment';

type PopupType =
    | "PopupChange"
    | "PopupPremium"
    | "PopupDpPopup"
    | "PopupPPopup"
    | "PopupCPopup"
    | "PopupNomer"
    | "PopupSim"
    | "PopupInfo"
    | "PopupPayment"
    | "";

const DonateMainMenu: React.FC = () => {
    const dispatch = useDispatch();
    const serverDateTime = useSelector((state: RootState) => state.server.dateTime);
    const accountRedbucks = useSelector((state: RootState) => state.account.redbucks);
    const serverDonatMultiplier = useSelector((state: RootState) => state.server.donatMultiplier);
    const selectedView = useSelector((state: RootState) => state.donate.selectedView);

    const [isLoad, setIsLoad] = useState(false);
    const [selectPopup, setSelectPopup] = useState<PopupType>("");
    const [selectPopupData, setSelectPopupData] = useState<any>(null);
    const [areaPopup, setAreaPopup] = useState(false);

    const popups = {
        PopupChange,
        PopupPremium,
        PopupDpPopup,
        PopupPPopup,
        PopupCPopup,
        PopupNomer,
        PopupSim,
        PopupInfo,
        PopupPayment
    };

    const views = {
        MainMenu: () => (
            <div className="flex gap-8">
                <div className="w-1/2">
                    <UniqueBonus setView={setView} setPopup={handleSetPopup}/>
                </div>
                <div className="w-1/2">
                    <UniqueNew setPopup={handleSetPopup}/>
                </div>
            </div>
        ),
        Shop: ShopSection,
        Personal: PersonalSection,
        Premium: PremiumSection,
        Cases: CasesSection,
        Roulette: RouletteSection
    };

    const handleSetPopup = (popup: PopupType | null = null, data: any = null) => {
        if (popup === "-1" && areaPopup) return;

        setSelectPopupData(data);
        setSelectPopup(popup as PopupType);
    };

    const setView = (view: string) => {
        dispatch(setSelectedView(view));
    };

    const handleKeyDown = (event: KeyboardEvent) => {
        const {keyCode} = event;
        if (keyCode !== 27) return;

        if (selectPopup) {
            setSelectPopup("");
            setSelectPopupData(null);
        } else {
            if (selectedView === "MainMenu") {
                executeClient("client.donate.close");
            } else {
                setView("MainMenu");
            }
        }
    };

    useEffect(() => {
        executeClient("client.donate.load");

        const handleData = () => {
            setIsLoad(true);
        };

        // Add event listener (equivalent to addListernEvent)
        window.addEventListener("donate.init", handleData);
        window.addEventListener("keyup", handleKeyDown);

        return () => {
            window.removeEventListener("donate.init", handleData);
            window.removeEventListener("keyup", handleKeyDown);
        };
    }, []);

    if (!isLoad) {
        return null;
    }

    // Format time and date
    const formatTime = (date: Date) => {
        return new Intl.DateTimeFormat('ru-RU', {
            hour: '2-digit',
            minute: '2-digit'
        }).format(date);
    };

    const formatDate = (date: Date) => {
        return new Intl.DateTimeFormat('ru-RU', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        }).format(date);
    };

    const CurrentView = views[selectedView as keyof typeof views];
    const CurrentPopup = selectPopup ? popups[selectPopup] : null;

    return (
        <>
            {CurrentPopup && (
                <div
                    id="newdonate__popup"
                    className={`fixed inset-0 z-50 flex items-center justify-center bg-black/70 transition-opacity ${CurrentPopup ? 'opacity-100' : 'opacity-0'}`}
                    onClick={() => handleSetPopup("-1" as PopupType)}
                >
                    <CurrentPopup
                        setPopup={handleSetPopup}
                        popupData={selectPopupData}
                        onMouseEnter={() => setAreaPopup(true)}
                        onMouseLeave={() => setAreaPopup(false)}
                    />
                </div>
            )}

            <div id="newdonate" className={`relative ${CurrentPopup ? 'popupOpened' : ''}`}>
                <div className="box-date absolute top-4 right-4">
                    <div className="box-time text-white text-right">
                        <div className="time text-2xl font-bold">{formatTime(serverDateTime)}</div>
                        <div>{formatDate(serverDateTime)}</div>
                    </div>
                </div>

                <div className="newdonate__header bg-gradient-to-r from-gray-900 to-gray-800 p-6 rounded-t-lg shadow-lg">
                    <div className="flex justify-between">
                        <div className="newdonate__header-left flex-1">
                            <div className="header__title-block flex items-center mb-4">
                                <div className="shop-img w-12 h-12 bg-contain bg-no-repeat mr-4"/>
                                <div className="newdonate__title text-2xl font-bold text-white">
                                    {translateText('donate', 'Донат-меню')}
                                </div>
                                {selectedView !== "MainMenu" && (
                                    <button
                                        className="back-button ml-6 flex items-center text-white/80 hover:text-white transition-colors"
                                        onClick={() => setView("MainMenu")}
                                    >
                                        <span className="back-img w-4 h-4 mr-2"/>
                                        <div>{translateText('donate', 'Назад')}</div>
                                    </button>
                                )}
                            </div>

                            <div className="newdonate__subtitle text-white/80 text-sm max-w-2xl">
                                {translateText('donate', 'Добро пожаловать! На этой странице представлены к приобретению за')}
                                <b className="text-red-500"> RB</b>:
                                {translateText('donate', 'кейсы, подписки, VIP-статусы, донат-пакеты, редкие вещи, смена имени/внешности, конвертация валюты и другие интересности')};
                            </div>
                        </div>

                        <div className="newdonate__header-right flex flex-col items-end justify-between">
                            <div className="newdonate__header-coins flex gap-4">
                                <div
                                    className="newdonate__header-coin bg-gray-800/50 p-3 rounded-lg cursor-pointer hover:bg-gray-700/50 transition"
                                    onClick={() => setSelectPopup("PopupInfo")}
                                >
                                    <div className="header-coin__top flex items-center gap-2 mb-1">
                                        <div className="newdonate__coin redbucks w-6 h-6 bg-contain bg-no-repeat"/>
                                        <div className="newdonate__count text-white font-bold">{formatMoney(accountRedbucks)}</div>
                                    </div>
                                    <div className="newdonate__header-info text-xs text-white/70">
                                        {translateText('donate', 'Подробнее')}
                                    </div>
                                </div>
                            </div>

                            <div className="newdonate__button mt-4">
                                <button className="bg-gradient-to-r from-red-600 to-red-700 px-6 py-3 rounded-lg shadow-lg hover:from-red-700 hover:to-red-800 transition">
                                    <div className="newdonate__button-main flex items-center gap-2">
                                        <div className="newdonate__button-text text-white font-medium">
                                            Донат в lk.redage.net
                                        </div>
                                        {serverDonatMultiplier > 1 && (
                                            <div className="newdonate__button-x2 bg-yellow-500 text-black font-bold px-2 py-1 rounded text-xs">
                                                x{serverDonatMultiplier}
                                            </div>
                                        )}
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-6 bg-gray-800">
                    <CurrentView setView={setView} setPopup={handleSetPopup} isPopup={!!CurrentPopup}/>
                </div>
            </div>
        </>
    );
};

export default DonateMainMenu;