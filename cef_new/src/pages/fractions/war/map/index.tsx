import React, { useState, useEffect, useRef } from 'react';
import mapImage from './map.jpg';
import { loadImage, loadAwaitImage } from '#/shared/api/functions';

// Import all SVG components as React components
import { ReactComponent as Airport1 } from './svg/airport1.svg';
import { ReactComponent as Airport2 } from './svg/airport2.svg';
import { ReactComponent as Mech } from './svg/mech.svg';
import { ReactComponent as Buspark } from './svg/buspark.svg';
import { ReactComponent as Theatre } from './svg/theatre.svg';
import { ReactComponent as BikeRent } from './svg/bikerent.svg';
import { ReactComponent as BoatRent } from './svg/boatrent.svg';
import { ReactComponent as OffroadRent } from './svg/offroadrent.svg';
import { ReactComponent as JobGason } from './svg/jobgason.svg';
import { ReactComponent as Rynok } from './svg/rynok.svg';
import { ReactComponent as AutoRynok } from './svg/autorynok.svg';
import { ReactComponent as GosShahta } from './svg/gosshahta.svg';
import { ReactComponent as Shahta1 } from './svg/shahta1.svg';
import { ReactComponent as Shahta2 } from './svg/shahta2.svg';
import { ReactComponent as Shahta3 } from './svg/shahta3.svg';
import { ReactComponent as Shahta4 } from './svg/shahta4.svg';
import { ReactComponent as Dalnoboi } from './svg/dalnoboi.svg';
import { ReactComponent as Sklad1 } from './svg/sklad1.svg';
import { ReactComponent as Sklad2 } from './svg/sklad2.svg';
import { ReactComponent as Zavod } from './svg/zavod.svg';
import { ReactComponent as HimLab } from './svg/himlab.svg';
import { ReactComponent as Inkas } from './svg/inkas.svg';
import { ReactComponent as Casino } from './svg/casino.svg';
import { ReactComponent as Forest1 } from './svg/forest1.svg';
import { ReactComponent as Forest2 } from './svg/forest2.svg';
import { ReactComponent as Forest3 } from './svg/forest3.svg';
import { ReactComponent as Forest4 } from './svg/forest4.svg';
import { ReactComponent as Forest5 } from './svg/forest5.svg';
import { ReactComponent as Arena } from './svg/arena.svg';
import { ReactComponent as HuntingShop } from './svg/huntingshop.svg';
import { ReactComponent as Electric } from './svg/electric.svg';
import { ReactComponent as Rielt } from './svg/rielt.svg';
import { ReactComponent as Observatorya } from './svg/observatorya.svg';
import { ReactComponent as Taxi } from './svg/taxi.svg';
import { ReactComponent as Drugs } from './svg/drugs.svg';
import { ReactComponent as Drugs2 } from './svg/drugs2.svg';
import { ReactComponent as DarkShop } from './svg/darkshop.svg';
import { ReactComponent as Port } from './svg/port.svg';
import { ReactComponent as Zavod2 } from './svg/zavod2.svg';
import { ReactComponent as Sklad3 } from './svg/sklad3.svg';
import { ReactComponent as Sklad4 } from './svg/sklad4.svg';
import { ReactComponent as Sklad5 } from './svg/sklad5.svg';
import { ReactComponent as Sklad6 } from './svg/sklad6.svg';
import { ReactComponent as Oil } from './svg/oil.svg';
import { ReactComponent as Oil2 } from './svg/oil2.svg';
import { ReactComponent as Oil3 } from './svg/oil3.svg';
import { ReactComponent as Oil4 } from './svg/oil4.svg';
import { ReactComponent as LandBar } from './svg/landbar.svg';
import { ReactComponent as Theatre2 } from './svg/theatre2.svg';
import { ReactComponent as Vetryanaya1 } from './svg/vetryanaya1.svg';
import { ReactComponent as Vetryanaya2 } from './svg/vetryanaya2.svg';
import { ReactComponent as Vetryanaya3 } from './svg/vetryanaya3.svg';
import { ReactComponent as Sklad7 } from './svg/sklad7.svg';
import { ReactComponent as Farm1 } from './svg/farm1.svg';
import { ReactComponent as Farm2 } from './svg/farm2.svg';
import { ReactComponent as Farm3 } from './svg/farm3.svg';
import { ReactComponent as Farm4 } from './svg/farm4.svg';
import { ReactComponent as Farm5 } from './svg/farm5.svg';
import { ReactComponent as Farm6 } from './svg/farm6.svg';
import { ReactComponent as Farm7 } from './svg/farm7.svg';
import { ReactComponent as Farm8 } from './svg/farm8.svg';
import { ReactComponent as Vokzal } from './svg/vokzal.svg';
import { ReactComponent as SpeedCarRent } from './svg/speedcarrent.svg';

