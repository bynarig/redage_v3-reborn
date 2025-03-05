import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { translateText } from '#shared/locale';
import { executeClientAsync } from '#/shared/api/rage';
import { format } from '#/shared/api/formatter';
import { RootState } from '#/shared/store';

interface UniqueProps {
  setView: (view: string) => void;
  setPopup: (popup: string, data?: any) => void;
}

interface ItemData {
  id: number;
  name: string;
  price: number;
  image?: string;
  desc?: string;
  list?: string[];
}

interface ItemListType {
  packages: Record<string, ItemData> | false;
  cases: Record<string, ItemData> | false;
}

const Unique: React.FC<UniqueProps> = ({ setView, setPopup }) => {
  const accountUnique = useSelector((state: RootState) => state.account.unique);
  const [itemList, setItemList] = useState<ItemListType>({
    packages: false,
    cases: false
  });
  const [selectListId, setSelectListId] = useState<ItemData | null>(null);
  const [isBuy, setIsBuy] = useState<boolean>(false);

  const getUnique = () => {
    if (accountUnique) {
      const getData = accountUnique.split("_");
      if (itemList[getData[0] as keyof ItemListType] && 
          (itemList[getData[0] as keyof ItemListType] as Record<string, ItemData>)[getData[1]]) {
        setSelectListId((itemList[getData[0] as keyof ItemListType] as Record<string, ItemData>)[getData[1]]);
        setIsBuy(Number(getData[2]) === 1);
      } else {
        setIsBuy(true);
      }
    } else {
      setIsBuy(true);
    }
  };

  useEffect(() => {
    executeClientAsync("donate.getPack").then((result) => {
      if (result && typeof result === "string") {
        setItemList(prev => ({ 
          ...prev, 
          packages: JSON.parse(result) 
        }));
        getUnique();
      }
    });

    executeClientAsync("donate.roulette.getList").then((result) => {
      if (result && typeof result === "string") {
        setItemList(prev => ({ 
          ...prev, 
          cases: JSON.parse(result).caseData 
        }));
        getUnique();
      }
    });
  }, []);

  useEffect(() => {
    if (itemList.cases && itemList.packages) {
      getUnique();
    }
  }, [itemList, accountUnique]);

  const onSelectMenu = () => {
    getUnique();
    if (isBuy) {
      return window.notificationAdd(4, 9, `Вы уже использовали данное предложение`, 3000);
    }
    
    const getList = accountUnique.split("_")[0];
    if (getList === "cases") {
      setView("Cases");
    } else {
      setPopup("PopupDpPopup", selectListId);
    }
  };

  if (!itemList.cases || !itemList.packages || !selectListId) {
    return null;
  }

  const uniqueType = accountUnique.split("_")[0];

  return (
    <div className={`main-menu__header-element bg-gray-700/50 p-4 rounded-lg relative ${isBuy ? 'opacity-50' : ''}`}>
      <div className="main-menu__star-block flex-shrink-0">
        {uniqueType === "cases" ? (
          <div 
            className="star-img w-16 h-16 bg-contain bg-no-repeat bg-center"
            style={{ backgroundImage: `url(${document.cloud}img/roulette/${selectListId.image}.png)` }}
          />
        ) : (
          <div 
            className="star-img w-16 h-16 bg-contain bg-no-repeat bg-center"
            style={{ backgroundImage: `url(${document.cloud}donate/personal/${selectListId.id + 1}.png)` }}
          />
        )}
      </div>
      <div className="main-menu__element-info ml-4">
        <div className="main-menu__timer-box mb-2">
          <div className="main-menu__timer bg-yellow-500/80 text-black text-xs font-medium px-3 py-1 rounded inline-block">
            {translateText('donate', 'Предложение дня')} (-30%)
          </div>
        </div>
        <div className="main-menu__title text-white font-bold mb-1">{selectListId.name}</div>
        
        {selectListId.list ? (
          <div className="main-menu__paragraph text-sm text-white/80">
            {selectListId.list.map((text, index) => (
              <div key={index}><b>- </b>{text}</div>
            ))}
          </div>
        ) : selectListId.desc ? (
          <div className="main-menu__paragraph text-sm text-white/80">{selectListId.desc}</div>
        ) : null}
        
        <button
          className="mt-2 px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 rounded text-white text-sm hover:from-red-700 hover:to-red-800 transition"
          onClick={onSelectMenu}
        >
          {translateText('donate', 'Купить за')} {format("money", Math.round(selectListId.price * 0.7))} RB
        </button>
      </div>
    </div>
  );
};

export default Unique;