import React, { useState, useEffect } from 'react';
import { executeClient } from '#/shared/api/rage';
import HouseBuyPanel from './elements/housebuypanel';
import HousePopup from './elements/popup';
// import './index.css';

interface HouseBuyProps {
  viewData?: {
    id: number;
    class: number;
    price?: number;
    gosPrice: number;
    upgrades?: string[];
    location?: string;
  };
}

const HouseBuy: React.FC<HouseBuyProps> = ({ viewData: initialViewData }) => {
  // Default values if viewData is not provided
  const defaultViewData = {
    id: 0,
    class: 0,
    gosPrice: 0,
    price: 0,
  };

  // Use the provided viewData or fallback to default
  const [viewData] = useState(initialViewData || defaultViewData);
  const [buyConfirm, setBuyConfirm] = useState<boolean>(false);

  // Handle keyboard events
  useEffect(() => {
    const handleKeyUp = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'Enter':
          onBuy();
          break;
        case 'Escape':
          onExit();
          break;
      }
    };

    // Add event listener
    window.addEventListener('keyup', handleKeyUp);

    // Clean up
    return () => {
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [buyConfirm]); // Re-add event listener when buyConfirm changes

  // Buy house handler
  const onBuy = () => {
    if (!buyConfirm) {
      setBuyConfirm(true);
    } else {
      executeClient("client.house.buy");
    }
  };

  // Exit handler
  const onExit = () => {
    if (buyConfirm) {
      setBuyConfirm(false);
    } else {
      executeClient("client.house.buy.exit");
    }
  };

  return (
    <>
      {buyConfirm && (
        <HousePopup 
          viewData={viewData} 
          onBuy={onBuy} 
          onExit={onExit} 
        />
      )}

      <div id="house">
        <HouseBuyPanel 
          viewData={viewData} 
          onBuy={onBuy} 
          onExit={onExit}
        />
      </div>
    </>
  );
};

export default HouseBuy;