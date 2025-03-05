import React from 'react';
import { useSelector } from 'react-redux';
import { translateText } from '#/shared/locale';
import { executeClient } from '#/shared/api/rage';
import { RootState } from '#/shared/store';

interface PremiumItem {
  id: number;
  name: string;
  price: number;
  img: string;
  list: string[];
}

interface PopupPremiumProps {
  popupData: PremiumItem;
  setPopup: (name: string | null, data?: any) => void;
}

const PopupPremium: React.FC<PopupPremiumProps> = ({ popupData, setPopup }) => {
  const accountSubscribe = useSelector((state: RootState) => state.account.subscribe);

  const onBuy = () => {
    setPopup(null);
    executeClient("client.donate.buy.premium", popupData.id);
  };

  const getPrice = (price: number, index: number, unique: any) => {
    if (!unique) {
      if (0 === index) {
        price = Math.round(price * 0.7);
      }
    }
    return price;
  };

  return (
    <div className="w-full max-w-2xl">
      <div className="bg-gray-800/90 rounded-lg shadow-lg p-4 hover:shadow-xl transition-shadow">
        <div className="flex flex-col md:flex-row">
          <div className="flex-shrink-0 relative w-48 h-48">
            <div className="absolute inset-0 bg-contain bg-no-repeat bg-center" />
            <div 
              className="absolute inset-0 bg-contain bg-no-repeat bg-center"
              style={{ backgroundImage: `url(${document.cloud}donate/premium/${popupData.img}.svg)` }}
            />
          </div>
          <div className="flex-grow md:ml-4">
            <div className="text-xl font-bold text-white mb-2">{popupData.name}</div>
            <div className="text-gray-400 mb-2">{translateText('donate', 'Что входит в набор')}?</div>
            <div className="space-y-1 mb-4">
              {popupData.list.map((text, index) => (
                <div key={index} className="text-white text-sm"><b>- </b>{text}</div>
              ))}
            </div>
            <button
              className="px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 rounded text-white hover:from-red-700 hover:to-red-800 transition"
              onClick={onBuy}
            >
              {translateText('donate', 'Купить за')} {getPrice(popupData.price, popupData.id, accountSubscribe)} RB
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

export default PopupPremium;