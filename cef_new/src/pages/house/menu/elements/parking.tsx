import React, { useState, useEffect } from 'react';

import { executeClient, executeClientAsync } from '#/shared/api/rage';
import { hasJsonStructure } from '#/shared/api/functions';
import { ENVIRONMENT } from '#/env';

// Mock data for development
const MOCK_VEHICLE_MODELS_TO_MOTO = ['faggio', 'pcj', 'bati', 'akuma', 'hakuchou', 'double', 'bf400'];

const MOCK_COLOR_DATA: Record<string | number, string> = {
  0: 'rgba(0, 0, 0, 1)',
  1: 'rgba(255, 255, 255, 1)',
  2: 'rgba(255, 0, 0, 1)',
  3: 'rgba(0, 255, 0, 1)',
  4: 'rgba(0, 0, 255, 1)',
  5: 'rgba(255, 255, 0, 1)',
  6: 'rgba(255, 0, 255, 1)',
  7: 'rgba(0, 255, 255, 1)',
};

const MOCK_HOUSE_DATA = {
  garageType: 1,
  address: "Alta Street, Apartment 57",
  owner: "John_Doe",
  locked: false,
  price: 500000
};

const MOCK_GARAGES_DATA = [
  { MaxCars: 2, Price: 50000, Name: "Малый гараж" },
  { MaxCars: 6, Price: 150000, Name: "Средний гараж" },
  { MaxCars: 10, Price: 300000, Name: "Большой гараж" },
  { MaxCars: 20, Price: 600000, Name: "Премиум гараж" }
];

const MOCK_CARS_DATA = [
  { 
    sqlId: 1001, 
    model: "Zentorno", 
    number: "ABC123", 
    sell: true, 
    color: 2, 
    place: 0,
    isAir: false
  },
  { 
    sqlId: 1002, 
    model: "Elegy", 
    number: "XYZ789", 
    sell: true, 
    color: {Red: 255, Green: 100, Blue: 100}, 
    place: 2,
    isAir: false
  },
  { 
    sqlId: 1003, 
    model: "faggio", 
    number: "MOT001", 
    sell: false, 
    color: 6, 
    place: 4,
    isAir: false
  },
  { 
    sqlId: 1004, 
    model: "T20", 
    number: "SPD001", 
    sell: true, 
    color: {Red: 50, Green: 50, Blue: 200}, 
    isAir: false
  },
  { 
    sqlId: 1005, 
    model: "bati", 
    number: "MOT002", 
    sell: true, 
    color: 5, 
    isAir: false
  }
];

interface Car {
  sqlId: number;
  model: string;
  number: string;
  sell: boolean;
  color: number | { Red: number; Green: number; Blue: number };
  place?: number;
  isAir?: boolean;
}

interface ParkingProps {
  onExit?: () => void;
}

