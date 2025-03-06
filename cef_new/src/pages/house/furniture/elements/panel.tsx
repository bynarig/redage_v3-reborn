import React, { useState } from 'react';

import ResidentsComponent from './residents';
import GarageComponent from './garage';
import UpgradesComponent from './upgrades';
import FurnitureComponent from './furniture';

type ViewType = 'Residents' | 'Garage' | 'Upgrades' | 'Furniture';

interface PanelProps {
  // Add any props if needed
}

const Panel: React.FC<PanelProps> = () => {
  // View components mapping
  const Views = {
    Residents: ResidentsComponent,
    Garage: GarageComponent,
    Upgrades: UpgradesComponent,
    Furniture: FurnitureComponent
  };

  // View names mapping
  const ViewsNames = {
    Residents: "Жильцы",
    Garage: "Гараж",
    Upgrades: "Улучшение дома",
    Furniture: "Мебель"
  };

  // State for selected view
  const [SelectViews, setSelectViews] = useState<ViewType>('Garage');

  // Handler for view selection
  const OnUpdatePage = (page: ViewType) => {
    setSelectViews(page);
  };

  // Dynamically render the current view component
  const CurrentView = Views[SelectViews];

  return (
    <div className="house__panel">
      <div className="house__header">{ViewsNames[SelectViews]}</div>
      <div className="house__mainmenu">
        <div className="house__mainmenu_block">
          <div 
            className={`house__mainmenu_categorie ${SelectViews === "Garage" ? 'active' : ''}`}
            onClick={() => OnUpdatePage("Garage")}
          >
            <div className="line"></div>
            Гараж
          </div>
          <div 
            className={`house__mainmenu_categorie ${SelectViews === "Residents" ? 'active' : ''}`}
            onClick={() => OnUpdatePage("Residents")}
          >
            <div className="line"></div>
            Жильцы
          </div>
          <div 
            className={`house__mainmenu_categorie ${SelectViews === "Upgrades" ? 'active' : ''}`}
            onClick={() => OnUpdatePage("Upgrades")}
          >
            <div className="line"></div>
            Улучшение дома
          </div>
          <div 
            className={`house__mainmenu_categorie ${SelectViews === "Furniture" ? 'active' : ''}`}
            onClick={() => OnUpdatePage("Furniture")}
          >
            <div className="line"></div>
            Мебель
          </div>
        </div>
        <div className="house__mainmenu_center">
          <CurrentView />
        </div>
        <div className="house__mainmenu_block">
          <div className="house__info small m-0">
            Пятикомнотный особняк в центре Rockford Hills
          </div>
          <div className="house__info_flex">
            <div className="house__menu">Государственная стоимость:</div>
            <div className="house__stat">$1.000.000</div>
          </div>
          <div className="house__info_flex">
            <div className="house__menu">Улучшения</div>
            <div className="box-column">
              <div className="house__stat">Сигнализация</div>
              <div className="house__stat">Взломостойкий сейф</div>
              <div className="house__stat">Шкаф для вещей [x3]</div>
            </div>
          </div>
          <div className="house__info_flex">
            <div className="house__menu">Предложенная стоимость:</div>
            <div className="house__stat">$2.000.000</div>
          </div>
        </div>
      </div>
      <div className="box-between">
        <div className="house_bottom_buttons back">
          <div>Выбрать</div>
          <div className="house_bottom_button">Enter</div>
        </div>
        <div className="house_bottom_buttons esc">
          <div>Выйти</div>
          <div className="house_bottom_button">ESC</div>
        </div>
      </div>
      <div className="houseicon-house house__background"></div>
    </div>
  );
};

export default Panel;