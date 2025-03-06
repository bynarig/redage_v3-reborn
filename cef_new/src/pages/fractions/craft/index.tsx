import React, { useState, useEffect } from 'react';
import { translateText } from '#/shared/locale';
import { executeClient } from '#/shared/api/rage';
import { format } from '#/shared/api/formatter';
import weaponsinfo from '#/shared/data/weaponsinfo';
import { ENVIRONMENT } from '#/env'; // Import environment for dev mode

interface CraftProps {
  viewData?: string;
}

interface WeaponItem {
  Name: string;
  Icon: string;
  Mats: number;
}

// Mock data for development mode
const mockItems: WeaponItem[][] = [
  [
    { Name: "Pistol", Icon: "weapon-pistol", Mats: 500 },
    { Name: "Combat Pistol", Icon: "weapon-combatpistol", Mats: 750 }
  ],
  [
    { Name: "Pump Shotgun", Icon: "weapon-pumpshotgun", Mats: 1200 },
    { Name: "Sawed-Off Shotgun", Icon: "weapon-sawnoffshotgun", Mats: 1000 }
  ],
  [
    { Name: "Micro SMG", Icon: "weapon-microsmg", Mats: 1500 },
    { Name: "SMG", Icon: "weapon-smg", Mats: 1800 }
  ],
  [
    { Name: "Assault Rifle", Icon: "weapon-assaultrifle", Mats: 2500 },
    { Name: "Carbine Rifle", Icon: "weapon-carbinerifle", Mats: 2200 }
  ]
];

const mockAmmo = [10, 15, 8, 12, 20];

