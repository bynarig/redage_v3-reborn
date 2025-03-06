import React, { useState, useEffect } from 'react';
import { executeClient } from '#/shared/api/rage';
import './main.sass';
import './fonts/style.css';

// Import components
import HouseParking from './elements/parking';
import PopupUpdateGarage from './elements/popupUpdateGarage';
import { ENVIRONMENT } from '#/env';

// Mock store for development
interface Store {
  selectPopup: string | null;
  popupData: Record<string, any>;
}

type PopupType = 'popupUpdateGarage' | null;

const HouseMenu: React.FC = () => {
  // State to manage active popup
  const [selectPopup, setSelectPopup] = useState<PopupType>(null);
  const [popupData, setPopupData] = useState<Record<string, any>>({});

  // Setup mock store for development
  useEffect(() => {
    if (ENVIRONMENT === 'development') {
      // For demonstration, we can set this to show the garage popup initially
      // setSelectPopup('popupUpdateGarage');
      
      // Or add a keyboard shortcut to toggle popups
      const handleDemoToggle = (event: KeyboardEvent) => {
        if (event.key === 'u') {
          setSelectPopup(prev => prev ? null : 'popupUpdateGarage');
        }
      };
      
      window.addEventListener('keydown', handleDemoToggle);
      
      return () => {
        window.removeEventListener('keydown', handleDemoToggle);
      };
    }
  }, []);

  // Handle keyboard events
  useEffect(() => {
    const handleKeyUp = (event: KeyboardEvent) => {
      const { key, keyCode } = event;
      
      if (key === 'Escape' || keyCode === 27) {
        onExit();
      }
    };
    
    window.addEventListener('keyup', handleKeyUp);
    
    return () => {
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [selectPopup]);

  const onExit = () => {
    if (!selectPopup) {
      console.log('Closing parking menu');
      executeClient("client.parking.close");
    } else {
      console.log('Closing popup');
      setSelectPopup(null);
      setPopupData({});
    }
  };

  // Function to open a popup with data
  const openPopup = (popup: PopupType, data: Record<string, any> = {}) => {
    setSelectPopup(popup);
    setPopupData(data);
  };

  // Render the appropriate popup component based on selectPopup
  const renderPopup = () => {
    switch (selectPopup) {
      case 'popupUpdateGarage':
        return <PopupUpdateGarage onClose={() => setSelectPopup(null)} />;
      default:
        return null;
    }
  };

  return (
    <>
      {/* Render active popup if any */}
      {renderPopup()}
      
      {/* Main content */}
      <div id="house">
        <HouseParking onExit={onExit} />
      </div>
    </>
  );
};

// Add mock exports for use in other components during development
export const houseMenuStore = {
  openPopup: (popup: PopupType, data: Record<string, any> = {}) => {
    console.log(`[DEV] Opening popup: ${popup}`);
    // This would be implemented using context or redux in a real app
  }
};

export default HouseMenu;