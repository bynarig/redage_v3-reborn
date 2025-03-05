import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { translateText } from '#/shared/locale';
import { executeClient } from '#/shared/api/rage';
import { ItemType, ItemId, itemsInfo } from '#/shared/data/itemsInfo';
import { getPng } from './getPng';

// Define interfaces for component types
interface BusinessMenuItem {
  id?: string;
  Id?: number;
  Name: string;
  ItemId: number;
  Price?: string;
  Data?: string;
}

const BusinessMenu: React.FC = () => {
  // State variables
  const [title, setTitle] = useState<string>('');
  const [titleIcon, setTitleIcon] = useState<string>('');
  const [btn, setBtn] = useState<string>('');
  const [elements, setElements] = useState<BusinessMenuItem[]>([]);
  const [type, setType] = useState<number>(0);
  
  const dispatch = useDispatch();

  // Config images array
  const configImages = [
    { name: 'Сим-карта', url: 'inventoryItems/items/sm-icon-sim.png' },
    { name: 'Рабочий топор', url: 'inventoryItems/items/244.png' },
    // ... all the other image configs
    { name: 'Камера видеонаблюдения', url: 'inventoryItems/items/383.png' },
  ];

  const getOtherImageUrl = (name: string): string => {
    const ind = configImages.findIndex(x => x.name === name);
    const url = document.cloud + configImages[ind].url;
    return url;
  };

  const getTypeName = (type: number): string => {
    if(!type) return `Купить`;
    else if(type === 1) return `Взять`;
    else return `Сдать`;
  };

  const clickExit = (): void => {
    executeClient('client.sm.exit');
  };

  useEffect(() => {
    // Set up the window.smOpen function
    window.smOpen = (_title: string, _titleIcon: string, _btn: string, _json: string, _type = 0) => {
      setTitle(_title);
      setTitleIcon(_titleIcon);
      setBtn(_btn);
      setElements(JSON.parse(_json));
      setType(_type);
    };

    // Event listener for key presses
    const handleKeyDown = (event: KeyboardEvent): void => {
      const { keyCode } = event;
      if (keyCode !== 27) return;
      clickExit();
    };

    window.addEventListener('keyup', handleKeyDown);
    
    // Clean up event listener
    return () => {
      window.removeEventListener('keyup', handleKeyDown);
    };
  }, []);

  return (
    <div className="bg-base-100 shadow-lg" id="shop">
      <div className="p-4 max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <div className="text-xl font-bold">
              <span className={`inline-block mr-2 ${titleIcon}`}></span>
              {title}
            </div>
          </div>
          <div>
            <button 
              className="btn btn-error" 
              onClick={clickExit}
            >
              {translateText('business', 'Выйти')}
            </button>
          </div>
        </div>
        
        <div className="mt-4">
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {elements.map((value, index) => (
              <li 
                key={index}
                id={value.id}
                className="card bg-base-200 shadow-md cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => executeClient('client.sm.click', value.Id)}
              >
                <div className="p-4">
                  <div className="font-medium" dangerouslySetInnerHTML={{ __html: value.Name }} />
                  
                  <div className="mt-2 flex justify-center">
                    {value.ItemId === 0 ? (
                      <img src={getOtherImageUrl(value.Name)} alt={value.Name} className="h-24 object-contain" />
                    ) : (
                      <img src={getPng(value, itemsInfo[value.ItemId])} alt={value.Name} className="h-24 object-contain" />
                    )}
                  </div>
                  
                  {value.Price && (
                    <div className="mt-2 text-center font-semibold">
                      {value.Price.replace(/[^\d]+/g,'')}
                      <span className="text-success"> {value.Price.replace(/[0-9]+/,'')}</span>
                    </div>
                  )}
                </div>
                <div className={`p-2 text-center ${btn} w-full rounded-b-lg font-medium`}>
                  {getTypeName(value.Name.match(/Сдать/g) ? 2 : type)}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

// For global smOpen function
declare global {
  interface Window {
    smOpen: (title: string, titleIcon: string, btn: string, json: string, type?: number) => void;
  }
}

export default BusinessMenu;