import React from 'react';
import { translateText } from '#/shared/locale';
import { executeClient } from '#/shared/api/rage';

interface ItemProps {
  id: number;
  icon: string;
  text: string;
  price: number;
  onSelectItem: (id: number) => void;
  selectItem: number;
  lvl?: number | false;
}

const Item: React.FC<ItemProps> = ({ 
  id, 
  icon, 
  text, 
  price, 
  onSelectItem, 
  selectItem,
  lvl = false 
}) => {
  const onSelect = (index: number) => {
    onSelectItem(index);
    executeClient('client.custom.item', index);
  };

  const onBuy = () => {
    executeClient('client.custom.buy');
  };

  return (
    <li 
      className={`listitems ${selectItem === id ? 'active' : ''}`} 
      id={String(id)} 
      onClick={onBuy} 
      onMouseEnter={() => onSelect(id)}
    >
      <i className={`icon ilsc-${icon}`}></i>
      <div className="flex un">
        {lvl !== false && (
          <div className="title headersm">
            <span>{translateText('vehicle', 'Уровень')}</span>
            <ul className="lvl">
              {Array(4).fill(0).map((_, index) => (
                <li 
                  key={index} 
                  className={`star ${index < Number(lvl) ? 'active' : ''}`}
                ></li>
              ))}
            </ul>
          </div>
        )}
      
        <div className="desc" dangerouslySetInnerHTML={{ __html: text }}></div>
        <div className="price">{price} <span>$</span></div>                        
      </div>                        
    </li>
  );
};

export default Item;