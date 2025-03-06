import React, { useState, useEffect } from 'react';
import { executeClient } from '#/shared/api/rage';
import { format } from '#/shared/api/formatter';
import './main.sass';
import './fonts/style.css';
import { ItemType, itemsInfo } from '#/shared/data/itemsInfo';
import { ENVIRONMENT } from '#/env';

interface FurnitureItem {
  name: string;
  price: number;
  model: string;
  items?: {
    itemId: number;
    price: number;
  }[];
}

// Extend Window interface to add custom properties
declare global {
  interface Window {
    loaderData: {
      delay: (key: string, seconds: number) => boolean;
    };
    getItem: (itemId: number) => { Name: string };
    document?: any;
  }
}

interface HouseFurnitureProps {
  viewData?: string | FurnitureItem[];
}

// Mock data for development environment
const MOCK_FURNITURE_DATA: FurnitureItem[] = [
  {
    name: "Настенные часы",
    price: 25000,
    model: "wallclock",
    items: [
      { itemId: 90, price: 5 },
      { itemId: 93, price: 3 },
      { itemId: 96, price: 2 }
    ]
  },
  {
    name: "Диван кожаный",
    price: 120000,
    model: "leathersofa",
    items: [
      { itemId: 91, price: 10 },
      { itemId: 94, price: 5 },
      { itemId: 97, price: 8 }
    ]
  },
  {
    name: "Кухонный стол",
    price: 45000,
    model: "kitchentable",
    items: [
      { itemId: 92, price: 7 },
      { itemId: 95, price: 4 }
    ]
  },
  {
    name: "Плазменный телевизор",
    price: 180000,
    model: "tv",
    items: [
      { itemId: 90, price: 2 },
      { itemId: 93, price: 6 },
      { itemId: 96, price: 4 },
      { itemId: 97, price: 3 }
    ]
  },
  {
    name: "Кухонный гарнитур",
    price: 220000,
    model: "kitchenset",
    items: [
      { itemId: 91, price: 12 },
      { itemId: 94, price: 8 },
      { itemId: 95, price: 6 }
    ]
  },
  {
    name: "Книжный шкаф",
    price: 75000,
    model: "bookshelf",
    items: [
      { itemId: 92, price: 9 },
      { itemId: 95, price: 7 }
    ]
  }
];

// Mock item names mapping for development
const MOCK_ITEM_NAMES: Record<number, string> = {
  90: "Доска",
  91: "Кожа",
  92: "Металл",
  93: "Стекло",
  94: "Ткань",
  95: "Пластик",
  96: "Электроника",
  97: "Резина"
};

const HouseFurniture: React.FC<HouseFurnitureProps> = ({ viewData: initialViewData }) => {
  // Setup mock global objects for development environment
  useEffect(() => {
    if (ENVIRONMENT === 'development') {
      // Mock cloud URL
      if (!window.document) window.document = {};
      window.document.cloud = 'https://via.placeholder.com/';
      
      // Mock delay function
      if (!window.loaderData) {
        window.loaderData = {
          delay: (key: string, seconds: number) => true
        };
      }
      
      // Mock getItem function
      if (!window.getItem) {
        window.getItem = (itemId: number) => ({
          Name: MOCK_ITEM_NAMES[itemId] || `Item ${itemId}`
        });
      }
    }
  }, []);

  // Parse the viewData if it's a string, or use mock data in development
  const [viewData, setViewData] = useState<FurnitureItem[]>(() => {
    // Use mock data in development if no data is provided
    if (ENVIRONMENT === 'development' && !initialViewData) {
      return MOCK_FURNITURE_DATA;
    }
    
    if (!initialViewData) return [];
    
    if (typeof initialViewData === 'string') {
      try {
        return JSON.parse(initialViewData);
      } catch (error) {
        console.error('Error parsing viewData:', error);
        return ENVIRONMENT === 'development' ? MOCK_FURNITURE_DATA : [];
      }
    }
    
    return initialViewData as FurnitureItem[];
  });

  const onBuy = (furniture: FurnitureItem, type: number = 0) => {
    if (window.loaderData && !window.loaderData.delay("furniture.buy", 1)) {
      return;
    }
    
    console.log(`Buying furniture: ${furniture.name}, type: ${type}`);
    executeClient("client.furniture.buy", furniture.name, type);
  };

  const onExit = () => {
    console.log('Exiting furniture menu');
    executeClient("client.furniture.close");
  };

  // Handle keyboard events
  useEffect(() => {
    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.key === 'Escape' || event.keyCode === 27) {
        onExit();
      }
    };
    
    window.addEventListener('keyup', handleKeyUp);
    
    return () => {
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  // Function to get image URL with fallback for development
  const getImageUrl = (type: 'items' | 'furniture', id: string | number) => {
    if (ENVIRONMENT === 'development') {
      return `https://via.placeholder.com/100x100?text=${type === 'items' ? 'Item' : 'Furniture'} ${id}`;
    }
    return `${window.document?.cloud || ''}inventoryItems/${type}/${id}${type === 'items' ? '.png' : ''}`;
  };

  return (
    <div id="furniture">
      <div className="house__header">Мебельный магазин</div>
      <div className="house__furniture">
        {viewData.map((furniture, index) => (
          <div key={index} className="house__furniture_element">
            <div className="box-between">
              <div className="box-column">
                <div className="house__furniture_title">{furniture.name}</div>
                <div className="house__furniture_text money">
                  ${format ? format("money", furniture.price) : furniture.price.toLocaleString()}
                </div>
                {furniture.items && furniture.items.map((itemData, idx) => (
                  <div key={idx} className="box-flex">
                    <div 
                      className="house__furniture_smallimage" 
                      style={{ 
                        backgroundImage: `url(${getImageUrl('items', itemData.itemId)})` 
                      }}
                    ></div>
                    <div className="house__furniture_text">
                      {itemData.price} {window.getItem ? window.getItem(itemData.itemId).Name : MOCK_ITEM_NAMES[itemData.itemId] || `Item ${itemData.itemId}`}
                    </div>
                  </div>
                ))}
              </div>
              <div 
                className="house__furniture_image" 
                style={{ 
                  backgroundImage: `url(${getImageUrl('furniture', furniture.model)})` 
                }}
              ></div>
            </div>
            <div className="box-between">
              <div 
                className="house__element_button" 
                onClick={() => onBuy(furniture)}
              >
                <div className="houseicon-safe house__furniture_icon"></div>
                Купить
              </div>
              <div 
                className="house__element_button" 
                onClick={() => onBuy(furniture, 1)}
              >
                <div className="houseicon-garage house__furniture_icon"></div>
                Скрафтить самому
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="box-between" style={{ marginTop: 'auto' }}>
        <div className="house_bottom_buttons esc" onClick={onExit}>
          <div>Выйти</div>
          <div className="house_bottom_button">ESC</div>
        </div>
      </div>
    </div>
  );
};

export default HouseFurniture;