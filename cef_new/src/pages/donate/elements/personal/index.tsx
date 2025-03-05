import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { translateText } from '#/shared/locale';
import { format } from '#/shared/api/formatter';
import { executeClientAsync } from '#/shared/api/rage';
import { RootState } from '#/shared/store';

// Define interfaces for type safety
interface ItemData {
  id: number;
  name: string;
  desc: string;
  price: number;
  class?: string;
  list?: string[];
}

interface PersonalProps {
  setPopup: (name: string, data: any) => void;
}

const Personal: React.FC<PersonalProps> = ({ setPopup }) => {
  const [shopList, setShopList] = useState<ItemData[]>([]);
  const [isLoad, setIsLoad] = useState<boolean>(false);
  const accountUnique = useSelector((state: RootState) => state.account.unique);

  useEffect(() => {
    executeClientAsync("donate.getPack").then((result) => {
      if (result && typeof result === "string") {
        setShopList(JSON.parse(result));
        setIsLoad(true);
      }
    });
  }, []);

  const onToServer = (item: ItemData) => {
    setPopup("PopupDpPopup", item);
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

  if (!isLoad) {
    return null;
  }

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 gap-4">
        {shopList.map((item, index) => (
          <div key={index} className="bg-gray-700/50 p-4 rounded-lg flex">
            <div 
              className="w-16 h-16 bg-contain bg-no-repeat bg-center flex-shrink-0"
              style={{ backgroundImage: `url(${document.cloud}donate/personal/${item.id + 1}.png)` }}
            />
            <div className="ml-4 flex-grow">
              <div className="text-white font-bold mb-1">{item.name}</div>
              <div className="text-sm text-white/80 mb-2">{item.desc}</div>
              <div>
                <button 
                  className="px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 rounded text-white text-sm hover:from-red-700 hover:to-red-800 transition"
                  onClick={() => onToServer(item)}
                >
                  {translateText('donate', 'Купить за')} {format("money", getPrice(item.price, index, accountUnique))} RB
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Personal;