const ParkingComponent: React.FC<ParkingProps> = ({ onExit = () => console.log('Exit parking') }) => {
  const [houseData, setHouseData] = useState<any>(null);
  const [garagesData, setGaragesData] = useState<any[]>([]);
  const [maxParkingPlaces, setMaxParkingPlaces] = useState<number>(2);
  const [houseCars, setHouseCars] = useState<Record<number, Car>>({});
  const [selectCar, setSelectCar] = useState<Partial<Car & { place?: number }>>({});
  const [carsData, setCarsData] = useState<Car[]>([]);
  const [selectPage, setSelectPage] = useState<number>(0);
  const [isUpdate, setIsUpdate] = useState<boolean>(false);

  // For development mode, initialize with mock data
  useEffect(() => {
    if (ENVIRONMENT === 'development') {
      setHouseData(MOCK_HOUSE_DATA);
      setGaragesData(MOCK_GARAGES_DATA);
      setCarsData(MOCK_CARS_DATA);
      
      // Setup mock global objects
      if (!window.loaderData) {
        window.loaderData = {
          delay: (key: string, seconds: number) => true
        };
      }
    } else {
      // In production, fetch real data
      fetchHouseData();
      fetchGaragesData();
      updateLoad();
    }
  }, []);

  // Update maxParkingPlaces when houseData or garagesData changes
  useEffect(() => {
    updateMaxParkingPlaces();
  }, [houseData, garagesData]);

  // Process cars data whenever it changes
  useEffect(() => {
    processCarsData();
  }, [carsData]);

  const fetchHouseData = async () => {
    try {
      const result = await executeClientAsync("phone.house.houseData");
      if (hasJsonStructure(result)) {
        const parsedData = JSON.parse(result);
        setHouseData(parsedData);
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

  const updateMaxParkingPlaces = () => {
    if (houseData && houseData.garageType !== undefined && 
        garagesData && garagesData[houseData.garageType]) {
      setMaxParkingPlaces(garagesData[houseData.garageType].MaxCars);
    }
  };

  const updateLoad = async () => {
    try {
      const result = await executeClientAsync("phone.cars.getCarsList");
      if (hasJsonStructure(result)) {
        const parsedData = JSON.parse(result);
        setCarsData(parsedData);
      }
    } catch (error) {
      console.error('Error loading cars data:', error);
      // For development, use mock data
      if (ENVIRONMENT === 'development') {
        setCarsData(MOCK_CARS_DATA);
      }
    }
  };

  const processCarsData = () => {
    if (carsData.length > 0) {
      // Handle selected car
      if (selectCar && selectCar.place !== undefined) {
        const placeId = selectCar.place;
        const carIndex = carsData.findIndex(car => car.number === selectCar.number);
        if (carIndex !== -1 && carsData[carIndex]) {
          setSelectCar({
            ...carsData[carIndex],
            place: placeId
          });
        } else {
          setSelectCar({ place: placeId });
        }
      }

      // Process houseCars
      const newCarsData: Record<number, Car> = {};
      carsData.forEach(car => {
        if (car && typeof car.place === "number" && car.place >= 0) {
          newCarsData[car.place] = car;
        }
      });
      
      setHouseCars(newCarsData);
      setIsUpdate(false);
      setSelectCar({});
    }
  };

  const onLeft = () => {
    setSelectPage(prev => Math.max(0, prev - 1));
  };

  const onRight = () => {
    const count = Math.ceil(maxParkingPlaces / 10);
    setSelectPage(prev => Math.min(count - 1, prev + 1));
  };

  const handleKeyUp = (event: React.KeyboardEvent<HTMLDivElement> | KeyboardEvent) => {
    const { keyCode } = event;
    
    switch (keyCode) {
      case 37: // left arrow
        onLeft();
        break;
      case 39: // right arrow
        onRight();
        break;
      case 27: // esc
        onExit();
        break;
      case 13: // enter
        onOpen();
        break;
    }
  };

  const onSelectCar = (index: number) => {
    if (houseCars[index]) {
      setSelectCar({
        ...houseCars[index],
        place: index
      });
    } else {
      setSelectCar({ place: index });
    }
  };

  const onChangeCars = (sqlId: number) => {
    if (!window.loaderData.delay("OnChangeCars", 1)) {
      return;
    }
    
    if (isUpdate) {
      return;
    }
    
    setIsUpdate(true);
    executeClient("client.garage.parking", sqlId, selectCar.place);
    setSelectCar({});
    
    // In development, simulate the update
    if (ENVIRONMENT === 'development') {
      setTimeout(() => {
        const updatedCarsData = [...carsData];
        const carIndex = updatedCarsData.findIndex(car => car.sqlId === sqlId);
        
        if (carIndex !== -1 && selectCar.place !== undefined) {
          updatedCarsData[carIndex] = {
            ...updatedCarsData[carIndex],
            place: selectCar.place
          };
          setCarsData(updatedCarsData);
        }
        
        setIsUpdate(false);
      }, 500);
    }
  };

  const getColor = (color: number | { Red: number; Green: number; Blue: number }) => {
    if (typeof color === "number" || MOCK_COLOR_DATA[color] !== undefined) {
      return MOCK_COLOR_DATA[color];
    }
    return `rgba(${color.Red},${color.Green},${color.Blue},1)`;
  };

  const onOpen = () => {
    if (houseData && 
        houseData.garageType !== undefined && 
        garagesData && 
        garagesData[houseData.garageType + 1]) {
      console.log("Opening garage upgrade popup");
      // In a real app, this would open the upgrade popup
      // selectPopup.set("popupUpdateGarage");
    }
  };

  // Attach keyup event listener to window
  useEffect(() => {
    const handleKeyUpGlobal = (event: KeyboardEvent) => {
      handleKeyUp(event);
    };
    
    window.addEventListener('keyup', handleKeyUpGlobal);
    
    return () => {
      window.removeEventListener('keyup', handleKeyUpGlobal);
    };
  }, [selectCar, isUpdate]); // Re-add when these dependencies change

  return (
    <>
      <div className="house__parking_box">
        <div className="house__mainmenu_block parking">
          {selectCar && selectCar.place !== undefined && (
            carsData.map((car, index) => (
              car.number !== selectCar.number && !car.isAir && (
                <div 
                  key={index}
                  className="house__mainmenu_categorie" 
                  onClick={() => onChangeCars(car.sqlId)}
                >
                  <div 
                    className="line" 
                    style={{ background: getColor(car.color) }}
                  ></div>
                  {car.model.toUpperCase()} [{car.number}] {car.sell ? " (Личная)" : ""}
                </div>
              )
            ))
          )}
        </div>
        <div className="house__parking">
          <div className="house__header">Управление парковкой</div>
          <div className="house__floor">
            <div className="house__floor_lines">
              {Array(Math.ceil(maxParkingPlaces / 10)).fill(0).map((_, index) => (
                <div 
                  key={index}
                  className={`house__floor_line ${selectPage === index ? 'active' : ''}`}
                  onClick={() => setSelectPage(index)}
                />
              ))}
            </div>
            <div className="box-flex">
              <div className="house__button_white" onClick={onLeft}>&#8592;</div>
              <div className="box-column">
                <div className="house__current_floor">{selectPage + 1}</div>
                <div className="house__gray">Текущий этаж</div>
              </div>
              <div className="house__button_white" onClick={onRight}>&#8594;</div>
            </div>
          </div>
          <div className="house__parking_names">
            {Array(5).fill(0).map((_, index) => (
              index + (10 * selectPage) < maxParkingPlaces && (
                <div key={index} className="house__car_name">
                  {houseCars[index + (10 * selectPage)] ? 
                    `${houseCars[index + (10 * selectPage)].model} [${houseCars[index + (10 * selectPage)].number}]` : 
                    'Свободно'}
                </div>
              )
            ))}
          </div>
          <div className="house__parking_top">
            <div className="house__parking_places">
              {Array(5).fill(0).map((_, index) => (
                index + (10 * selectPage) < maxParkingPlaces && (
                  <div 
                    key={index} 
                    className="house__car_place top" 
                    onClick={() => onSelectCar(index + (10 * selectPage))}
                  >
                    <div className="house__car_position">{index + (10 * selectPage) + 1}</div>
                    {houseCars[index + (10 * selectPage)] ? (
                      MOCK_VEHICLE_MODELS_TO_MOTO.includes(houseCars[index + (10 * selectPage)].model.toLowerCase()) ? (
                        <div 
                          className="houseicon-bike-top house__car_image"
                          style={{ color: getColor(houseCars[index + (10 * selectPage)].color) }}
                        >
                          <div className="house__bike_details"></div>
                        </div>
                      ) : (
                        <div 
                          className="houseicon-car-top house__car_image"
                          style={{ color: getColor(houseCars[index + (10 * selectPage)].color) }}
                        >
                          <div className="house__car_details"></div>
                        </div>
                      )
                    ) : (
                      <div className="house__circle_green">+</div>
                    )}
                  </div>
                )
              ))}
            </div>
          </div>
          <div className="box-column box-center m-60">
            <div className="house__text_big">{maxParkingPlaces}</div>
            <div className="house__gray">Всего доступно мест</div>
          </div>
          <div className="house__parking_top bottom">
            <div className="house__parking_places bottom">
              {Array(5).fill(0).map((_, index) => (
                index + (5) + (10 * selectPage) < maxParkingPlaces && (
                  <div 
                    key={index} 
                    className="house__car_place top" 
                    onClick={() => onSelectCar(index + (5) + (10 * selectPage))}
                  >
                    <div className="house__car_position">{index + (5) + (10 * selectPage) + 1}</div>
                    {houseCars[index + (5) + (10 * selectPage)] ? (
                      MOCK_VEHICLE_MODELS_TO_MOTO.includes(houseCars[index + (5) + (10 * selectPage)].model.toLowerCase()) ? (
                        <div 
                          className="houseicon-bike-top house__car_image"
                          style={{ color: getColor(houseCars[index + (5) + (10 * selectPage)].color) }}
                        >
                          <div className="house__bike_details"></div>
                        </div>
                      ) : (
                        <div 
                          className="houseicon-car-top house__car_image"
                          style={{ color: getColor(houseCars[index + (5) + (10 * selectPage)].color) }}
                        >
                          <div className="house__car_details"></div>
                        </div>
                      )
                    ) : (
                      <div className="house__circle_green">+</div>
                    )}
                  </div>
                )
              ))}
            </div>
          </div>
          <div className="house__parking_names bottom">
            {Array(5).fill(0).map((_, index) => (
              index + (5) + (10 * selectPage) < maxParkingPlaces && (
                <div key={index} className="house__car_name">
                  {houseCars[index + (5) + (10 * selectPage)] ? 
                    `${houseCars[index + (5) + (10 * selectPage)].model} [${houseCars[index + (5) + (10 * selectPage)].number}]` : 
                    'Свободно'}
                </div>
              )
            ))}
          </div>
          <div className="houseicon-house house__background"></div>
        </div>
        <div className="house__mainmenu_block parking">
          {/* Right side content if needed */}
        </div>
      </div>
      <div className="box-between">
        {houseData && 
         houseData.garageType !== undefined && 
         garagesData && 
         garagesData[houseData.garageType + 1] && (
          <div className="house_bottom_buttons back" onClick={onOpen}>
            <div>Улучшить гараж</div>
            <div className="house_bottom_button">ENTER</div>
          </div>
        )}
        <div className="house_bottom_buttons esc" onClick={onExit}>
          <div>Выйти</div>
          <div className="house_bottom_button">ESC</div>
        </div>
      </div>
    </>
  );
};

// Add window type declaration
declare global {
  interface Window {
    loaderData: {
      delay: (key: string, seconds: number) => boolean;
    };
  }
}

export default ParkingComponent;