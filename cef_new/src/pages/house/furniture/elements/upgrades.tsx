import React, { useState } from 'react';


interface Upgrade {
  id: number;
  name: string;
  description: string;
  icon: string;
  price: number | string;
  purchased: boolean;
  onClick?: () => void;
}

interface UpgradesComponentProps {
  onUpgradeSelect?: (upgrade: Upgrade) => void;
}

const UpgradesComponent: React.FC<UpgradesComponentProps> = ({ onUpgradeSelect }) => {
  // Sample upgrades data
  const [upgrades] = useState<Upgrade[]>([
    {
      id: 1,
      name: "Домашняя аптечка",
      description: "Добавляет в дом аптечку, для быстрого лечения.",
      icon: "houseicon-medkit",
      price: "Куплено",
      purchased: true
    },
    {
      id: 2,
      name: "Взломоустойчивый сейф",
      description: "Добавляет в дом сейф, для хранения предметов. Нельзя взломать.",
      icon: "houseicon-safe",
      price: 100000,
      purchased: false
    },
    {
      id: 3,
      name: "Домашняя аптечка",
      description: "Добавляет в дом аптечку, для быстрого лечения.",
      icon: "houseicon-medkit",
      price: 100000,
      purchased: false
    },
    {
      id: 4,
      name: "Взломоустойчивый сейф",
      description: "Добавляет в дом сейф, для хранения предметов. Нельзя взломать.",
      icon: "houseicon-safe",
      price: 100000,
      purchased: false
    }
  ]);
  
  const handleUpgradeClick = (upgrade: Upgrade) => {
    if (onUpgradeSelect && !upgrade.purchased) {
      onUpgradeSelect(upgrade);
    }
  };
  
  const formatPrice = (price: number | string): string => {
    if (typeof price === 'number') {
      return `$${price.toLocaleString()}`;
    }
    return price.toString();
  };
  
  return (
    <div className="box-column">
      <div className="house__main_menu">
        {upgrades.map((upgrade) => (
          <div 
            key={upgrade.id} 
            className="house__element"
            onClick={() => handleUpgradeClick(upgrade)}
          >
            <div className="line"></div>
            <div className="box-between">
              <div className={`${upgrade.icon} house__element_icon`}></div>
              <div className="box-column">
                <div>{upgrade.name}</div>
                <div className="house__info small margin-none house__gray">
                  {upgrade.description}
                </div>
              </div>
              <div className="green">{formatPrice(upgrade.price)}</div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="house__info small margin-none">
        Список доступных улучшений для вашего дома
      </div>
    </div>
  );
};

export default UpgradesComponent;