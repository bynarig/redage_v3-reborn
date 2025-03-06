import React, { useState } from 'react';


interface ParkingProps {
  onSelectSpot?: (spot: number) => void;
  onExit?: () => void;
}

const ParkingComponent: React.FC<ParkingProps> = ({ onSelectSpot, onExit }) => {
  const [currentFloor, setCurrentFloor] = useState<number>(3);
  const [selectedVehicle, setSelectedVehicle] = useState<string>('Zentorno');
  
  const handlePrevFloor = () => {
    if (currentFloor > 1) {
      setCurrentFloor(currentFloor - 1);
    }
  };
  
  const handleNextFloor = () => {
    if (currentFloor < 4) {
      setCurrentFloor(currentFloor + 1);
    }
  };
  
  const handleSelectVehicle = (vehicle: string) => {
    setSelectedVehicle(vehicle);
  };
  
  const handleSelectSpot = (spot: number) => {
    if (onSelectSpot) onSelectSpot(spot);
  };
  
  return (
    <>
      <div className="house__parking_box">
        <div className="house__mainmenu_block parking">
          <div 
            className={`house__mainmenu_categorie ${selectedVehicle === 'Zentorno' ? 'active' : ''}`}
            onClick={() => handleSelectVehicle('Zentorno')}
          >
            <div className="line"></div>
            Zentorno
          </div>
          <div 
            className={`house__mainmenu_categorie ${selectedVehicle === 'Elevator' ? 'active' : ''}`}
            onClick={() => handleSelectVehicle('Elevator')}
          >
            <div className="line"></div>
            Elevator
          </div>
          <div 
            className={`house__mainmenu_categorie ${selectedVehicle === 'Maverick' ? 'active' : ''}`}
            onClick={() => handleSelectVehicle('Maverick')}
          >
            <div className="line"></div>
            Maverick
          </div>
        </div>
        <div className="house__parking">
          <div className="house__header">Управление парковкой</div>
          <div className="house__floor">
            <div className="house__floor_lines">
              {[1, 2, 3, 4].map((floor) => (
                <div 
                  key={floor}
                  className={`house__floor_line ${currentFloor === floor ? 'active' : ''}`}
                ></div>
              ))}
            </div>
            <div className="box-flex">
              <div 
                className="house__button_white"
                onClick={handlePrevFloor}
              >
                &#8592;
              </div>
              <div className="box-column">
                <div className="house__current_floor">{currentFloor}</div>
                <div className="house__gray">Текущий этаж</div>
              </div>
              <div 
                className="house__button_white"
                onClick={handleNextFloor}
              >
                &#8594;
              </div>
            </div>
          </div>
          <div className="house__parking_names">
            {Array(5).fill('Свободно').map((name, index) => (
              <div key={index} className="house__car_name">{name}</div>
            ))}
          </div>
          <div className="house__parking_top">
            <div className="house__parking_places">
              <div className="house__car_place top">
                <div className="house__car_position">1</div>
                <div className="houseicon-car-top house__car_image">
                  <div className="house__car_details"></div>
                </div>
              </div>
              <div 
                className="house__car_place top"
                onClick={() => handleSelectSpot(2)}
              >
                <div className="house__car_position">2</div>
                <div className="house__circle_green">
                  +
                </div>
              </div>
              <div className="house__car_place top">
                <div className="house__car_position">3</div>
                <div className="houseicon-bike-top house__car_image">
                  <div className="house__bike_details"></div>
                </div>
              </div>
              <div className="house__car_place top">
                <div className="house__car_position">4</div>
                <div className="houseicon-bike-top house__car_image">
                  <div className="house__bike_details"></div>
                </div>
              </div>
              <div className="house__car_place top">
                <div className="house__car_position">5</div>
                <div className="houseicon-car-top house__car_image">
                  <div className="house__car_details"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="box-column box-center m-60">
            <div className="house__text_big">38</div>
            <div className="house__gray">Всего доступно мест</div>
          </div>
          <div className="house__parking_top bottom">
            <div className="house__parking_places bottom">
              <div className="house__car_place">
                <div className="house__car_position">1</div>
                <div className="houseicon-car-top house__car_image">
                  <div className="house__car_details"></div>
                </div>
              </div>
              <div className="house__car_place">
                <div className="house__car_position">2</div>
                <div className="houseicon-car-top house__car_image">
                  <div className="house__car_details"></div>
                </div>
              </div>
              <div className="house__car_place">
                <div className="house__car_position">3</div>
                <div className="houseicon-bike-top house__car_image">
                  <div className="house__bike_details"></div>
                </div>
              </div>
              <div className="house__car_place">
                <div className="house__car_position">4</div>
                <div className="houseicon-bike-top house__car_image">
                  <div className="house__bike_details"></div>
                </div>
              </div>
              <div 
                className="house__car_place"
                onClick={() => handleSelectSpot(5)}
              >
                <div className="house__car_position">5</div>
                <div className="house__circle_green">
                  +
                </div>
              </div>
            </div>
          </div>
          <div className="house__parking_names bottom">
            {Array(5).fill('Свободно').map((name, index) => (
              <div key={index} className="house__car_name">{name}</div>
            ))}
          </div>
          <div className="houseicon-house house__background"></div>
        </div>
        <div className="house__mainmenu_block parking">
          {/* Right side content if needed */}
        </div>
      </div>
      <div className="box-between">
        <div 
          className="house_bottom_buttons back"
          onClick={() => onSelectSpot && onSelectSpot(1)}
        >
          <div>Выбрать</div>
          <div className="house_bottom_button">Enter</div>
        </div>
        <div 
          className="house_bottom_buttons esc"
          onClick={onExit}
        >
          <div>Выйти</div>
          <div className="house_bottom_button">ESC</div>
        </div>
      </div>
      <div className="houseicon-house house__background"></div>
    </>
  );
};

export default ParkingComponent;