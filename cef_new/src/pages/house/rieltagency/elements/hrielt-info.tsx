import React from 'react';
import { houseType } from '#/shared/data/realEstate';
import { format } from '#/shared/api/formatter';


interface HRieltInfoProps {
  selectData: (string | number)[];
  buyPrice: number;
}

const HRieltInfo: React.FC<HRieltInfoProps> = ({ selectData, buyPrice }) => {
  // Format numbers with fallback if needed
  const formatMoney = (value: number): string => {
    if (typeof format === 'function') {
      return format("money", value).toLocaleString();
    }
    return value.toLocaleString();
  };
  
  return (
    <div className="rielt__rielt_info">
      <div className="houseicon-house rielt__rielt_house-icon"></div>
      <div className="rielt__rielt_header">Дом №{selectData[0]}</div>
      <div className="rielt__gray">Замечательный дом по доступной цене</div>
      <div className="rielt__rielt_stat">
        <div className="rielt__rielt_element">
          <div className="rielt__gray">Налоги:</div>
          <div>{selectData[3]}</div>
        </div>
        <div className="rielt__rielt_element">
          <div className="rielt__gray">Класс:</div>
          <div>{houseType?.[selectData[1] as number] || `Класс ${selectData[1]}`}</div>
        </div>
        <div className="rielt__rielt_element">
          <div className="rielt__gray">Гаражных мест:</div>
          <div>{selectData[4]}</div>
        </div>
        <div className="rielt__rielt_element">
          <div className="rielt__gray">Гос. цена:</div>
          <div>${formatMoney(selectData[2] as number)}</div>
        </div>
      </div>
      <div className="box-column">
        <div className="rielt__rielt_price">
          ${formatMoney(((selectData[1] as number) + 1) * buyPrice)}
        </div>
        <div className="rielt__gray">Цена за сведения:</div>
      </div>
    </div>
  );
};

export default HRieltInfo;