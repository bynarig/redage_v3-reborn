import React, { useState, useEffect } from 'react';
import { translateText } from '#/shared/locale';
import { executeClientAsyncToGroup, executeClientToGroup } from '#/shared/api/rage';
import { format } from '#/shared/api/formatter';
// import { categorieName } from '#/store/player/hudevo/phonenew/components/news/data';

interface AdvertisementProps {
  selectedAddId: number;
  onBackAdvert: () => void;
}

interface Advertisement {
  ID: number;
  AD: string;
  Author: string;
  Link?: string;
  Type: number;
  text?: string;
}

// Declare globals from window object
declare global {
  interface Window {
    notificationAdd: (type: number, id: number, text: string, timeout: number) => void;
  }
}

const AdvertisementEditor: React.FC<AdvertisementProps> = ({ selectedAddId, onBackAdvert }) => {
  const [advert, setAdvert] = useState<Advertisement | null>(null);
  const [answerText, setAnswerText] = useState<string>('');

  // Fetch advertisement data when component mounts
  useEffect(() => {
    const fetchAdvertisement = async () => {
      try {
        const result = await executeClientAsyncToGroup('getAddByID', selectedAddId);
        if (result && typeof result === 'string') {
          const parsedAdvert = JSON.parse(result);
          setAdvert(parsedAdvert);
          setAnswerText(parsedAdvert.AD);
        } else {
          setAnswerText('');
          onBackAdvert();
        }
      } catch (error) {
        console.error('Error fetching advertisement:', error);
        onBackAdvert();
      }
    };

    fetchAdvertisement();
  }, [selectedAddId, onBackAdvert]);

  const onSendAnswer = () => {
    if (!answerText || !advert) return;
    
    // Sanitize input
    let sanitizedText = String(answerText).replace(/(\<(\/?[^>]+)>)/g, '');
    sanitizedText = format('parseDell', sanitizedText);
    
    // Send to server
    executeClientToGroup('send', advert.ID, sanitizedText);
    
    // Reset and go back
    setAdvert(null);
    onBackAdvert();
    setAnswerText('');
  };

  const onDeleteAdverts = () => {
    if (!advert) return;
    
    if (!answerText || answerText === advert.text) {
      window.notificationAdd(4, 9, translateText('fractions', 'При удалении объявления Вы должны указать причину!'), 3000);
      return;
    }
    
    // Sanitize input
    let sanitizedText = String(answerText).replace(/(\<(\/?[^>]+)>)/g, '');
    sanitizedText = format('parseDell', sanitizedText);
    
    // Send deletion request
    executeClientToGroup('delete', advert.ID, sanitizedText);
    
    // Reset and go back
    setAdvert(null);
    onBackAdvert();
    setAnswerText('');
  };

  // If no advert loaded yet, don't render anything
  if (!advert) return null;

  return (
    <>
      <div className="weazelnews__back" onClick={onBackAdvert}>
        &#x2190; {translateText('fractions', 'Вернуться к объявлениям')}
      </div>
      <div className="box-between mt-20">
        <div className="weazelnews__title">
          {translateText('fractions', 'Объявление')} №{advert.ID}
        </div>
        <div className="weazelnews__button" onClick={onDeleteAdverts}>
          {translateText('fractions', 'Отклонить публикацию')}
        </div>
      </div>
      <div className="weazelnews__info_title mt-45">
        {translateText('fractions', 'Отправитель')}:
      </div>
      <div className="weazelnews__info_subtitle">{advert.Author}</div>
      
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
      
      <div className="weazelnews__info_title mt-20">
        {translateText('fractions', 'Оригинальная публикация')}:
      </div>
      <div className="weazelnews__info_subtitle">{advert.AD}</div>
      
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
      
      <div className="weazelnews__info_title mt-20">
        {translateText('fractions', 'Отредактированное объявление')}:
      </div>
      <textarea 
        placeholder="Введите ваш текст.." 
        className="weazelnews__textarea w-100 mt-20" 
        value={answerText} 
        onChange={(e) => setAnswerText(e.target.value)}
      />
      <div 
        className="weazelnews__button mt-12" 
        onClick={onSendAnswer}
      >
        {translateText('fractions', 'Опубликовать')}
      </div>
    </>
  );
};

export default AdvertisementEditor;