// Import CSS
import './warmap.css';

interface ZoneData {
  id?: number;
  name: string;
  descr: string;
  zone: string;
  element: React.FC<React.SVGProps<SVGSVGElement>>;
  owner: string;
  color: number[] | null;
  isWar?: boolean;
  protectingColor?: number[];
  attackingColor?: number[];
  isTick?: boolean;
  position?: { top: number; left: number; }; // For positioning
}

interface MapProps {
  getPosition: [number, number] | false;
  elementWidth: number;
  elementHeight: number;
  onSelectItem: (item: ZoneData | null) => void;
  zones: ZoneData[];
  selectItem: ZoneData | null;
}

const WarMap: React.FC<MapProps> = ({
  getPosition,
  elementWidth,
  elementHeight,
  onSelectItem,
  zones = [],
  selectItem
}) => {
  // State variables
  const [posXToMap, setPosXToMap] = useState<number>(0);
  const [posYToMap, setPosYToMap] = useState<number>(0);
  const [isDown, setIsDown] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(0);
  const [awaitCount, setAwaitCount] = useState<number>(0);
  const [offsetX, setOffsetX] = useState<number>(0);
  const [offsetY, setOffsetY] = useState<number>(0);
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const [zonesData, setZonesData] = useState<Record<string, ZoneData>>({});
  
  const mapsWrapperRef = useRef<HTMLDivElement>(null);
  const intervalIdRef = useRef<NodeJS.Timeout | null>(null);
  
  // Helper functions
  const GetCoordsToMap = (posX: number, posY: number): [number, number] => {
    return [3756 + posX / 1.51821820693, 5528 - posY / 1.51821820693];
  };
  
  const GetMapPosToCoords = (posX: number, posY: number): [number, number] => {
    return [1.51821820693 * (posX - 3756), -1.51821820693 * (posY - 5528)];
  };
  
  const setMapCoords = (posX: number, posY: number) => {
    if (elementWidth && elementHeight) {
      const [x, y] = GetCoordsToMap(posX, posY);
      setPosXToMap(x - (elementWidth / 2));
      setPosYToMap(y - (elementHeight / 2));
    }
  };
  
  // Initialize zonesData with default values
  useEffect(() => {
    const initialZonesData: Record<string, ZoneData> = {};
    
    initialZonesList.forEach((item, index) => {
      initialZonesData[index] = { ...item, id: index };
    });
    
    setZonesData(initialZonesData);
  }, []);
  
  // Initialize map dimensions
  useEffect(() => {
    if (mapsWrapperRef.current) {
      const rect = mapsWrapperRef.current.getBoundingClientRect();
      setWidth(8192 - rect.width);
      setHeight(8192 - rect.height);
    }
  }, []);
  
  // Update map position when getPosition changes
  useEffect(() => {
    if (getPosition && elementHeight) {
      setMapCoords(getPosition[0], getPosition[1]);
    }
  }, [getPosition, elementHeight, elementWidth]);
  
  // Initialize zones and set up interval for war zones
  useEffect(() => {
    const initZone = () => {
      if (!zones) return;
      
      const newZonesData = { ...zonesData };
      zones.forEach(item => {
        if (typeof newZonesData[item.id!] !== "undefined") {
          newZonesData[item.id!].owner = item.owner;
          newZonesData[item.id!].color = item.color;
          newZonesData[item.id!].isWar = item.isWar;
          newZonesData[item.id!].protectingColor = item.protectingColor;
          newZonesData[item.id!].attackingColor = item.attackingColor;
          
          setZoneColor(newZonesData[item.id!]);
        }
      });
      
      setZonesData(newZonesData);
    };
    
    initZone();
    
    intervalIdRef.current = setInterval(() => {
      zones.forEach(item => {
        if (typeof zonesData[item.id!] !== "undefined") {
          updateZoneColor(zonesData[item.id!]);
        }
      });
    }, 1000);
    
    // Cleanup interval on unmount
    return () => {
      if (intervalIdRef.current) {
        clearInterval(intervalIdRef.current);
      }
    };
  }, [zones, zonesData]);
  
  // Set zone color based on owner
  const setZoneColor = (item: ZoneData) => {
    // Using querySelectorAll to apply to all paths in the SVG
    const elements = document.querySelectorAll(`.war__maps_absoluteelement.${item.zone} svg path`);
    if (elements.length === 0) return;
    
    if (!item.isWar) {
      let color = `rgb(255, 255, 255)`;
      if (item.color && item.color.length) {
        color = `rgb(${item.color[0]},${item.color[1]},${item.color[2]})`;
      }
      
      elements.forEach(element => {
        (element as SVGElement).style.fill = color;
        (element as SVGElement).style.stroke = color;
      });
    }
  };
  
  // Update zone color during war (flashing effect)
  const updateZoneColor = (item: ZoneData) => {
    if (!item.isWar) return;
    
    // Using querySelectorAll to apply to all paths in the SVG
    const elements = document.querySelectorAll(`.war__maps_absoluteelement.${item.zone} svg path`);
    if (elements.length === 0) return;
    
    let color = `rgb(255, 255, 255)`;
    if (item.protectingColor && item.protectingColor.length) {
      color = `rgb(${item.protectingColor[0]}, ${item.protectingColor[1]}, ${item.protectingColor[2]})`;
    }
    
    let color2 = `rgb(255, 0, 0)`;
    if (item.attackingColor && item.attackingColor.length) {
      color2 = `rgb(${item.attackingColor[0]}, ${item.attackingColor[1]}, ${item.attackingColor[2]})`;
    }
    
    const newZonesData = { ...zonesData };
    
    if (typeof item.isTick === "undefined") {
      newZonesData[item.id!].isTick = true;
    }
    
    if (item.isTick) {
      elements.forEach(element => {
        (element as SVGElement).style.fill = color2;
        (element as SVGElement).style.stroke = color2;
      });
      newZonesData[item.id!].isTick = false;
    } else {
      elements.forEach(element => {
        (element as SVGElement).style.fill = color;
        (element as SVGElement).style.stroke = color;
      });
      newZonesData[item.id!].isTick = true;
    }
    
    setZonesData(newZonesData);
  };
  
  // Event handlers
  const handleGlobalMouseMove = (event: React.MouseEvent) => {
    if (isDown) {
      setSpeed(prev => {
        const newSpeed = prev + 1;
        if (newSpeed % 15 === 0) {
          setOffsetX(event.nativeEvent.offsetX);
          setOffsetY(event.nativeEvent.offsetY);
        }
        return newSpeed;
      });
      
      setAwaitCount(prev => {
        const newCount = prev + 1;
        if (newCount < 4) return newCount;
        
        setPosXToMap(prev => Math.max(0, Math.min(prev - 0.15 * (event.nativeEvent.offsetX - offsetX), width)));
        setPosYToMap(prev => Math.max(0, Math.min(prev - 0.15 * (event.nativeEvent.offsetY - offsetY), height)));
        
        return 0;
      });
    } else {
      setOffsetX(event.nativeEvent.offsetX);
      setOffsetY(event.nativeEvent.offsetY);
    }
  };
  
  const handleGlobalMouseUp = () => {
    setIsDown(false);
  };
  
  const handleGlobalMouseDown = () => {
    setIsDown(true);
    onSelectItem(null);
  };
  
  // Only render if getPosition is valid
  if (!getPosition) return null;
  
  return (
    <div 
      className="war__maps_wrapper" 
      onMouseMove={handleGlobalMouseMove} 
      onMouseUp={handleGlobalMouseUp}
      ref={mapsWrapperRef}
    >
      <div 
        className="war__maps_container" 
        style={{ top: `-${posYToMap}px`, left: `-${posXToMap}px` }}
      >
        {initialZonesList.map((item, index) => (
          <div 
            key={index}
            className={`war__maps_absoluteelement ${item.zone} ${selectItem && selectItem.id === index ? 'active' : ''} ${isDown ? 'unEvents' : ''}`}
            onClick={() => onSelectItem({ ...item, id: index })}
            style={item.position || {}}
          >
            <item.element />
          </div>
        ))}
        
        {mapImage && (
          <div 
            className="war__maps_image" 
            onMouseDown={handleGlobalMouseDown}
            style={{ backgroundImage: `url(${mapImage})` }} 
          />
        )}
      </div>
    </div>
  );
};

