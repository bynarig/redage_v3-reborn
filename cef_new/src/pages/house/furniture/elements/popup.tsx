import React from 'react';
import './popup.css';

interface PopupProps {
  type?: string;
  header?: string;
  subheader?: string;
  description?: string;
  level?: number;
  cost?: number;
  onBuy?: () => void;
  onExit?: () => void;
}

const Popup: React.FC<PopupProps> = ({
  type = 'garage',
  header = 'ГАРАЖ',
  subheader = '+20 МЕСТ',
  description = 'Добавит несколько слотов для транспорта',
  level = 2,
  cost = 2000000,
  onBuy = () => console.log('Buy upgrade'),
  onExit = () => console.log('Exit popup')
}) => {
  return (
    <div id="house__popup">
      <div className="house__popup_block">
        <div className="houseicon-garage house__popup_image"></div>
        <div className="house__popup_header">{header}</div>
        <div className="house__popup_header">
          <span className="orange">{subheader}</span>
        </div>
        <div className="house__gray">{description}</div>
        <div className="house__white">Стоимость улучшения</div>
        <div className="box-flex">
          <div className="box-column">
            <div className="house__popup_top">
              {level}
              <div className="house__popup_icon"></div>
            </div>
            <div className="house__gray">Уровень</div>
          </div>
          <div className="house__and">и</div>
          <div className="box-column">
            <div className="house__popup_top">{cost.toLocaleString()}</div>
            <div className="house__gray">Валюты</div>
          </div>
        </div>
      </div>
      <div className="box-flex">
        <div 
          className="house_bottom_buttons back"
          onClick={onBuy}
        >
          <div>Купить</div>
          <div className="house_bottom_button">Enter</div>
        </div>
        <div 
          className="house_bottom_buttons back ml-20"
          onClick={onExit}
        >
          <div>Выйти</div>
          <div className="house_bottom_button">ESC</div>
        </div>
      </div>
    </div>
  );
};

export default Popup;