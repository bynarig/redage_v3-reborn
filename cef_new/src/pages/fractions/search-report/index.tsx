import React, { useState, useEffect } from 'react';
import { translateText } from '#/shared/locale';
import { executeClient } from '#/shared/api/rage';
import './css/main.css';

interface SearchReportProps {
  viewData?: {
    Name: string;
    Weapons: string[];
    Items: string[];
  };
}

const SearchReport: React.FC<SearchReportProps> = ({ viewData }) => {
  const [name, setName] = useState<string>('');
  const [weapons, setWeapons] = useState<string[]>([]);
  const [items, setItems] = useState<string[]>([]);

  // Update state when viewData changes
  useEffect(() => {
    if (viewData) {
      if (name !== viewData.Name) {
        setName(viewData.Name);
      }
      
      if (weapons !== viewData.Weapons) {
        setWeapons(viewData.Weapons);
      }
      
      if (items !== viewData.Items) {
        setItems(viewData.Items);
      }
    }
  }, [viewData]);

  const onBtn = (id: number) => {
    executeClient('bsearch', id);
  };

  return (
    <div className="bsearch">
      <div onClick={() => onBtn(0)} className="icon-exit btn-close"></div>
      <div className="list">
        <p>{translateText('fractions', 'Имя и фамилия')}: {name}</p>
        <p>{translateText('fractions', 'Оружие')}:</p>
        <ul>
          {weapons.map((value, index) => (
            <li key={index}>{value}</li>
          ))}
        </ul>
        <p>{translateText('fractions', 'Предметы инвентаря')}:</p>
        <ul>
          {items.map((value, index) => (
            <li key={index}>{value}</li>
          ))}
        </ul>
      </div>
      <div className="btns">
        <div onClick={() => onBtn(1)} className="btn">
          {translateText('fractions', 'Лицензии')}
        </div>
        <div onClick={() => onBtn(2)} className="btn">
          {translateText('fractions', 'Паспорт')}
        </div>
      </div>
    </div>
  );
};

export default SearchReport;