// Define the initial zones list with positioning information
const initialZonesList: ZoneData[] = [
    {
        name: "Аэропорт 1",
        descr: "Позволяет контролировать импорт и экспорт товаров штата",
        zone: "airport1",
        element: airport1,
        owner: "",
        color: null
    },
    {
        name: "Аэропорт 2",
        descr: "Позволяет контролировать импорт и экспорт товаров штата",
        zone: "airport2",
        element: airport2,
        owner: "",
        color: null
    },
    {
        name: "Автосервис",
        descr: "Позволяет получать часть прибыли от работы механиков",
        zone: "mech",
        element: mech,
        owner: "",
        color: null
    },
    {
        name: "Автобусный парк",
        descr: "Позволяет получать часть прибыли водителей автобусов",
        zone: "buspark",
        element: buspark,
        owner: "",
        color: null
    },
    {
        name: "Театр",
        descr: "Позволяет получать часть прибыли от посетителей",
        zone: "theatre",
        element: theatre,
        owner: "",
        color: null
    },
    {
        name: "Аренда велосипедов",
        descr: "Позволяет получать часть прибыли от аренды велосипедов",
        zone: "bikerent",
        element: bikerent,
        owner: "",
        color: null
    },
    {
        name: "Аренда лодок",
        descr: "Позволяет получать часть прибыли от аренды лодок",
        zone: "boatrent",
        element: boatrent,
        owner: "",
        color: null
    },
    {
        name: "Аренда офф-роад машин",
        descr: "Позволяет получать часть прибыли от аренды офф-роад машин",
        zone: "offroadrent",
        element: offroadrent,
        owner: "",
        color: null
    },
    {
        name: "Газонокосилки",
        descr: "Позволяет получать часть прибыли от работников газонокосилок",
        zone: "jobgason",
        element: jobgason,
        owner: "",
        color: null
    },
    {
        name: "Рынок",
        descr: "Позволяет получать часть прибыли от продаж на рынке",
        zone: "rynok",
        element: rynok,
        owner: "",
        color: null
    },
    {
        name: "Авторынок",
        descr: "Позволяет получать часть прибыли от продаж на авторынке",
        zone: "autorynok",
        element: autorynok,
        owner: "",
        color: null
    },
    {
        name: "Гос. шахта",
        descr: "Позволяет получать часть ресурсов от добычи на гос. шахте",
        zone: "gosshahta",
        element: gosshahta,
        owner: "",
        color: null
    },
    {
        name: "Шахта 1",
        descr: "Позволяет получать часть ресурсов от добычи на шахте",
        zone: "shahta1",
        element: shahta1,
        owner: "",
        color: null
    },
    {
        name: "Шахта 2",
        descr: "Позволяет получать часть ресурсов от добычи на шахте",
        zone: "shahta2",
        element: shahta2,
        owner: "",
        color: null
    },
    {
        name: "Шахта 3",
        descr: "Позволяет получать часть ресурсов от добычи на шахте",
        zone: "shahta3",
        element: shahta3,
        owner: "",
        color: null
    },
    {
        name: "Шахта 4",
        descr: "Позволяет получать часть ресурсов от добычи на шахте",
        zone: "shahta4",
        element: shahta4,
        owner: "",
        color: null
    },
    {
        name: "Стоянка дальнобойщиков",
        descr: "Позволяет получать часть прибыли от работы дальнобойщиков",
        zone: "dalnoboi",
        element: dalnoboi,
        owner: "",
        color: null
    },
    {
        name: "Склад 1",
        descr: "Позволяет хранить различные товары",
        zone: "sklad1",
        element: sklad1,
        owner: "",
        color: null
    },
    {
        name: "Склад 2",
        descr: "Позволяет хранить различные товары",
        zone: "sklad2",
        element: sklad2,
        owner: "",
        color: null
    },
    {
        name: "Завод 1",
        descr: "Позволяет получать часть прибыли от работы завода",
        zone: "zavod",
        element: zavod,
        owner: "",
        color: null
    },
    {
        name: "Химическая лаборатория",
        descr: "Позволяет получать часть прибыли от работы химической лаборатории",
        zone: "himlab",
        element: himlab,
        owner: "",
        color: null
    },
    {
        name: "Стоянка инкассаторов",
        descr: "Позволяет получать часть прибыли от работы инкассаторов",
        zone: "inkas",
        element: inkas,
        owner: "",
        color: null
    },
    {
        name: "Казино",
        descr: "Позволяет получать часть прибыли казино",
        zone: "casino",
        element: casino,
        owner: "",
        color: null
    },
    {
        name: "Лесные ресурсы 1",
        descr: "Позволяет получать часть ресурсов от добычи на лесопилке",
        zone: "forest1",
        element: forest1,
        owner: "",
        color: null
    },
    {
        name: "Лесные ресурсы 2",
        descr: "Позволяет получать часть ресурсов от добычи на лесопилке",
        zone: "forest2",
        element: forest2,
        owner: "",
        color: null
    },
    {
        name: "Лесные ресурсы 3",
        descr: "Позволяет получать часть ресурсов от добычи на лесопилке",
        zone: "forest3",
        element: forest3,
        owner: "",
        color: null
    },
    {
        name: "Лесные ресурсы 4",
        descr: "Позволяет получать часть ресурсов от добычи на лесопилке",
        zone: "forest4",
        element: forest4,
        owner: "",
        color: null
    },
    {
        name: "Лесные ресурсы 5",
        descr: "Позволяет получать часть ресурсов от добычи на лесопилке",
        zone: "forest5",
        element: forest5,
        owner: "",
        color: null
    },
    {
        name: "Арена",
        descr: "Позволяет получать часть прибыли от боёв на арене",
        zone: "arena",
        element: arena,
        owner: "",
        color: null
    },
    {
        name: "Охотничий магазин",
        descr: "Позволяет получать часть прибыли от работы охотничьего магазина",
        zone: "huntingshop",
        element: huntingshop,
        owner: "",
        color: null
    },
    {
        name: "Электростанция",
        descr: "Позволяет получать часть прибыли от работы электриков",
        zone: "electric",
        element: electric,
        owner: "",
        color: null
    },
    {
        name: "Риэлторское агенство",
        descr: "Позволяет получать часть прибыли от работы риэлторского агенства",
        zone: "rielt",
        element: rielt,
        owner: "",
        color: null
    },
    {
        name: "Центр Kortz",
        descr: "Позволяет получать часть прибыли от посетителей",
        zone: "observatorya",
        element: observatorya,
        owner: "",
        color: null
    },
    {
        name: "Таксопарк",
        descr: "Позволяет получать часть прибыли от работы таксистов",
        zone: "taxi",
        element: taxi,
        owner: "",
        color: null
    },
    {
        name: "Продажа марихуаны 1",
        descr: "Позволяет получать часть прибыли от продажи марихуаны",
        zone: "drugs",
        element: drugs,
        owner: "",
        color: null
    },
    {
        name: "Продажа марихуаны 2",
        descr: "Позволяет получать часть прибыли от продажи марихуаны",
        zone: "drugs2",
        element: drugs2,
        owner: "",
        color: null
    },
    {
        name: "Чёрный рынок",
        descr: "Позволяет получать часть прибыли от продаж на чёрном рынке",
        zone: "darkshop",
        element: darkshop,
        owner: "",
        color: null
    },
    {
        name: "Порт",
        descr: "Позволяет контролировать импорт и экспорт товаров штата",
        zone: "port",
        element: port,
        owner: "",
        color: null
    },
    {
        name: "Завод 2",
        descr: "Позволяет получать часть прибыли от работы завода",
        zone: "zavod2",
        element: zavod2,
        owner: "",
        color: null
    },
    {
        name: "Склад 3",
        descr: "Позволяет хранить различные товары",
        zone: "sklad3",
        element: sklad3,
        owner: "",
        color: null
    },
    {
        name: "Склад 4",
        descr: "Позволяет хранить различные товары",
        zone: "sklad4",
        element: sklad4,
        owner: "",
        color: null
    },
    {
        name: "Склад 5",
        descr: "Позволяет хранить различные товары",
        zone: "sklad5",
        element: sklad5,
        owner: "",
        color: null
    },
    {
        name: "Склад 6",
        descr: "Позволяет хранить различные товары",
        zone: "sklad6",
        element: sklad6,
        owner: "",
        color: null
    },
    {
        name: "Нефтедобывающее предприятие 1",
        descr: "Позволяет получать часть прибыли от добычи нефти",
        zone: "oil",
        element: oil,
        owner: "",
        color: null
    },
    {
        name: "Нефтедобывающее предприятие 2",
        descr: "Позволяет получать часть прибыли от добычи нефти",
        zone: "oil2",
        element: oil2,
        owner: "",
        color: null
    },
    {
        name: "Нефтедобывающее предприятие 3",
        descr: "Позволяет получать часть прибыли от добычи нефти",
        zone: "oil3",
        element: oil3,
        owner: "",
        color: null
    },
    {
        name: "Нефтедобывающее предприятие 4",
        descr: "Позволяет получать часть прибыли от добычи нефти",
        zone: "oil4",
        element: oil4,
        owner: "",
        color: null
    },
    {
        name: "Бар на острове",
        descr: "Позволяет получать часть прибыли от бара",
        zone: "landbar",
        element: landbar,
        owner: "",
        color: null
    },
    {
        name: "Театр 2",
        descr: "Позволяет получать часть прибыли от посетителей",
        zone: "theatre2",
        element: theatre2,
        owner: "",
        color: null
    },
    {
        name: "Ветряная электростанция 1",
        descr: "Позволяет получать часть прибыли от добычи электричества",
        zone: "vetryanaya1",
        element: vetryanaya1,
        owner: "",
        color: null
    },
    {
        name: "Ветряная электростанция 2",
        descr: "Позволяет получать часть прибыли от добычи электричества",
        zone: "vetryanaya2",
        element: vetryanaya2,
        owner: "",
        color: null
    },
    {
        name: "Ветряная электростанция 3",
        descr: "Позволяет получать часть прибыли от добычи электричества",
        zone: "vetryanaya3",
        element: vetryanaya3,
        owner: "",
        color: null
    },
    {
        name: "Склад 7",
        descr: "Позволяет хранить различные товары",
        zone: "sklad7",
        element: sklad7,
        owner: "",
        color: null
    },
    {
        name: "Ферма 1",
        descr: "Позволяет выращивать ресурсы для дальнейшей продажи",
        zone: "farm1",
        element: farm1,
        owner: "",
        color: null
    },
    {
        name: "Ферма 2",
        descr: "Позволяет выращивать ресурсы для дальнейшей продажи",
        zone: "farm2",
        element: farm2,
        owner: "",
        color: null
    },
    {
        name: "Ферма 3",
        descr: "Позволяет выращивать ресурсы для дальнейшей продажи",
        zone: "farm3",
        element: farm3,
        owner: "",
        color: null
    },
    {
        name: "Ферма 4",
        descr: "Позволяет выращивать ресурсы для дальнейшей продажи",
        zone: "farm4",
        element: farm4,
        owner: "",
        color: null
    },
    {
        name: "Ферма 5",
        descr: "Позволяет выращивать ресурсы для дальнейшей продажи",
        zone: "farm5",
        element: farm5,
        owner: "",
        color: null
    },
    {
        name: "Ферма 6",
        descr: "Позволяет выращивать ресурсы для дальнейшей продажи",
        zone: "farm6",
        element: farm6,
        owner: "",
        color: null
    },
    {
        name: "Ферма 7",
        descr: "Позволяет выращивать ресурсы для дальнейшей продажи",
        zone: "farm7",
        element: farm7,
        owner: "",
        color: null
    },
    {
        name: "Ферма 8",
        descr: "Позволяет выращивать ресурсы для дальнейшей продажи",
        zone: "farm8",
        element: farm8,
        owner: "",
        color: null
    },
    {
        name: "Железнодорожная станция",
        descr: "Позволяет контролировать импорт и экспорт товаров штата",
        zone: "vokzal",
        element: vokzal,
        owner: "",
        color: null
    },
    {
        name: "Аренда гоночных машин",
        descr: "Позволяет получать часть прибыли от аренды гоночных машин",
        zone: "speedcarrent",
        element: speedcarrent,
        owner: "",
        color: null
    },
]

// Define CSS file (warmap.css) with the following content:
/*
.war__maps_wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  user-select: none;
}

.war__maps_container {
  position: absolute;
  width: 8192px;
  height: 8192px;
}

.war__maps_image {
  position: absolute;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-repeat: no-repeat;
  cursor: move;
  z-index: 0;
}

.war__maps_absoluteelement {
  position: absolute;
  cursor: pointer;
  z-index: 1;
  width: 100px;
  height: 100px;
}

.war__maps_absoluteelement svg {
  width: 100%;
  height: 100%;
}

.war__maps_absoluteelement.active path {
  stroke-width: 3px !important;
  stroke: yellow !important;
}

.war__maps_absoluteelement.unEvents {
  pointer-events: none;
}
*/

export default WarMap;