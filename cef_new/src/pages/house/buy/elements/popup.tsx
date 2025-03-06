import React from 'react';
import { format } from '#/shared/api/formatter';
// import './popup.css'; // Assuming you'll create a CSS file

interface HouseData {
  id: number;
  class?: number;
  gosPrice: number;
  price?: number;
  upgrades?: string[];
  location?: string;
}

interface HousePopupProps {
  viewData: HouseData;
  onBuy: () => void;
  onExit: () => void;
}

const HousePopup: React.FC<HousePopupProps> = ({ viewData, onBuy, onExit }) => {
  return (
    <div id="house__popup">
      <div className="house__popup_block">
        <div className="houseicon-garage house__popup_image"></div>
        <div className="house__popup_header">Дом</div>
        <div className="house__gray">Покупка дома</div>
        <div className="house__white">Стоимость</div>
        <div className="box-flex">
          <div className="box-column">
            <div className="house__popup_top">${format("money", viewData.gosPrice)}</div>
            <div className="house__gray">Валюты</div>
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

export default HousePopup;