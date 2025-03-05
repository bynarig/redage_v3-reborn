import React, { useEffect, useState } from 'react';
import './assets/css/iconsarenda.css';
import './assets/css/main.sass';
import { motion, AnimatePresence } from 'framer-motion';
import { useSelector } from 'react-redux';
import { selectCharMoney, selectCharLVL } from '#/shared/store/chars';
import { selectAccountVip } from '#/shared/store/account';
import { format } from '#/shared/api/formatter';
import { executeClient } from '#/shared/api/rage';
import { ENVIRONMENT } from '#/env';
// Change this import to use your custom component
import RangeSlider from '#/shared/ui/rangeslider';
import { mockVehicles } from '#/shared/data/mock/shops/rental';
// Rest of your code...

// Mock data for development


interface VehicleItem {
  Id: number;
  Model: string;
  Price: number;
  IsJob: boolean;
}

interface RentCarProps {
  viewData?: string;
}

const RentCar: React.FC<RentCarProps> = ({ viewData = '[]' }) => {
  // State variables
  const [hourValue, setHourValue] = useState<number>(1);
  const [selectVehicle, setSelectVehicle] = useState<number>(-1);
  const [colorId, setColorId] = useState<number>(0);
  
  // Use mock data in development, real data in production
  const isDevelopment = ENVIRONMENT === 'development';
  const vehicleArray: VehicleItem[] = isDevelopment ? mockVehicles : JSON.parse(viewData);
  
  // Get character data from Redux store
  const charMoney = useSelector(selectCharMoney);
  const charLVL = useSelector(selectCharLVL);
  const accountVip = useSelector(selectAccountVip);
  
  // Available colors
  const authColors = [
    "#000",
    "#fff",
    "#e60000",
    "#ff7300",
    "#f0f000",
    "#00e600",
    "#00cdff",
    "#0000e6",
    "#be3ca5",
  ];
  
  // Set the selected color
  const setColor = (index: number) => {
    if (index === colorId) return;
    setColorId(index);
  };
  
  // Handle range slider change
  const handleSliderChange = (value: number) => {
    setHourValue(value);
  };
  
  // Handle vehicle purchase
  const onBuy = () => {
    if (charMoney < getRentCarCash(vehicleArray[selectVehicle].Price * hourValue)) {
      // In development, just log; in production, show notification
      if (isDevelopment) {
        console.log("Not enough money!");
      } else {
        (window as any).notificationAdd(1, 9, `У Вас не достаточно средств!`, 3000);
      }
      return;
    }
    executeClient('client.rentcar.buy', vehicleArray[selectVehicle].Id, colorId, hourValue);
  };
  
  // Handle exit
  const onExit = () => {
    executeClient('client.rentcar.exit');
  };
  
  // Calculate price based on player level
  const getRentCarCashToLevel = (price: number) => {
    const level = charLVL;

    if (level <= 2) price = Math.round(price * 1.0);
    else if (level <= 4) price = Math.round(price * 1.5);
    else if (level <= 6) price = Math.round(price * 2.0);
    else if (level <= 9) price = Math.round(price * 4.5);
    else if (level <= 19) price = Math.round(price * 6.0);
    else price = Math.round(price * 8.0);
    
    return price;
  };
  
  // Calculate price with VIP discounts
  const getRentCarCash = (price: number) => {
    switch (accountVip) {
      case 1:
        price = Math.round(price * 0.95);
        break;
      case 2:
        price = Math.round(price * 0.9);
        break;
      case 3:
        price = Math.round(price * 0.85);
        break;
      case 4:
      case 5:
        price = Math.round(price * 0.8);
        break;
    }
    
    return getRentCarCashToLevel(price);
  };
  
  // Handle ESC key press
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const { keyCode } = event;
      if (keyCode !== 27) return;

      if (selectVehicle !== -1) setSelectVehicle(-1);
      else onExit();
    };

    window.addEventListener('keyup', handleKeyDown);
    return () => window.removeEventListener('keyup', handleKeyDown);
  }, [selectVehicle]);
  
  return (
    <div id="arenda-page">
      <div className={`arenda ${selectVehicle !== -1 ? 'nonactive' : ''}`}>
        <div className="arenda-header">
          <div className="arenda-header__text">
            <div className="arenda-header__title">Аренда</div>
            <div className="arenda-header__main-text">
              {/* Using translateText would be better here for localization */}
              Необходимо транспортное средство для перемещения? По всему штату с помощью GPS можно найти похожие места, которые предоставляют разный транспорт в аренду: от лодок и мотоциклов до элитных автомобилей в любых цветах! Управлять арендой можно через телефон, при выхода со штата аренда не сбросится, если у Вас ещё осталось оплаченное время.
            </div>
          </div>
          <span className="arendaicon-off" onClick={onExit} />
        </div>
        
        <div className="arenda-main">
          {vehicleArray.map((item, index) => (
            <div className="arenda-main__element" key={index}>
              <div className="arenda-main__title">{item.Model}</div>
              <div className="arenda-main__price">
                <span className="arendaicon-money"/>
                ${format("money", getRentCarCash(item.Price))} / час
              </div>
              <div 
                className="arenda-main__img" 
                style={{
                  backgroundImage: `url(${(document as any).cloud}inventoryItems/vehicle/${item.Model.toLowerCase()}.png)`
                }} 
              />
              <div 
                className="arenda-main__button" 
                onClick={() => setSelectVehicle(index)}
              >
                Арендовать
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <AnimatePresence>
        {selectVehicle !== -1 && (
          <div className="props-arenda">
            <motion.div 
              className="arenda-customize"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="arenda-customize__title">Аренда</div>
              <div className="arenda-customize__subtitle">{vehicleArray[selectVehicle].Model}</div>
              <div 
                className="arenda-customize__img" 
                style={{
                  backgroundImage: `url(${(document as any).cloud}inventoryItems/vehicle/${vehicleArray[selectVehicle].Model.toLowerCase()}.png)`
                }} 
              />
              
              {!vehicleArray[selectVehicle].IsJob && (
                <>
                  <div className="arenda-customize__paragraph">Срок аренды / час</div>
                  <div className="arenda-customize__rangeslider">
                    <RangeSlider 
                        min={1}
                        max={8}
                        value={hourValue}
                        step={1}
                        onChange={handleSliderChange}
                    />
                  </div>
                  <div className="arenda-customize__input-description">
                    <div className="arenda-customize_gray">1</div>
                    <div>${format("money", getRentCarCash(vehicleArray[selectVehicle].Price))} / час</div>
                    <div className="arenda-customize_gray">8</div>
                  </div>
                </>
              )}
              
              <div className="arenda-customize__paragraph">Цвет авто</div>
              <div className="adrenda-customize__radio-buttons">
                {authColors.map((value, index) => (
                  <i 
                    key={index} 
                    className={`color ${colorId === index ? 'active' : ''}`} 
                    onClick={() => setColor(index)} 
                    style={{ background: value }} 
                  />
                ))}
              </div>
              
              <div className="arenda-customize__button" onClick={onBuy}>
                К оплате
                <div className="arenda-customize__money">
                  ${format("money", getRentCarCash(vehicleArray[selectVehicle].Price * hourValue))}
                </div>
              </div>
              
              <div 
                className="arenda-customize__exit" 
                onClick={() => setSelectVehicle(-1)}
              >
                Закрыть
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RentCar;