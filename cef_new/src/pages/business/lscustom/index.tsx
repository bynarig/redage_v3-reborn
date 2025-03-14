import React, { useEffect, useState } from 'react';
import { translateText } from '#/shared/locale';
import './main.sass'; // Replace SASS with CSS to avoid the circular dependency
import './fonts/style.css';
import Item from './item';
import { format } from '#/shared/api/formatter';
import ColorPicker from './color';
import { executeClient } from '#/shared/api/rage';
import { useSelector } from 'react-redux';
import { selectCharMoney } from '#/shared/store/chars';
// Import mock data
import { mockCategories, getMockListItems, mockVehicleStats } from '#/shared/data/mock/shops/LSC';
import { ENVIRONMENT } from '#/env';

interface CategoryItem {
  title: string;
  desc: string;
  category: string | number;
}

interface ListItem {
  index: number;
  name: string;
  price: number;
}

const LSCustoms: React.FC = () => {
  // State variables
  const [color, setColor] = useState<boolean>(false);
  const [colorListsId, setColorListsId] = useState<number>(0);
  const [category, setCategory] = useState<CategoryItem[]>([]);
  const [selectCategory, setSelectCategory] = useState<number>(-1);
  const [lists, setLists] = useState<ListItem[]>([]);
  const [selectItem, setSelectItem] = useState<number>(-1);
  
  // Vehicle stats
  const [mstats_speed, setMstatsSpeed] = useState<number>(100);
  const [mstats_brakes, setMstatsBrakes] = useState<number>(100);
  const [mstats_boost, setMstatsBoost] = useState<number>(100);
  const [mstats_clutch, setMstatsClutch] = useState<number>(100);
  const [stats_speed, setStatsSpeed] = useState<number>(12);
  const [stats_brakes, setStatsBrakes] = useState<number>(52);
  const [stats_boost, setStatsBoost] = useState<number>(50);
  const [stats_clutch, setStatsClutch] = useState<number>(50);
  
  // Development mode flag
  const isDevelopment = ENVIRONMENT === 'development';
  
  // Get character money from Redux store
  const charMoney = useSelector(selectCharMoney);

  // Event handlers and setup
  useEffect(() => {
    // In development mode, load mock data immediately
    if (isDevelopment) {
      console.log("Development mode: Loading mock LS Customs data");
      setCategory(mockCategories);
      
      // Set initial vehicle stats from mock data
      setMstatsSpeed(mockVehicleStats.max.speed);
      setMstatsBrakes(mockVehicleStats.max.brakes);
      setMstatsBoost(mockVehicleStats.max.boost);
      setMstatsClutch(mockVehicleStats.max.clutch);
      
      setStatsSpeed(mockVehicleStats.current.speed);
      setStatsBrakes(mockVehicleStats.current.brakes);
      setStatsBoost(mockVehicleStats.current.boost);
      setStatsClutch(mockVehicleStats.current.clutch);
    }
    
    // Color event handler
    const handleCustomColor = (toggled: boolean, type: number) => {
      setColor(toggled);
      setColorListsId(type);
    };
    
    // Categories event handler
    const handleCustomCategories = (_category: string) => {
      const itemsElement = document.querySelector("ul.items");
      if (itemsElement) {
        itemsElement.scrollTop = 0;
      }
      
      setCategory(JSON.parse(_category));
      setSelectCategory(-1);
      setColor(false);
      setColorListsId(0);
      setLists([]);
      setSelectItem(-1);
    };
    
    // Max stats event handler
    const handleVehicleMaxStats = (
      _stats_speed: number, 
      _stats_brakes: number, 
      _stats_boost: number, 
      _stats_clutch: number
    ) => {
      setMstatsSpeed(_stats_speed);
      setMstatsBrakes(_stats_brakes);
      setMstatsBoost(_stats_boost);
      setMstatsClutch(_stats_clutch);
    };
    
    // Vehicle stats event handler
    const handleVehicleStats = (
      _stats_speed: number, 
      _stats_brakes: number, 
      _stats_boost: number, 
      _stats_clutch: number
    ) => {
      setStatsSpeed(_stats_speed);
      setStatsBrakes(_stats_brakes);
      setStatsBoost(_stats_boost);
      setStatsClutch(_stats_clutch);
    };
    
    // Lists event handler
    const handleCustomLists = (_lists: string) => {
      setLists(JSON.parse(_lists));
      setSelectItem(-1);
      
      setTimeout(() => {
        const selectItemsElement = document.querySelector("ul.items.select");
        if (selectItemsElement) {
          selectItemsElement.scrollTop = 0;
        }
      }, 0);
    };

    // Register event handlers in production mode only
    if (!isDevelopment) {
      // Assuming 'window.events' is properly typed or declared elsewhere
      window.events.addEvent("cef.custom.color", handleCustomColor);
      window.events.addEvent("cef.custom.categories", handleCustomCategories);
      window.events.addEvent("cef.custom.vehicleMaxStats", handleVehicleMaxStats);
      window.events.addEvent("cef.custom.vehicleStats", handleVehicleStats);
      window.events.addEvent("cef.custom.lists", handleCustomLists);
      
      // Cleanup function
      return () => {
        window.events.removeEvent("cef.custom.color", handleCustomColor);
        window.events.removeEvent("cef.custom.categories", handleCustomCategories);
        window.events.removeEvent("cef.custom.vehicleMaxStats", handleVehicleMaxStats);
        window.events.removeEvent("cef.custom.vehicleStats", handleVehicleStats);
        window.events.removeEvent("cef.custom.lists", handleCustomLists);
      };
    }
  }, [isDevelopment]);
  
  // Calculate specs percentages
  const getSpec = (num: number, max: number): number[] => {
    let percentArray: number[] = [];
    
    for (let step = 1; step <= 10; step++) {
      let progress = 0;
      if (num >= (step * 10)) {
        progress = 100;
      } else if (num < (step * 10) && num >= (10 * (step - 1))) {
        progress = num - (((step - 1) * 10) * 100 / max);
      }
      percentArray.push(progress);
    }
    
    return percentArray;
  };
  
  // Handle category selection
  const onSelectCategory = (index: number) => {
    setSelectCategory(index);
    
    if (isDevelopment) {
      // In development, load mock items for the selected category
      const mockItems = getMockListItems(category[index].category);
      setLists(mockItems);
      
      // Show color picker if paint category is selected
      if (category[index].category === "paint") {
        setColor(true);
        setColorListsId(1); // Set to the second color list (car colors)
      } else {
        setColor(false);
        setColorListsId(0);
      }
    } else {
      // In production, use the real API
      setLists([]);
      setColor(false);
      setColorListsId(0);
      executeClient('client.custom.category', category[index].category);
    }
  };
  
  // Handle item selection
  const onSelectItem = (index: number) => {
    setSelectItem(index);
    
    if (isDevelopment) {
      console.log(`Selected item: ${index}`);
      // Simulate stats changes in development mode
      if (selectCategory >= 0) {
        const cat = category[selectCategory].category;
        if (cat === "engine") {
          setStatsSpeed(Math.min(mockVehicleStats.current.speed + (index * 10), 100));
          setStatsBoost(Math.min(mockVehicleStats.current.boost + (index * 10), 100));
        } else if (cat === "brakes") {
          setStatsBrakes(Math.min(mockVehicleStats.current.brakes + (index * 15), 100));
        } else if (cat === "suspension") {
          setStatsClutch(Math.min(mockVehicleStats.current.clutch + (index * 15), 100));
        }
      }
    }
  };
  
  // Handle camera toggling
  const handleMouseEnter = () => isDevelopment ? console.log("Camera toggled off") : executeClient("client.camera.toggled", false);
  const handleMouseLeave = () => isDevelopment ? console.log("Camera toggled on") : executeClient("client.camera.toggled", true);
  
  return (
    <div id="lscustoms">
      <div className="leftSide">
        {/* Rest of the component remains the same */}
        <div className="box-flex">
          <div className={`categoryBlock ${(lists.length > 0 && category[selectCategory] !== undefined) ? 'min' : ''}`}>
            <div className="box-header" style={{ flexDirection: "column" }}>
              <div className="img-logo" />
              <div className="flex">
                <div className="desc">
                  <span className="icon-money cash" />
                  {!(lists.length > 0 && category[selectCategory] !== undefined) && 
                    translateText('vehicle', 'Баланс') + ':'
                  }
                  <span className="money">${format("money", isDevelopment ? 500000 : charMoney)}</span>
                </div>
              </div>
            </div>

            <ul 
              className="items" 
              onMouseEnter={handleMouseEnter} 
              onMouseLeave={handleMouseLeave}
            >
              {category.map((item, index) => (
                <li 
                  key={index}
                  className={`listitems ${selectCategory === index ? 'active' : ''}`} 
                  onClick={() => onSelectCategory(index)}
                >
                  {(lists.length > 0 && category[selectCategory] !== undefined) && 
                   typeof item.category === "number" ? (
                    <div className="listitems-title">
                      {item.title}
                    </div>
                  ) : (
                    <i className={`icon ilsc-${item.category}`} />
                  )}
                  <div className="flex">
                    <div className="title">
                      {item.title}
                    </div>
                    <div className="desc">
                      {item.desc}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          
          {(lists.length > 0 && category[selectCategory] !== undefined) && (
            <div className="categoryBlock popups">
              <div className="box-header">
                <i className={`icon ilsc-${category[selectCategory].category}`} />
                <div className="flex">
                  <div className="title">
                    {category[selectCategory].title}
                  </div>
                </div>
              </div>
              <ul 
                className="items select" 
                onMouseEnter={handleMouseEnter} 
                onMouseLeave={handleMouseLeave}
              >
                {lists.map((item, index) => (
                  <Item
                    key={index}
                    id={item.index}
                    icon={String(category[selectCategory].category)}
                    text={item.name}
                    price={item.price}
                    onSelectItem={onSelectItem}
                    selectItem={selectItem}
                  />
                ))}
              </ul>
            </div>
          )}
        </div>
        <div className="box-button">
          <div className="button" onClick={() => isDevelopment ? console.log("Exit clicked") : executeClient("client.custom.exit")}>
            {translateText('vehicle', 'Выйти')}
          </div>
        </div>
      </div>
      
      {/* Center and right side remain the same */}
      <div className="centerSide">
        <div className="buttonInfo">
          <div className="btn">ESC</div>
          <div className="text">{translateText('vehicle', 'Выйти/Назад')}</div>
        </div>
        <div className="buttonInfo">
          <div className="btn"><i className="range"/></div>
        </div>
      </div>
      
      <div className="rightSide">
        <div className="spec">
          <div className="head">{translateText('vehicle', 'Характеристики')}</div>
          <div className="lb">
            <div className="title"><i className="ic1"/>{translateText('vehicle', 'Скорость')}</div>
            <ul className="specProc">
              {getSpec(stats_speed, mstats_speed).map((step, index) => (
                <li 
                  key={index}
                  className="sort" 
                  style={{ background: `linear-gradient(to right, #FFFFFF ${step}%, #434A5B 0%)` }}
                />
              ))}
            </ul>
          </div>
          <div className="lb">
            <div className="title"><i className="ic2"/>{translateText('vehicle', 'Ускорение')}</div>
            <ul className="specProc">
              {getSpec(stats_boost, mstats_boost).map((step, index) => (
                <li 
                  key={index}
                  className="sort" 
                  style={{ background: `linear-gradient(to right, #FFFFFF ${step}%, #434A5B 0%)` }}
                />
              ))}
            </ul>
          </div>
          <div className="lb">
            <div className="title"><i className="ic3"/>{translateText('vehicle', 'Торможение')}</div>
            <ul className="specProc">
              {getSpec(stats_brakes, mstats_brakes).map((step, index) => (
                <li 
                  key={index}
                  className="sort" 
                  style={{ background: `linear-gradient(to right, #FFFFFF ${step}%, #434A5B 0%)` }}
                />
              ))}
            </ul>
          </div>
          <div className="lb">
            <div className="title"><i className="ic4"/>{translateText('vehicle', 'Сцепление')}</div>
            <ul className="specProc">
              {getSpec(stats_clutch, mstats_clutch).map((step, index) => (
                <li 
                  key={index}
                  className="sort" 
                  style={{ background: `linear-gradient(to right, #FFFFFF ${step}%, #434A5B 0%)` }}
                />
              ))}
            </ul>
          </div>
        </div>
        
        {color && (
          <ColorPicker 
            title={category[selectCategory] ? category[selectCategory].title : ""} 
            lists={colorListsId} 
          />
        )}
      </div>
    </div>
  );
};

export default LSCustoms;