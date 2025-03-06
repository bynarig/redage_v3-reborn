import React, { useState, useEffect } from 'react';
import { executeClient } from '#/shared/api/rage';
import './main.sass';
import './fonts/style.css';

// Import components
import RieltHouse from './elements/rielt-house';
import RieltBusiness from './elements/rielt-business';
import HRieltInfo from './elements/hrielt-info';
import BRieltInfo from './elements/brielt-info';

interface ViewData {
  buyPrice: number;
  allHouse: number;
  houseData: string | any[];
  allBusiness: number;
  businessData: string | any[];
}

interface HouseOrBusinessData extends Array<string | number> {
  0: number; // ID
  1: number; // Type
  2: number; // Price
  // Other data
  typeData?: string; // Added during selection
}

// Extend Window interface for custom events

interface RealEstateAgencyProps {
  viewData?: ViewData;
}

const RealEstateAgency: React.FC<RealEstateAgencyProps> = ({ viewData: initialViewData }) => {
  // Initialize viewData with default values if not provided
  const [viewData] = useState<ViewData>(initialViewData || {
    buyPrice: 5000,
    allHouse: 0,
    houseData: [],
    allBusiness: 0,
    businessData: []
  });

  // State for selected data and view
  const [selectData, setSelectData] = useState<HouseOrBusinessData | null>(null);
  const [selectView, setSelectView] = useState<string>("RieltHouses");
  
  // Parse house and business data
  const [houseData, setHouseData] = useState<HouseOrBusinessData[]>([]);
  const [businessData, setBusinessData] = useState<HouseOrBusinessData[]>([]);

  // Parse initial house data
  useEffect(() => {
    if (viewData.houseData && typeof viewData.houseData === "string") {
      try {
        setHouseData(JSON.parse(viewData.houseData));
      } catch (error) {
        console.error("Error parsing house data:", error);
      }
    }
  }, [viewData.houseData]);

  // Parse initial business data
  useEffect(() => {
    if (viewData.businessData && typeof viewData.businessData === "string") {
      try {
        setBusinessData(JSON.parse(viewData.businessData));
      } catch (error) {
        console.error("Error parsing business data:", error);
      }
    }
  }, [viewData.businessData]);

  // Handle page updates
  const onUpdatePage = (page: string) => {
    setSelectData(null);
    setSelectView(page);
  };

  // Add new houses to the list
  const onAddHouse = (data: string) => {
    try {
      const parsedData = JSON.parse(data);
      
      if (!parsedData || !parsedData.length) {
        return;
      }
      
      setHouseData(prevHouseData => [...parsedData, ...prevHouseData]);
    } catch (error) {
      console.error("Error adding house:", error);
    }
  };

  // Add new businesses to the list
  const onAddBusiness = (data: string) => {
    try {
      const parsedData = JSON.parse(data);
      
      if (!parsedData || !parsedData.length) {
        return;
      }
      
      setBusinessData(prevBusinessData => [...parsedData, ...prevBusinessData]);
    } catch (error) {
      console.error("Error adding business:", error);
    }
  };

  // Register event handlers
  useEffect(() => {
    if (window.events) {
      window.events.addEvent("cef.rieltagency.addHouse", onAddHouse);
      window.events.addEvent("cef.rieltagency.addBusiness", onAddBusiness);
      
      return () => {
        window.events.removeEvent("cef.rieltagency.addHouse", onAddHouse);
        window.events.removeEvent("cef.rieltagency.addBusiness", onAddBusiness);
      };
    }
  }, []);

  // Handle data selection
  const onSelectData = (data: HouseOrBusinessData, type: string) => {
    const newData = [...data];
    newData.typeData = type;
    setSelectData(newData);
  };

  // Handle key events
  useEffect(() => {
    const handleKeyUp = (event: KeyboardEvent) => {
      const { keyCode } = event;
      
      if (keyCode === 27) {
        onEsc();
      } else if (keyCode === 13) {
        onBuy();
      }
    };
    
    window.addEventListener('keyup', handleKeyUp);
    
    return () => {
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [selectData]);

  // Handle exit
  const onEsc = () => {
    if (selectData) {
      setSelectData(null);
    } else {
      executeClient("client.rieltagency.close");
    }
  };

  // Handle buy
  const onBuy = () => {
    if (selectData) {
      executeClient(
        "client.rieltagency.buy", 
        selectData[0], 
        selectData.typeData === "house" ? 0 : 1
      );
    }
  };

  return (
    <div id="rielt">
      <div className="rielt__panel">
        <div className="rielt__header">Риэлторское агенство</div>
        <div className="rielt__mainmenu">
          <div className="rielt__mainmenu_block">
            <div 
              className={`rielt__mainmenu_categorie big ${selectView === "RieltHouses" ? 'active' : ''}`}
              onClick={() => onUpdatePage("RieltHouses")}
            >
              <div className="line"></div>
              <div className="box-column">
                <div className="rielt__mainmenu_categorie-header">Дома</div>
                <div className="rielt__gray">
                  Всего в штате: <span className="rielt__white">{viewData.allHouse}</span>
                </div>
                <div className="rielt__gray">
                  Сейчас в продаже: <span className="rielt__white">{houseData.length}</span>
                </div>
              </div>
            </div>
            <div 
              className={`rielt__mainmenu_categorie big ${selectView === "RieltBusiness" ? 'active' : ''}`}
              onClick={() => onUpdatePage("RieltBusiness")}
            >
              <div className="line"></div>
              <div className="box-column">
                <div className="rielt__mainmenu_categorie-header">Бизнесы</div>
                <div className="rielt__gray">
                  Всего в штате: <span className="rielt__white">{viewData.allBusiness}</span>
                </div>
                <div className="rielt__gray">
                  Сейчас в продаже: <span className="rielt__white">{businessData.length}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="rielt__mainmenu_center rielt">
            {selectData && selectData.typeData === "house" ? (
              <HRieltInfo selectData={selectData} buyPrice={viewData.buyPrice} />
            ) : selectData && selectData.typeData === "business" ? (
              <BRieltInfo selectData={selectData} buyPrice={viewData.buyPrice} />
            ) : selectView === "RieltHouses" && houseData.length > 0 ? (
              <RieltHouse houseData={houseData} onSelectData={onSelectData} />
            ) : selectView === "RieltBusiness" && businessData.length > 0 ? (
              <RieltBusiness businessData={businessData} onSelectData={onSelectData} />
            ) : (
              <div className="houseicon-time rielt__rielt_none">
                <div className="absolute">
                  <div className="rielt__rielt_title font-36">В продаже: 0</div>
                  <div className="rielt__rielt_subtitle">Ожидайте</div>
                </div>
              </div>
            )}
          </div>
          <div className="rielt__mainmenu_block">
            <div className="rielt__rielt_block-info">
              <div className="rielt__rielt_title">{houseData.length + businessData.length}</div>
              <div className="rielt__rielt_subtitle">Объектов недвижимости доступно</div>
            </div>
          </div>
        </div>
        <div className="box-between">
          {selectData && (
            <div className="house_bottom_buttons back" onClick={onBuy}>
              <div>Выбрать</div>
              <div className="house_bottom_button">Enter</div>
            </div>
          )}
          <div className="house_bottom_buttons esc" onClick={onEsc}>
            <div>Выйти</div>
            <div className="house_bottom_button">ESC</div>
          </div>
        </div>
        <div className="houseicon-house rielt__background"></div>
      </div>
    </div>
  );
};

export default RealEstateAgency;