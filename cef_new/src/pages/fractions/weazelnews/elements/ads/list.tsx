import React, { useState, useEffect } from 'react';
import { translateText } from '#/shared/locale';
import moment from 'moment-timezone';
import { executeClientAsyncToGroup, executeClientToGroup } from '#/shared/api/rage';
import { addListernEvent } from '#/shared/api/functions';
// import { categorieName } from "#/store/player/hudevo/phonenew/components/news/data";

interface Advertisement {
  ID: number;
  AD: string;
  Author: string;
  Link?: string;
  Type: number;
  Opened: string | number; // Timestamp or ISO string
  Editor?: string;
}

interface AdvertisementListProps {
  onSelectAdvert: (id: number) => void;
  getCount: () => void;
}

const AdvertisementList: React.FC<AdvertisementListProps> = ({ onSelectAdvert, getCount }) => {
  const [adsList, setAdsList] = useState<Advertisement[]>([]);
  
  const getList = () => {
    // Update count in parent component
    getCount();
    
    // Fetch list of advertisements
    executeClientAsyncToGroup("getAdsList").then((result) => {
      if (result && typeof result === "string") {
        try {
          const parsedList = JSON.parse(result);
          setAdsList(parsedList);
        } catch (error) {
          console.error("Error parsing advertisement list:", error);
          setAdsList([]);
        }
      }
    });
  };
  
  // Initial fetch when component mounts
  useEffect(() => {
    // Tell server we're viewing the list
    executeClientToGroup("isList", true);
    
    // Get the initial list
    getList();
    
    // Set up event listener for updates
    addListernEvent("updateListAdverts", getList);
    
    // Cleanup on unmount
    return () => {
      executeClientToGroup("isList", false);
      // Note: In a proper React implementation, we would also need to remove the event listener
      // but since 'addListernEvent' doesn't appear to have a corresponding removal method,
      // we'll have to assume it's handled elsewhere or redesigned for React
    };
  }, []);
  
  return (
    <>
      <div className="weazelnews__title">{translateText('fractions', 'Список объявлений')}</div>
      
      {Array.isArray(adsList) && adsList.length > 0 ? (
        <div className="weazelnews__comments big">
          {adsList.map((advert) => (
            <div key={advert.ID} className="weazelnews__comments_element">
              <div className="box-between">
                <div className="mr-10">{translateText('fractions', 'Объявление')} №{advert.ID}</div>
                <div 
                  className="weazelnews__button" 
                  onClick={() => onSelectAdvert(advert.ID)}
                >
                  {translateText('fractions', 'Редактировать')}
                </div>
              </div>
              
              <div className="box-flex mt-4">
                <div className="box-column mr-20">
                  <div className="weazelnews__info_title">{translateText('fractions', 'Отправитель')}:</div>
                  <div className="weazelnews__info_subtitle">{advert.Author}</div>
                </div>
                <div className="box-column">
                  <div className="weazelnews__info_title">{translateText('fractions', 'Дата и время')}:</div>
                  <div className="weazelnews__info_subtitle">
                    {moment(advert.Opened).format('HH:mm от DD.MM.YYYY')}
                  </div>
                </div>
              </div>
              
              {advert.Link && /(?:jpg|jpeg|png)/g.test(advert.Link) && (
                <>
                  <div className="weazelnews__info_title mt-20">
                    {translateText('fractions', 'Изображение')}:
                  </div>
                  <div 
                    className="weazelnews__person_image map mt-4" 
                    style={{ backgroundImage: `url(${advert.Link})` }}
                  />
                </>
              )}
              
              <div className="weazelnews__info_title mt-24">Описание:</div>
              <div className="weazelnews__info_subtitle f-regular">
                {advert.AD}
              </div>
              
              {/* {categorieName[advert.Type] && (
                <>
                  <div className="weazelnews__info_title mt-24">
                    {translateText('fractions', 'Категория')}:
                  </div>
                  <div className="weazelnews__info_subtitle f-regular">
                    {categorieName[advert.Type]}
                  </div>
                </>
              )} */}
              
              {advert.Editor && (
                <div className="box-column mt-20">
                  <div className="weazelnews__info_title">
                    {translateText('fractions', 'Редактирует')}:
                  </div>
                  <div className="weazelnews__info_subtitle">{advert.Editor}</div>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="weazelnews__info_title mt-20">
          {translateText('fractions', 'Сейчас объявлений нет, но они скоро появятся')}..
        </div>
      )}
    </>
  );
};

export default AdvertisementList;