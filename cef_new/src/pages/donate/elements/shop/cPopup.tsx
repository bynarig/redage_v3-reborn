import React from 'react';
import { useSelector } from 'react-redux';
import { translateText } from '#/shared/locale';
import { format } from '#/shared/api/formatter';
import { executeClient } from '#/shared/api/rage';
import { RootState } from '#/shared/store';

interface ClothingItem {
  id: number;
  name: string;
  text: string;
  price: number;
  img: string;
}

interface CPopupProps {
  popupData: ClothingItem;
  setPopup: (value: null) => void;
}

const CPopup: React.FC<CPopupProps> = ({ popupData, setPopup }) => {
  const accountRedbucks = useSelector((state: RootState) => state.account.redbucks);

  const onBuy = () => {
    if (accountRedbucks < popupData.price)
      return window.notificationAdd(4, 9, `Недостаточно Redbucks!`, 3000);
    
    setPopup(null);
    executeClient("client.donate.buy.clothes", popupData.id);
  };

  return (
    <div className="w-full max-w-2xl">
      <div 
        className="bg-gray-800/90 rounded-lg shadow-lg p-4 transition-shadow hover:shadow-xl flex flex-col md:flex-row"
      >
        <div className="flex-shrink-0 relative w-48 h-48">
          <div className="absolute inset-0 bg-contain bg-no-repeat bg-center" />
          <div 
            className="absolute inset-0 bg-contain bg-no-repeat bg-center"
            style={{ backgroundImage: `url(${popupData.img})` }} 
          />
        </div>
        <div className="flex-grow md:ml-4">
          <div className="text-xl font-bold text-white mb-2">{popupData.name}</div>
          <div className="text-gray-400 mb-2">{translateText('donate', 'Что входит в набор')}?</div>
          <div className="mb-4">
            <div className="text-white text-sm">{popupData.text}</div>
          </div>
          <button
            className="px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 rounded text-white hover:from-red-700 hover:to-red-800 transition"
            onClick={onBuy}
          >
            {translateText('donate', 'Купить за')} {format("money", popupData.price)} RB
          </button>
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

export default CPopup;