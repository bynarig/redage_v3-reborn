import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { translateText } from '#/shared/locale';
import { executeClient, executeClientAsync } from '#/shared/api/rage';
import { format } from '#/shared/api/formatter';
import { RootState } from '#/shared/store';
import { selectCase } from './state';

interface CaseItem {
  title: string;
  color: string;
  image: string;
}

interface CaseData {
  index: number;
  price: number;
  items: CaseItem[];
}

const Roulette: React.FC = () => {
  const [isLoad, setIsLoad] = useState(false);
  const [caseData, setCaseData] = useState<CaseData>({ index: 0, price: 0, items: [] });
  const [antiFlud, setAntiFlud] = useState(0);
  const [currentCount, setCurrentCount] = useState(1);
  const [toggledFast, setToggledFast] = useState(false);

  const accountRedbucks = useSelector((state: RootState) => state.account.redbucks);
  const accountUnique = useSelector((state: RootState) => state.account.unique);
  const selectedCase = useSelector(selectCase);

  useEffect(() => {
    const fetchCaseData = async () => {
      try {
        const result = await executeClientAsync("donate.roulette.getCase", selectedCase);
        if (result && typeof result === "string") {
          setCaseData(JSON.parse(result));
          setIsLoad(true);
        }
      } catch (error) {
        console.error("Failed to fetch case data:", error);
      }
    };

    fetchCaseData();
  }, [selectedCase]);

  const onOpen = (_toggledFast = false) => {
    if (antiFlud > new Date().getTime())
      return;
    else if (accountRedbucks < getPrice(caseData.price * currentCount, caseData.index, accountUnique))
      return window.notificationAdd(4, 9, `Недостаточно Redbucks!`, 3000);
    
    setAntiFlud(new Date().getTime() + 2500);
    setToggledFast(_toggledFast);
    executeClient("client.roullete.buy", caseData.index, currentCount);
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

  const onCurrentCount = (count: number) => {
    if (antiFlud > new Date().getTime())
      return;

    setCurrentCount(count);
  };

  if (!isLoad) return null;

  return (
    <div id="newdonate__roulette" className="w-full">
      {caseData.price > 0 && (
        <>
          <div className="text-lg font-medium text-white mb-2">
            {translateText('donate', 'Количество кейсов')}
          </div>
          <div className="flex flex-wrap gap-2 mb-4">
            {[1, 2, 3, 4, 5, 10, 25, 50, 100].map((count) => (
              <button
                key={count}
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm 
                  ${currentCount === count 
                    ? 'bg-red-600 text-white' 
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
                onClick={() => onCurrentCount(count)}
              >
                {count}
              </button>
            ))}
          </div>
        </>
      )}

      <div className="bg-gray-800 rounded-lg p-4">
        {caseData.price > 0 && (
          <div className="mb-4">
            <button
              onClick={() => onOpen()}
              className="px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 rounded text-white hover:from-red-700 hover:to-red-800 transition"
            >
              {translateText('donate', 'Купить за')} {format("money", getPrice(caseData.price * currentCount, caseData.index, accountUnique))} RB
            </button>
          </div>
        )}

        <div className="text-gray-400 mb-2">
          {translateText('donate', 'Что есть в кейсе')}?
        </div>

        <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 gap-2">
          {caseData.items.map((item, index) => (
            <div 
              key={index} 
              className={`relative rounded-md overflow-hidden aspect-square ${getColorClass(item.color)}`}
              title={item.title}
            >
              <div 
                className="absolute inset-0 bg-contain bg-no-repeat bg-center" 
                style={{ backgroundImage: `url(${document.cloud}img/roulette/${item.image}.png)` }} 
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Helper function to map color classes
const getColorClass = (color: string): string => {
  const colorMap: Record<string, string> = {
    blue: 'bg-blue-700',
    purple: 'bg-purple-700',
    pink: 'bg-pink-700',
    red: 'bg-red-700',
    orange: 'bg-orange-600',
    yellow: 'bg-yellow-500',
    green: 'bg-green-600',
    gray: 'bg-gray-600',
    // Add more color mappings as needed
  };
  
  return colorMap[color] || 'bg-gray-700';
};

export default Roulette;