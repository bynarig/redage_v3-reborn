import React from 'react';
import { businessType } from '#/shared/data/realEstate';
import { format } from '#/shared/api/formatter';


interface BrieltInfoProps {
  selectData: (string | number)[];
  buyPrice: number;
}

const BrieltInfo: React.FC<BrieltInfoProps> = ({ selectData, buyPrice }) => {
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
      <div className="rielt__rielt_header">Бизнес №{selectData[0]}</div>
      <div className="rielt__gray">Замечательный бизнес по доступной цене</div>
      <div className="rielt__rielt_stat">
        <div className="rielt__rielt_element">
          <div className="rielt__gray">Налоги:</div>
          <div>{selectData[3]}</div>
        </div>
        <div className="rielt__rielt_element">
          <div className="rielt__gray">Тип:</div>
          <div>{businessType?.[selectData[1] as number] || `Тип ${selectData[1]}`}</div>
        </div>
        <div className="rielt__rielt_element">
          <div className="rielt__gray">Гос. цена:</div>
          <div>${formatMoney(selectData[2] as number)}</div>
        </div>
      </div>
      <div className="box-column">
        <div className="rielt__rielt_price">${formatMoney(buyPrice)}</div>
        <div className="rielt__gray">Цена:</div>
      </div>
    </div>
  );
};

export default BrieltInfo;