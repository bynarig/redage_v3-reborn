import React from 'react';
import { businessType } from '#/shared/data/realEstate';
import { format } from '#/shared/api/formatter';


interface BusinessData extends Array<string | number> {
  0: number; // Business ID
  1: number; // Business type ID
  2: number; // Business price
  // Other business data
}

interface RieltBusinessProps {
  businessData: BusinessData[];
  onSelectData: (business: BusinessData, type: string) => void;
}

const RieltBusiness: React.FC<RieltBusinessProps> = ({ businessData, onSelectData }) => {
  // Format numbers with fallback if needed
  const formatMoney = (value: number): string => {
    if (typeof format === 'function') {
      return format("money", value).toLocaleString();
    }
    return value.toLocaleString();
  };
  
  return (
    <div className="rielt__rielt_grid">
      {businessData.map((business, index) => (
        <div 
          key={index} 
          className="houseicon-check rielt__rielt_element" 
          onClick={() => onSelectData(business, "business")}
        >
          <div className="absolute">
            <div className="rielt__rielt_number">#{business[0]}</div>
            <div className="houseicon-garage rielt__rielt_icon"></div>
            <div className="rielt__gray">
              {businessType?.[business[1] as number] || `Тип ${business[1]}`}
            </div>
            <div className="rielt__rielt_price">
              ${formatMoney(business[2] as number)}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RieltBusiness;