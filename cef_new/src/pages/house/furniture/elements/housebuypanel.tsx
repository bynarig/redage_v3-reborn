import React from 'react';

import { format } from '#/shared/api/formatter';

interface HouseBuyPanelProps {
  houseId?: number;
  houseType?: string;
  location?: string;
  gosPrice?: number;
  offerPrice?: number;
  upgrades?: string[];
  onBuy?: () => void;
  onExit?: () => void;
}

const HouseBuyPanel: React.FC<HouseBuyPanelProps> = ({
  houseId = 596,
  houseType = 'Пятикомнотный особняк',
  location = 'Rockford Hills',
  gosPrice = 1000000,
  offerPrice = 2000000,
  upgrades = ['Сигнализация', 'Взломостойкий сейф', 'Шкаф для вещей [x3]'],
  onBuy = () => console.log('Buy house'),
  onExit = () => console.log('Exit panel')
}) => {
  return (
    <div className="house__buy">
      <div className="house__header">Дом №{houseId}</div>
      <div className="house__info">
        {houseType} в центре <span>{location}</span>
      </div>
      <div className="house__buy_flex">
        <div className="box-column">
          <div className="house__stat mint">${format ? format("money", gosPrice) : gosPrice.toLocaleString()}</div>
          <div className="house__menu">Государственная стоимость:</div>
        </div>
        <div className="house__line"></div>
        <div className="box-column">
          <div className="house__stat orange">${format ? format("money", offerPrice) : offerPrice.toLocaleString()}</div>
          <div className="house__menu">Предложенная стоимость:</div>
        </div>
      </div>
      <div className="house__buy_center">
        <div className="house__menu">Улучшения:</div>
        <div className="box-column">
          {upgrades.map((upgrade, index) => (
            <div key={index} className="house__upgrade_element">{upgrade}</div>
          ))}
        </div>
      </div>
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