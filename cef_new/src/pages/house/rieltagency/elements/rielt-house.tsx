import React, { useState, useEffect } from 'react';
import { houseType } from '#/shared/data/realEstate';
import { format } from '#/shared/api/formatter';


interface HouseData extends Array<string | number> {
  0: number; // House ID
  1: number; // House type ID
  2: number; // House price
  // Other house data
}

interface RieltHouseProps {
  houseData: HouseData[];
  onSelectData: (house: HouseData, type: string) => void;
}

const RieltHouse: React.FC<RieltHouseProps> = ({ houseData, onSelectData }) => {
  // Initialize sort type with '0' (default house type)
  const [sortType, setSortType] = useState<number[]>([0]);
  const [sortData, setSortData] = useState<HouseData[]>([]);

  // Update sorted data whenever sortType or houseData changes
  useEffect(() => {
    if (sortType && houseData) {
      setSortData(houseData.filter(el => filterCheck(el[1] as number, sortType)));
    }
  }, [sortType, houseData]);

  // Add or remove house type from filter
  const addSort = (index: number) => {
    setSortType(prevSortType => {
      const i = prevSortType.findIndex(a => a === index);
      
      if (i !== -1) {
        // Remove the type if it's already in the filter
        const newSortType = [...prevSortType];
        newSortType.splice(i, 1);
        return newSortType;
      } else {
        // Add the type to the filter
        return [...prevSortType, index];
      }
    });
  };

  // Check if a house type is in the filter
  const filterCheck = (type: number, data: number[]): boolean => {
    return data.includes(type);
  };

  // Format numbers with fallback if needed
  const formatMoney = (value: number): string => {
    if (typeof format === 'function') {
      return format("money", value).toLocaleString();
    }
    return value.toLocaleString();
  };
  
  return (
    <>
      <div className="rielt__checkbox_menu">
        {houseType?.map((name, index) => (
          name !== "Парковка" && (
            <div 
              key={index} 
              className="box-flex" 
              onClick={() => addSort(index)}
            >
              <input 
                className="rielt__checkbox" 
                type="checkbox" 
                id={`scales_${index}`} 
                name={`scales_${index}`} 
                checked={sortType.includes(index)}
                readOnly // React requires readOnly since we're controlling this with onClick
              />
              <label htmlFor={`scales_${index}`}>{name}</label>
            </div>
          )
        ))}
      </div>

      {sortData.length > 0 ? (
        <div className="rielt__rielt_grid">
          {sortData.map((house, index) => (
            <div 
              key={index} 
              className="houseicon-check rielt__rielt_element" 
              onClick={() => onSelectData(house, "house")}
            >
              <div className="absolute">
                <div className="rielt__rielt_number">#{house[0]}</div>
                <div className="houseicon-house rielt__rielt_icon"></div>
                <div className="rielt__gray">
                  {houseType?.[house[1] as number] || `Класс ${house[1]}`}
                </div>
                <div className="rielt__rielt_price">
                  ${formatMoney(house[2] as number)}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="houseicon-time rielt__rielt_none">
          <div className="absolute">
            <div className="rielt__rielt_title font-36">
              Домов выбранных типов в продаже: 0
            </div>
            <div className="rielt__rielt_subtitle">Ожидайте</div>
          </div>
        </div>
      )}
    </>
  );
};

export default RieltHouse;