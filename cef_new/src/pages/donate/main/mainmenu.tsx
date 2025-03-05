import React from 'react';
import { useSelector } from 'react-redux';
import { translateText } from '#/shared/locale';
import { RootState } from '#/shared/store';
import Unique from './unique';
import UniqueNew from './unique-new';

interface MainMenuProps {
    setView: (view: string) => void;
    setPopup: (popup: string | null, data?: any) => void;
    isPopup: boolean;
}

const DonateMenu: React.FC<MainMenuProps> = ({ setView, setPopup, isPopup }) => {
    const accountRedbucks = useSelector((state: RootState) => state.account.redbucks);
    const accountUnique = useSelector((state: RootState) => state.account.unique);
    const serverDonatMultiplier = useSelector((state: RootState) => state.server.donatMultiplier);

    const menuItems = [
        {
            id: "Premium",
            name: "VIP статусы",
            description: "Получите уникальные преимущества Premium игроков",
            icon: "premium"
        },
        {
            id: "Personal",
            name: "Донат-пакеты",
            description: "Наборы из множества полезных игровых предметов",
            icon: "personal"
        },
        {
            id: "Cases",
            name: "Кейсы",
            description: "Различные наборы и специальные контейнеры",
            icon: "cases"
        },
        {
            id: "Shop",
            name: "Донат-магазин",
            description: "Смена имени/внешности, номера авто, одежда и другое",
            icon: "shop"
        }
    ];

    const onSelectView = (viewId: string) => {
        setView(viewId);
    };

    const onShowInfo = () => {
        setPopup("PopupInfo");
    };

    return (
        <div id="newdonate__main-menu" className="flex flex-col h-full">
            <div className="main-menu__top mb-6">
                <div className="main-menu__header-box bg-gray-700/50 p-4 rounded-lg">
                    <div className="main-menu__header-unique">
                        <div className="main-menu__header-title text-white/80 mb-3">
                            {translateText('donate', 'Бонусы')}:
                        </div>
                        <div className="main-menu__header-element-box flex gap-4">
                            <Unique setView={setView} setPopup={setPopup} />
                            <UniqueNew setView={setView} setPopup={setPopup} />
                        </div>
                    </div>
                </div>
            </div>

            <div className="main-menu__bottom flex-grow flex flex-col">
                <div className="main-menu__elements grid grid-cols-2 gap-4 flex-grow">
                    {menuItems.map(item => (
                        <div 
                            key={item.id}
                            className="main-menu__element bg-gray-700/50 p-4 rounded-lg cursor-pointer hover:bg-gray-600/50 transition flex items-center"
                            onClick={() => onSelectView(item.id)}
                        >
                            <div className={`main-menu__element-img ${item.icon} w-12 h-12 bg-contain bg-no-repeat mr-4`}></div>
                            <div className="main-menu__element-info">
                                <div className="main-menu__element-title text-white font-bold mb-1">
                                    {translateText('donate', item.name)}
                                </div>
                                <div className="main-menu__element-desc text-white/70 text-sm">
                                    {translateText('donate', item.description)}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="main-menu__footer mt-6 flex justify-between items-center text-sm">
                    <div 
                        className="main-menu__footer-text text-white/70 hover:text-white cursor-pointer transition"
                        onClick={onShowInfo}
                    >
                        {translateText('donate', 'Что такое RB и как его получить')}?
                    </div>
                    {serverDonatMultiplier > 1 && (
                        <div className="main-menu__footer-bonus text-yellow-500 font-bold">
                            x{serverDonatMultiplier} {translateText('donate', 'на пополнение донат-счёта')}!
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DonateMenu;