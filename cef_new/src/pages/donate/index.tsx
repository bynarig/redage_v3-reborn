import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {translateText} from '#/shared/locale';
import {executeClient} from '#/shared/api/rage';
import {RootState} from '#/shared/store';
// Import the action
import { setSelectedView } from '#/shared/store/donate';

// Import components
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
        if (popup == "-1" && areaPopup) return;

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
                {/* Rest of your component remains the same */}
                {/* ... */}
            </div>
        </>
    );
};

export default DonateMainMenu;