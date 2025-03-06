import React from 'react';
import { format } from '#/shared/api/formatter';
// import './housebuypanel.css'; // Assuming you'll create a CSS file

interface HouseData {
  id: number;
  class: number;
  gosPrice: number;
  price?: number;
  upgrades?: string[];
  location?: string;
}

interface HouseBuyPanelProps {
  viewData: HouseData;
  onBuy: () => void;
  onExit: () => void;
}

const HouseBuyPanel: React.FC<HouseBuyPanelProps> = ({ viewData, onBuy, onExit }) => {
  // House class descriptions mapping
  const descToClass: string[] = [
    'Эконом класса',
    'Средний класс',
    'Бизнес класс',
    'Премиум класс',
    'Элитный класс',
    'VIP класс'
  ];
  
  // Location fallback if not provided in viewData
  const location = viewData.location || 'Rockford Hills';
  
  return (
    <div className="house__buy">
      <div className="house__header">Дом №{viewData.id}</div>
      <div className="house__info">
        {descToClass[viewData.class]} в <span>{location}</span>
      </div>
      <div className="house__buy_flex">
        <div className="box-column">
          <div className="house__stat mint">${format("money", viewData.gosPrice)}</div>
          <div className="house__menu">Государственная стоимость:</div>
        </div>
        
        {viewData.price && (
          <>
            <div className="house__line"></div>
            <div className="box-column">
              <div className="house__stat orange">${format("money", viewData.price)}</div>
              <div className="house__menu">Предложенная стоимость:</div>
            </div>
          </>
        )}
      </div>
      
      {viewData.price && (
        <div className="house__buy_center">
          <div className="house__menu">Улучшения:</div>
          <div className="box-column">
            {/* If upgrades are provided in viewData, render those, otherwise show defaults */}
            {viewData.upgrades ? (
              viewData.upgrades.map((upgrade, index) => (
                <div key={index} className="house__upgrade_element">{upgrade}</div>
              ))
            ) : (
              <>
                <div className="house__upgrade_element">Сигнализация</div>
                <div className="house__upgrade_element">Взломостойкий сейф</div>
                <div className="house__upgrade_element">Шкаф для вещей [x3]</div>
              </>
            )}
          </div>
        </div>
      )}
      
      <div className="house_bottom_buttons back" onClick={onBuy}>
        <div>Приобрести</div>
        <div className="house_bottom_button">ENTER</div>
      </div>
      
      <div className="house_bottom_buttons esc" onClick={onExit}>
        <div>Выйти</div>
        <div className="house_bottom_button">ESC</div>
      </div>
      
      <div className="houseicon-house house__background"></div>
    </div>
  );
};

export default HouseBuyPanel;