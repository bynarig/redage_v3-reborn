import React from 'react';
import { useSelector } from 'react-redux';
import { translateText } from '#/shared/locale';
import { format } from '#/shared/api/formatter';
import { executeClient } from '#/shared/api/rage';
import { RootState } from '#/shared/store';

// Define interfaces for type safety
interface ItemData {
  id: number;
  name: string;
  desc: string;
  price: number;
  list?: string[];
}

interface DpPopupProps {
  popupData: ItemData;
  setPopup: (name: string | null, data?: any) => void;
}

const DpPopup: React.FC<DpPopupProps> = ({ popupData, setPopup }) => {
  const accountRedbucks = useSelector((state: RootState) => state.account.redbucks);
  const accountUnique = useSelector((state: RootState) => state.account.unique);

  const onBuy = () => {
    if (accountRedbucks < getPrice(popupData.price, popupData.id, accountUnique))
      return window.notificationAdd(4, 9, `Недостаточно Redbucks!`, 3000);

    setPopup(null);
    executeClient("client.donate.buy.set", popupData.id);
  };

  const getPrice = (price: number, index: number, unique: string | null) => {
    if (unique && unique.split("_")) {
      const getData = unique.split("_");
      if (getData[0] === "packages" && Number(getData[1]) === index && Number(getData[2]) === 0) {
        price = Math.round(price * 0.7);
      }
    }
    return price;
  };

  return (
    <div className="w-full">
      <div className="bg-gray-800/90 rounded-lg shadow-lg p-4">
        <div className="flex flex-col md:flex-row">
          <div className="flex-shrink-0">
            <div className="relative w-36 h-36">
              <div className="absolute inset-0 bg-contain bg-no-repeat bg-center" />
              <div 
                className="absolute inset-0 bg-contain bg-no-repeat bg-center"
                style={{ backgroundImage: `url(${document.cloud}donate/personal/${popupData.id + 1}.png)` }}
              />
            </div>
          </div>
          <div className="flex-grow md:ml-4">
            <div className="text-xl font-bold text-white mb-2">{popupData.name}</div>
            <div className="text-gray-400 mb-2">{translateText('donate', 'Что входит в набор')}?</div>
            <div className="space-y-1 mb-4">
              {popupData.list?.map((text, index) => (
                <div key={index} className="text-white text-sm"><b>- </b>{text}</div>
              ))}
            </div>
            <button 
              className="px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 rounded text-white hover:from-red-700 hover:to-red-800 transition"
              onClick={onBuy}
            >
              {translateText('donate', 'Купить за')} {format("money", getPrice(popupData.price, popupData.id, accountUnique))} RB
            </button>
          </div>
        </div>
      </div>
      <div className="mt-4 flex items-center text-gray-400">
        <div className="flex items-center space-x-2">
          <span className="inline-block bg-gray-700 rounded px-2 py-1">ESC</span>
          <div className="text-sm">{translateText('donate', 'Нажми, чтобы закрыть')}</div>
        </div>
      </div>
    </div>
  );
};

export default DpPopup;