import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { translateText } from '#/shared/locale';
import { executeClientAsync } from '#/shared/api/rage';
import { format } from '#/shared/api/formatter';
import { setCase } from './state';
import { RootState } from '#/shared/store';

interface CaseItem {
  index: number;
  name: string;
  desc: string;
  price: number;
  image: string;
}

interface ShopCategory {
  title: string;
  image: string;
  cases: number[];
}

interface RouletteListProps {
  setView: (view: string) => void;
}

const RouletteList: React.FC<RouletteListProps> = ({ setView }) => {
  const [isLoad, setIsLoad] = useState(false);
  const [selectIndex, setSelectIndex] = useState(0);
  const [shopList, setShopList] = useState<ShopCategory[]>([]);
  const [casesData, setCasesData] = useState<CaseItem[]>([]);
  const [caseData, setCaseData] = useState<CaseItem[]>([]);
  
  const dispatch = useDispatch();
  const accountUnique = useSelector((state: RootState) => state.account.unique);

  // Initialize data
  useEffect(() => {
    const fetchRouletteData = async () => {
      try {
        const result = await executeClientAsync("donate.roulette.getList");
        if (result && typeof result === "string") {
          const parsedData = JSON.parse(result);
          setShopList(parsedData.shopList);
          setCasesData(parsedData.caseData);
          setIsLoad(true);
        }
      } catch (error) {
        console.error("Failed to fetch roulette data:", error);
      }
    };

    fetchRouletteData();
  }, []);

  // Update displayed cases when the category changes or on initial load
  useEffect(() => {
    if (shopList.length > 0 && casesData.length > 0) {
      onSelectCases(selectIndex);
    }
  }, [shopList, casesData, selectIndex]);

  const onOpenCase = (index: number) => {
    dispatch(setCase(index));
    setView("Roulette");
  };

  const onSelectCases = (index: number) => {
    setSelectIndex(index);
    const newCaseData: CaseItem[] = [];
    if (shopList[index]) {
      shopList[index].cases.forEach((caseIndex) => {
        const cs = casesData.find(c => c.index === caseIndex);
        if (cs) {
          newCaseData.push(cs);
        }
      });
    }
    setCaseData(newCaseData);
  };

  const getPrice = (price: number, index: number, unique: string | null) => {
    if (unique && unique.split("_")) {
      const getData = unique.split("_");
      if (getData[0] === "cases" && Number(getData[1]) === index && Number(getData[2]) === 0) {
        price = Math.round(price * 0.7);
      }
    }
    return price;
  };

  if (!isLoad) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {/* Categories */}
      <div className="bg-gray-800 rounded-lg p-4">
        {shopList.map((item, index) => (
          <div 
            key={index}
            className={`flex items-center justify-between mb-3 rounded-lg p-3 cursor-pointer hover:bg-gray-700/50 transition
              ${selectIndex === index ? 'bg-gray-700/70' : ''}`}
            onClick={() => onSelectCases(index)}
          >
            <div className="flex items-center">
              <div className={`w-4 h-4 rounded-full border ${selectIndex === index ? 'border-red-500 bg-red-500' : 'border-gray-500'} mr-2`} />
              <div className="text-white">{item.title}</div>
            </div>
            <div 
              className="w-8 h-8 bg-contain bg-no-repeat bg-center"
              style={{ backgroundImage: `url(${document.cloud}img/roulette/${item.image}.png)` }}
            />
          </div>
        ))}
      </div>

      {/* Cases */}
      <div className="md:col-span-3 grid grid-cols-1 lg:grid-cols-2 gap-4">
        {caseData.map((item) => (
          <div 
            key={item.index}
            className="bg-gray-800 hover:bg-gray-700 transition rounded-lg overflow-hidden cursor-pointer"
            onClick={() => onOpenCase(item.index)}
          >
            <div className="flex p-4">
              <div 
                className="w-20 h-20 bg-contain bg-no-repeat bg-center"
                style={{ backgroundImage: `url(${document.cloud}img/roulette/${item.image}.png)` }}
              />
              <div className="ml-4 flex-grow">
                <div className="text-lg font-medium text-white">{item.name}</div>
                <div className="text-gray-400 text-sm mb-4">{item.desc}</div>
                <div className="inline-block px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 rounded text-white hover:from-red-700 hover:to-red-800 transition">
                  {translateText('donate', 'Купить за')} {format("money", getPrice(item.price, item.index, accountUnique))} RB
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RouletteList;