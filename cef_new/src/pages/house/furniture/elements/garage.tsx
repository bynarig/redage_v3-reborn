import React from 'react';


interface Vehicle {
  model: string;
  owner: string;
  plate: string;
}

interface GarageComponentProps {
  onSelectParkingSpot?: () => void;
}

const GarageComponent: React.FC<GarageComponentProps> = ({ onSelectParkingSpot }) => {
  // Sample vehicle data
  const vehicles: Vehicle[] = [
    { model: "Zentorno", owner: "Zdobich", plate: "AB123CD" },
    { model: "Zentorno", owner: "Zdobich", plate: "AB123CD" },
    { model: "Zentorno", owner: "Zdobich", plate: "AB123CD" },
    { model: "Zentorno", owner: "Zdobich", plate: "AB123CD" },
    { model: "Zentorno", owner: "Zdobich", plate: "AB123CD" },
    { model: "Zentorno", owner: "Zdobich", plate: "AB123CD" },
    { model: "Zentorno", owner: "Zdobich", plate: "AB123CD" },
    { model: "Zentorno", owner: "Zdobich", plate: "AB123CD" }
  ];
  
  const handleParkingSelect = () => {
    if (onSelectParkingSpot) onSelectParkingSpot();
  };
  
  return (
    <div className="box-column">
      <div 
        className="house__box_button"
        onClick={handleParkingSelect}
      >
        <div className="house__button_orange">Y</div>
        <div className="house__text_small">Выбор парковки</div>
      </div>
      
      <div className="house__main_menu">
        {vehicles.map((vehicle, index) => (
          <div key={index} className="house__element small">
            <div className="box-flex">
              <div className="houseicon-car house__garage_icon"></div>
              <div>{vehicle.model}</div>
            </div>
            <div className="box-flex">
              <div>{vehicle.owner}</div>
              <div className="house__gray ml">{vehicle.plate}</div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="house__info small m-0 margin-none">
        Список всего транспорта в гараже дома.
      </div>
    </div>
  );
};

export default GarageComponent;