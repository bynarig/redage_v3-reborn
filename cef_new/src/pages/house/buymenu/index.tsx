import React, { useState, useEffect } from 'react';
import { executeClient } from '#/shared/api/rage';
import './main.sass';
import './fonts/style.css';
import { format } from '#/shared/api/formatter';
import { houseType } from '#/shared/data/realEstate';
import keys from '#/shared/store/keys';
import keysName from '#/shared/data/keys';

interface HouseData {
  id: number;
  type: number;
  owner?: string;
  price?: number;
  tax?: number;
  cars?: number;
  door?: boolean;
}

interface HouseBuyMenuProps {
  viewData?: string | HouseData;
}

const HouseBuyMenu: React.FC<HouseBuyMenuProps> = ({ viewData: initialViewData }) => {
  // Parse the viewData if it's a string
  const [viewData, setViewData] = useState<HouseData>(() => {
    if (!initialViewData) return {} as HouseData;
    
    if (typeof initialViewData === 'string') {
      try {
        return JSON.parse(initialViewData);
      } catch (error) {
        console.error('Error parsing viewData:', error);
        return {} as HouseData;
      }
    }
    
    return initialViewData as HouseData;
  });

  // Handle keyboard events
  useEffect(() => {
    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.keyCode === 27) { // ESC key
        onEsc();
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.keyCode === 13) { // ENTER key
        onBuy();
      } else if (event.keyCode === 69) { // E key
        onInt();
      }
    };

    // Add event listeners
    window.addEventListener('keyup', handleKeyUp);
    window.addEventListener('keydown', handleKeyDown);

    // Clean up
    return () => {
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Action handlers
  const onEsc = () => {
    executeClient("client.houseinfo.close");
  };

  const onBuy = () => {
    executeClient("client.houseinfo.action", "buy");
  };

  const onInt = () => {
    executeClient("client.houseinfo.action", "int");
  };

  return (
    <div id="rielt">
      <div className="rielt__panel">
        <div className="rielt__header">Информация о доме</div>
        <div className="rielt__mainmenu">
          <div className="rielt__mainmenu_block">
            {/* Left side content if needed */}
          </div>
          <div className="rielt__mainmenu_center">
            <div className="rielt__rielt_info">
              <div className="houseicon-house rielt__rielt_house-icon"></div>
              <div className="rielt__rielt_header">Дом №{viewData.id}</div>
              <div className="rielt__gray">{viewData.owner ? "" : "Замечательный дом по доступной цене"}</div>
              <div className="rielt__rielt_stat">
                {viewData.tax !== undefined && (
                  <div className="rielt__rielt_element">
                    <div className="rielt__gray">Налоги:</div>
                    <div>${format("money", viewData.tax)}</div>
                  </div>
                )}
                <div className="rielt__rielt_element">
                  <div className="rielt__gray">Класс:</div>
                  <div>{houseType[viewData.type]}</div>
                </div>
                {viewData.cars !== undefined && (
                  <div className="rielt__rielt_element">
                    <div className="rielt__gray">Гаражных мест:</div>
                    <div>{viewData.cars}</div>
                  </div>
                )}
                {viewData.owner !== undefined && (
                  <div className="rielt__rielt_element">
                    <div className="rielt__gray">Владелец:</div>
                    <div>{viewData.owner.replace(/_/g, ' ')}</div>
                  </div>
                )}
                {viewData.door !== undefined && (
                  <div className="rielt__rielt_element">
                    <div className="rielt__gray">Состояние дверей:</div>
                    <div>{!viewData.door ? "Открыты" : "Закрыты"}</div>
                  </div>
                )}
              </div>
              {viewData.price && (
                <div className="box-column">
                  <div className="rielt__rielt_price">${format("money", viewData.price)}</div>
                  <div className="rielt__gray">Гос. цена:</div>
                </div>
              )}
            </div>
          </div>
          <div className="rielt__mainmenu_block">
            {/* Right side content if needed */}
          </div>
        </div>
        <div className="box-between">
          {viewData.owner === undefined && (
            <>
              <div className="house__bottom_left">
                <div className="house_bottom_buttons" onClick={onInt}>
                  <div>Посмотреть интерьер</div>
                  <div className="house_bottom_button">E</div>
                </div>
              </div>
              <div className="house_bottom_buttons back" onClick={onBuy}>
                <div>Купить дом</div>
                <div className="house_bottom_button">ENTER</div>
              </div>
            </>
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

export default HouseBuyMenu;