const FractionsCraft: React.FC<CraftProps> = ({ viewData = "[[],[]]" }) => {
  // Parse viewData with error handling
  let parsedViewData: any[] = [[], []];
  
  try {
    parsedViewData = typeof viewData === 'string' ? JSON.parse(viewData) : viewData;
  } catch (error) {
    console.error("Error parsing viewData:", error);
  }
  
  // Initialize state variables
  const [category, setCategory] = useState<string[]>(['Пистолеты', 'Дробовики', 'Пистолеты пулеметы', 'Штурмовые винтовки']);
  const [sumAmmo, setSumAmmo] = useState<number>(0);
  const [activeItemID, setActiveItemID] = useState<number>(0);
  const [activeCategory, setActiveCategory] = useState<number>(0);
  const [cntAmmo, setCntAmmo] = useState<number>(0);
  const [items, setItems] = useState<WeaponItem[][]>([]);
  const [ammo, setAmmo] = useState<number[]>([]);
  const [selectItem, setSelectItem] = useState<WeaponItem | null>(null);
  const [activeItemInfo, setActiveItemInfo] = useState<any>(null);

  // Initialize data from viewData or use mock data in development
  useEffect(() => {
    try {
      if (ENVIRONMENT === 'development' || ENVIRONMENT === 'development') {
        console.log("DEV MODE: Using mock weapon craft data");
        setItems(mockItems);
        setAmmo(mockAmmo);
        
        // Set initial selection with mock data
        if (mockItems[0] && mockItems[0][0]) {
          setSelectItem(mockItems[0][0]);
          setActiveItemInfo(weaponsinfo[mockItems[0][0].Name] || {
            damage: 3,
            ratefire: 2,
            accuracy: 4,
            range: 2,
            desc: "Mock weapon description for development."
          });
        }
      } else {
        // Production mode - use actual data
        let parsedItems: WeaponItem[][] = [[]];
        let parsedAmmo: number[] = [];
        
        try {
          parsedItems = parsedViewData[0] ? JSON.parse(parsedViewData[0]) : [[]];
        } catch (e) {
          console.error("Error parsing weapon items:", e);
          parsedItems = [[]];
        }
        
        try {
          parsedAmmo = parsedViewData[1] ? JSON.parse(parsedViewData[1]) : [];
        } catch (e) {
          console.error("Error parsing ammo data:", e);
          parsedAmmo = [];
        }
        
        setItems(parsedItems);
        setAmmo(parsedAmmo);

        // Add sniper rifles category if available
        if (parsedItems.length >= 5) {
          setCategory(prev => [...prev, 'Снайперские винтовки']);
        }

        // Set initial selection
        if (parsedItems[0] && parsedItems[0][0]) {
          setSelectItem(parsedItems[0][0]);
          setActiveItemInfo(weaponsinfo[parsedItems[0][0].Name]);
        }
      }
    } catch (error) {
      console.error("Error initializing craft data:", error);
    }
  }, [parsedViewData]);

  const onClickCategory = (id: number) => {
    setActiveCategory(id);
    setActiveItemID(0);
    setCntAmmo(0);
    setSumAmmo(0);
    
    if (items[id] && items[id][0]) {
      setSelectItem(items[id][0]);
      setActiveItemInfo(weaponsinfo[items[id][0].Name] || null);
    }
  };

  const onClickItem = (id: number) => {
    setActiveItemID(id);
    setCntAmmo(0);
    setSumAmmo(0);
    
    if (items[activeCategory] && items[activeCategory][id]) {
      setSelectItem(items[activeCategory][id]);
      setActiveItemInfo(weaponsinfo[items[activeCategory][id].Name] || null);
    }
  };

  const onBuy = () => {
    executeClient('client.craft.create', activeCategory, activeItemID);
  };

  const onBuyAmmo = () => {
    executeClient('client.craft.createAmmo', activeCategory, cntAmmo);
  };

  const Specifications = (num: number) => {
    return Array(5).fill(0).map((_, index) => (
      <li key={index} className={`w-2 h-2 rounded-full ${index < num ? 'bg-primary' : 'bg-base-content/30'}`}></li>
    ));
  };
  
  const maxAmmo = [100, 50, 300, 100, 20];

  const onHandleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = Math.round(Number(event.target.value.replace(/\D+/g, "")));
    if (value < 1) value = 0;
    
    const max = maxAmmo[activeCategory];
    if (value > max) {
      value = max;
    }
    
    setCntAmmo(value);
    setSumAmmo(Math.round(value * ammo[activeCategory]));
  };
  
  const exit = () => {
    executeClient('client.craft.close');
  };

  const getLengthFix = (length: number) => {
    let rLength = 6;
    switch (length) {
      case 7:
      case 8:
      case 9:
        rLength = 9;
        break;
      case 10:
      case 11:
      case 12:
        rLength = 12;
        break;
      case 13:
      case 14:
      case 15:
        rLength = 15;
        break;
    }
    return rLength;
  };
  
  return (
    <div className="h-screen w-screen flex items-center justify-center bg-base-100/70">
      <div className="container mx-auto p-4 bg-base-300 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-6 pb-4 border-b border-base-content/20">
          <div>
            <h2 className="text-2xl font-bold mb-2">{translateText('fractions', 'Создание Оружия')}</h2>
            <p className="text-sm opacity-80">{translateText('fractions', 'Используя материалы, можно создать любое из представленных оружий, а так же патроны к нему. Цены указаны в материалах.')}</p>
          </div>
          <button 
            className="btn btn-error" 
            onClick={exit}
          >
            {translateText('fractions', 'Выйти')}
          </button>
        </div>
        
        {/* Category Selection */}
        <div className="flex justify-center mb-6">
          {category.map((value, index) => (
            <button 
              key={index}
              onClick={() => onClickCategory(index)} 
              className={`btn mx-1 ${activeCategory === index ? 'btn-primary' : 'btn-ghost'}`}
            >
              {value}
            </button>
          ))}
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Left Side - Item List */}
          <div className="col-span-2">
            <div className="grid grid-cols-3 gap-2">
              {items[activeCategory] && Array(getLengthFix(items[activeCategory]?.length || 0)).fill(0).map((_, index) => (
                <div 
                  key={index}
                  onClick={() => items[activeCategory] && items[activeCategory][index] ? onClickItem(index) : null}
                  className={`
                    card bg-base-200 cursor-pointer border-2 transition-all
                    ${activeItemID === index ? 'border-primary' : 'border-transparent'}
                    ${!items[activeCategory] || !items[activeCategory][index] ? 'opacity-50' : ''}
                  `}
                >
                  {items[activeCategory] && items[activeCategory][index] ? (
                    <div className="card-body items-center text-center p-3">
                      <h3 className="card-title text-sm">{items[activeCategory][index].Name}</h3>
                      <div className={`my-2 w-16 h-16 flex items-center justify-center ${items[activeCategory][index].Icon}`}></div>
                      <div className="badge badge-secondary">
                        {format("money", items[activeCategory][index].Mats)} <span className="ml-1">{translateText('fractions', 'мат')}</span>
                      </div>
                    </div>
                  ) : (
                    <div className="card-body items-center justify-center">
                      {translateText('fractions', 'Пусто')}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          {/* Right Side - Item Details */}
          <div className="bg-base-200 p-4 rounded-lg">
            {selectItem && (
              <>
                <h3 className="text-lg font-bold mb-4 text-center">{selectItem.Name}</h3>
                
                <div className="mb-4">
                  <div className="mb-3">
                    <div className="flex justify-between mb-1">
                      <span>{translateText('fractions', 'Урон')}</span>
                      <div className="flex gap-1">
                        {Specifications(activeItemInfo ? activeItemInfo.damage : 0)}
                      </div>
                    </div>
                    
                    <div className="flex justify-between mb-1">
                      <span>{translateText('fractions', 'Скорострельность')}</span>
                      <div className="flex gap-1">
                        {Specifications(activeItemInfo ? activeItemInfo.ratefire : 0)}
                      </div>
                    </div>
                    
                    <div className="flex justify-between mb-1">
                      <span>{translateText('fractions', 'Точность')}</span>
                      <div className="flex gap-1">
                        {Specifications(activeItemInfo ? activeItemInfo.accuracy : 0)}
                      </div>
                    </div>
                    
                    <div className="flex justify-between mb-1">
                      <span>{translateText('fractions', 'Дальность')}</span>
                      <div className="flex gap-1">
                        {Specifications(activeItemInfo ? activeItemInfo.range : 0)}
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-sm mb-4">{activeItemInfo ? activeItemInfo.desc : "Нет описания"}</p>
                </div>
                
                <div className="divider"></div>
                
                <div className="mb-2">
                  <div className="flex justify-between">
                    <span>{translateText('fractions', 'Создать патроны')}</span>
                    <span className="text-xs opacity-70">1 {translateText('fractions', 'патрон')} = {ammo[activeCategory]} {translateText('fractions', 'м')}</span>
                  </div>
                  
                  {sumAmmo > 0 && (
                    <div className="text-right text-sm mt-1">
                      <span className="font-bold text-primary">{sumAmmo}</span> {translateText('fractions', 'Материалов')}
                    </div>
                  )}
                </div>
                
                <div className="flex mb-4">
                  <input 
                    type="text"
                    value={cntAmmo}
                    onChange={onHandleInput}
                    className="input input-bordered w-full mr-2"
                    placeholder={translateText('fractions', 'Введите кол-во патронов')}
                  />
                  <button 
                    className="btn btn-primary" 
                    onClick={onBuyAmmo}
                  >
                    {translateText('fractions', 'Создать')}
                  </button>
                </div>
                
                <button 
                  className="btn btn-success w-full"
                  onClick={onBuy}
                >
                  {translateText('fractions', 'Создать за')} {format("money", selectItem.Mats)} м.
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FractionsCraft;