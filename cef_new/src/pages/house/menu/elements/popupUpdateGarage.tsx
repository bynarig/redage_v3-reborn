import React, { useState, useEffect } from 'react';
import { executeClient, executeClientAsync } from '#/shared/api/rage';
import { format } from '#/shared/api/formatter';
import { hasJsonStructure } from '#/shared/api/functions';

import { ENVIRONMENT } from '#/env';

// Mock data for development
const MOCK_GARAGES_DATA = [
  { MaxCars: 2, Price: 50000, Name: "Малый гараж", IsDonate: false },
  { MaxCars: 6, Price: 150000, Name: "Средний гараж", IsDonate: false },
  { MaxCars: 10, Price: 300000, Name: "Большой гараж", IsDonate: false },
  { MaxCars: 20, Price: 600000, Name: "Премиум гараж", IsDonate: false },
  { MaxCars: 30, Price: 1000000, Name: "VIP гараж", IsDonate: true },
  { MaxCars: 40, Price: 1500000, Name: "ELITE гараж", IsDonate: true },
];

const MOCK_HOUSE_DATA = {
  garageType: 1, // Default to medium garage
  address: "Alta Street, Apartment 57",
  owner: "John_Doe",
  locked: false,
  price: 500000
};

interface GarageData {
  MaxCars: number;
  Price: number;
  Name: string;
  IsDonate?: boolean;
}

interface PopupUpdateGarageProps {
  onClose: () => void;
}

// Extend Window interface to add custom properties
declare global {
  interface Window {
    loaderData: {
      delay: (key: string, seconds: number) => boolean;
    };
  }
}

const PopupUpdateGarage: React.FC<PopupUpdateGarageProps> = ({ onClose }) => {
  const [type, setType] = useState<number>(0);
  const [nextType, setNextType] = useState<number>(0);
  const [garagesData, setGaragesData] = useState<GarageData[]>([]);

  // Fetch house data
  useEffect(() => {
    if (ENVIRONMENT === 'development') {
      // Mock data for development
      setType(MOCK_HOUSE_DATA.garageType);
      const next = (MOCK_HOUSE_DATA.garageType + 1 === 6) ? MOCK_HOUSE_DATA.garageType + 2 : MOCK_HOUSE_DATA.garageType + 1;
      setNextType(next);
      setGaragesData(MOCK_GARAGES_DATA);

      // Setup mock loaderData if it doesn't exist
      if (!window.loaderData) {
        window.loaderData = {
          delay: (key: string, seconds: number) => true
        };
      }
    } else {
      fetchHouseData();
      fetchGaragesData();
    }
  }, []);

  // Handle keyboard events
  useEffect(() => {
    const handleKeyUp = (event: KeyboardEvent) => {
      const { keyCode } = event;
      switch (keyCode) {
        case 27: // ESC
          onExit();
          break;
        case 13: // ENTER
          onBuy();
          break;
      }
    };
    
    window.addEventListener('keyup', handleKeyUp);
    
    return () => {
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [garagesData, type, nextType]);

  const fetchHouseData = async () => {
    try {
      const result = await executeClientAsync("phone.house.houseData");
      if (hasJsonStructure(result)) {
        const parsedData = JSON.parse(result);
        setType(parsedData.garageType);
        const next = (parsedData.garageType + 1 === 6) ? parsedData.garageType + 2 : parsedData.garageType + 1;
        setNextType(next);
      }
    } catch (error) {
      console.error('Error fetching house data:', error);
    }
  };

  const fetchGaragesData = async () => {
    try {
      const result = await executeClientAsync("phone.house.garagesData");
      if (hasJsonStructure(result)) {
        const parsedData = JSON.parse(result);
        setGaragesData(parsedData);
      }
    } catch (error) {
      console.error('Error fetching garages data:', error);
    }
  };

  const onBuy = () => {
    if (!window.loaderData.delay("onGarageUpdate", 5)) {
      return;
    }

    executeClient("client.garage.update");
    onExit();
    
    // For development, log the upgrade
    if (ENVIRONMENT === 'development') {
      console.log(`Upgrading garage from type ${type} to type ${nextType}`);
    }
  };

  const onExit = () => {
    onClose();
  };

  // Format money with fallback
  const formatMoney = (value: number) => {
    if (typeof format === 'function') {
      return format("money", value);
    }
    return value.toLocaleString();
  };

  // Don't render anything if we don't have valid data
  if (!garagesData || !garagesData[nextType] || !garagesData[type]) {
    return null;
  }

  return (
    <div id="house__popup">
      <div className="house__popup_block">
        <div className="houseicon-garage house__popup_image"></div>
        <div className="house__popup_header">ГАРАЖ</div>
        <div className="house__popup_header">
          <span className="orange">+{garagesData[nextType].MaxCars - garagesData[type].MaxCars}</span> МЕСТ
        </div>
        <div className="house__gray">Добавит несколько слотов для транспорта</div>
        <div className="house__white">Стоимость улучшения</div>
        <div className="box-flex">
          <div className="box-column">
            <div className="house__popup_top">
              {nextType}
              <div className="house__popup_icon"></div>
            </div>
            <div className="house__gray">Уровень</div>
          </div>
          <div className="house__and">и</div>
          <div className="box-column">
            <div className="house__popup_top">{formatMoney(garagesData[nextType].Price)}</div>
            <div className="house__gray">{!garagesData[nextType].IsDonate ? "Валюты" : "RedBucks"}</div>
          </div>
        </div>
      </div>
      <div className="box-flex">
        <div className="house_bottom_buttons back" onClick={onBuy}>
          <div>Купить</div>
          <div className="house_bottom_button">Enter</div>
        </div>
        <div className="house_bottom_buttons back ml-20" onClick={onExit}>
          <div>Выйти</div>
          <div className="house_bottom_button">ESC</div>
        </div>
      </div>
    </div>
  );
};

export default PopupUpdateGarage;