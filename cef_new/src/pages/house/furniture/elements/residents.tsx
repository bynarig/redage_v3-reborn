import React from 'react';
import './residents.css';

interface Resident {
  name: string;
  moveInDate: string;
}

interface ResidentsComponentProps {
  // Add any props if needed
}

const ResidentsComponent: React.FC<ResidentsComponentProps> = () => {
  // Sample resident data - in a real app, this would come from props or API
  const residents: Resident[] = [
    {
      name: "Michael Shmalyansky",
      moveInDate: "27.10.2021"
    }
  ];
  
  // Number of total slots including empty ones
  const totalSlots = 4;
  
  return (
    <div className="box-column">
      <div className="house__main_menu">
        {/* Display existing residents */}
        {residents.map((resident, index) => (
          <div key={index} className="house__element">
            <div className="box-between">
              <div className="box-column">
                <div className="house__gray">Имя</div>
                <div>{resident.name}</div>
              </div>
              <div className="box-column">
                <div className="house__gray">Дата заселения</div>
                <div>{resident.moveInDate}</div>
              </div>
            </div>
          </div>
        ))}
        
        {/* Display empty slots */}
        {Array(totalSlots - residents.length).fill(null).map((_, index) => (
          <div key={`empty-${index}`} className="house__element">
            <div className="house_element_center">
              Свободно
            </div>
          </div>
        ))}
      </div>
      
      <div className="house__info small m-0 margin-none">
        Список подселённых в дом жильцов.
      </div>
    </div>
  );
};

export default ResidentsComponent;