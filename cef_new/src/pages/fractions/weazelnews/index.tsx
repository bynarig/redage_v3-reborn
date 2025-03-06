import React, { useState, useEffect } from 'react';
import { translateText } from '#/shared/locale';
import { setGroup, executeClientAsyncToGroup } from '#/shared/api/rage';
import { TimeFormat } from '#/shared/api/moment';
import { useSelector } from 'react-redux';
import { RootState } from '#/shared/store';
import './main.sass';
import './assets/style.css';

// Import React components instead of Svelte components
import GovernmentComponent from './elements/gov';
import AdvertisementEditor from './elements/ads/ads';
import AdvertisementList from './elements/ads/list';
import LiveComponent from './elements/live';

// Type for views
type ViewType = 'Gov' | 'Ads' | 'List' | 'Live';

declare global {
  interface Window {
    loaderData: {
      delay: (key: string, seconds: number) => boolean;
    };
  }
}

const WeazelNews: React.FC = () => {
  // Set the group
  useEffect(() => {
    setGroup(".advert.");
  }, []);
  
  // Get character info from Redux
  const charName = useSelector((state: RootState) => state.char.Name);
  const fractionLVL = useSelector((state: RootState) => state.char.fractionLVL);
  const serverDateTime = useSelector((state: RootState) => state.server.dateTime);
  
  // Component state
  const [selectedAddId, setSelectedAddId] = useState<number | null>(null);
  const [selectView, setSelectView] = useState<ViewType>('List');
  const [count, setCount] = useState<number>(0);
  
  // Check if there's a selected ad when component mounts
  useEffect(() => {
    const checkSelectedAd = async () => {
      try {
        const result = await executeClientAsyncToGroup("getSelected");
        if (result) {
          setSelectedAddId(Number(result));
          setSelectView('Ads');
        }
      } catch (error) {
        console.error("Error checking selected ad:", error);
      }
    };
    
    checkSelectedAd();
  }, []);
  
  // Get ads count
  const getCount = async () => {
    try {
      const result = await executeClientAsyncToGroup("getAdsCount");
      if (result) {
        setCount(Number(result));
      }
    } catch (error) {
      console.error("Error getting ads count:", error);
    }
  };
  
  // Load initial count
  useEffect(() => {
    getCount();
  }, []);
  
  // Handle selecting an advertisement
  const onSelectAdvert = async (advertID: number) => {
    // Check for rate limiting
    if (!window.loaderData.delay("advert.onSelectAdvert", 1.5)) return;
    
    try {
      const result = await executeClientAsyncToGroup("isAddByID", advertID);
      if (result) {
        setSelectedAddId(advertID);
        setSelectView('Ads');
      }
    } catch (error) {
      console.error("Error selecting advertisement:", error);
    }
  };
  
  // Handle going back from ad detail view
  const onBackAdvert = () => {
    setSelectView('List');
  };
  
  // Render the active view component
  const renderActiveView = () => {
    switch (selectView) {
      case 'Gov':
        return <GovernmentComponent />;
      case 'Ads':
        return <AdvertisementEditor 
          selectedAddId={selectedAddId!} 
          onBackAdvert={onBackAdvert} 
        />;
      case 'List':
        return <AdvertisementList 
          onSelectAdvert={onSelectAdvert} 
          getCount={getCount} 
        />;
      case 'Live':
        return <LiveComponent />;
      default:
        return null;
    }
  };
  
  return (
    <div id="weazelnews">
      <div className="box-flex">
        <div className="newbuttons_button">ESC</div>
        <div className="whitecolor">{translateText('fractions', 'Закрыть')}</div>
      </div>
      
      <div className="weazelnews__planshet">
        <div className="weazelnews__head">
          <div>{TimeFormat(serverDateTime, "HH:mm DD.MM.YYYY")}</div>
          <div className="weazelnews__head_img"></div>
        </div>
        
        <div className="box-flex w-100">
          {/* Navigation Sidebar */}
          <div className="weazelnews__nav">
            <div className="weazelnews__nav_logo"></div>
            <div className="line"></div>
            
            {/* Commented out in original */}
            {/*
            <div 
              className={`weazelnews__nav_element mt-24 ${selectView === 'Gov' ? 'active' : ''}`}
              onClick={() => setSelectView('Gov')}
            >
              <span className="bortovoiicon-news"></span>
              <div className="weazelnews__nav_text">Государственная волна</div>
            </div>
            */}
            
            <div 
              className={`weazelnews__nav_element mt-24 ${selectView === 'Ads' || selectView === 'List' ? 'active' : ''}`}
              onClick={() => setSelectView('List')}
            >
              <span className="bortovoiicon-list"></span>
              <div className="weazelnews__nav_text">
                {translateText('fractions', 'Объявления')} 
                <span className="red">{count}</span>
              </div>
            </div>
            
            <div 
              className={`weazelnews__nav_element ${selectView === 'Live' ? 'active' : ''}`}
              onClick={() => setSelectView('Live')}
            >
              <span className="bortovoiicon-call"></span>
              <div className="weazelnews__nav_text">
                {translateText('fractions', 'Прямой эфир')}
              </div>
            </div>
            
            <div className="line mt-24"></div>
            <div className="line mt-auto"></div>
            
            <div className="box-column">
              <div className="weazelnews__name mt-24">{charName}</div>
              <div className="weazelnews__rank">{fractionLVL}</div>
            </div>
            
            <div className="line mt-24"></div>
            <div className="weazelnews__flag"></div>
          </div>
          
          {/* Main Content Area */}
          <div className="weazelnews__main">
            {renderActiveView()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeazelNews;