import React, { useState } from 'react';
import { translateText } from '#/shared/locale';
import { executeClientToGroup } from '#/shared/api/rage';

interface GovernmentComponentProps {
  // Add any props if needed
}

const GovernmentComponent: React.FC<GovernmentComponentProps> = () => {
  const [govMessage, setGovMessage] = useState<string>('');
  
  const handlePublish = () => {
    if (!govMessage.trim()) {
      // You might want to add a notification here
      console.log('Message cannot be empty');
      return;
    }
    
    // Send to server
    executeClientToGroup('sendGovMessage', govMessage);
    
    // Clear the input
    setGovMessage('');
  };
  
  return (
    <>
      <div className="weazelnews__title">
        {translateText('fractions', 'Государственная волна')}
      </div>
      
      <textarea 
        className="weazelnews__textarea w-100 mt-32" 
        placeholder="Введите текст.." 
        value={govMessage}
        onChange={(e) => setGovMessage(e.target.value)}
      />
      
      <div className="box-between">
        <div className="weazelnews__input_descr">
          {translateText('fractions', 'В гос. волне запрещены нецензурные выражения и оскорбления! Соблюдайте правила 5 минут между публикациями!')}
        </div>
        <div 
          className="weazelnews__button"
          onClick={handlePublish}
        >
          {translateText('fractions', 'Опубликовать')}
        </div>
      </div>
      
      <div className="box-flex mt-auto">
        <div className="bortovoiicon-info"></div>
        <div className="weazelnews__bold">
          {translateText('fractions', 'Помощь по работе с планшетом')}
        </div>
      </div>
      
      <div className="weazelnews__block_info">
        {translateText('fractions', 'Для написания объявлений в государственную волну воспользуйтесь пунктом "Государственная волна", а для публикаций и редактирования объявлений воспользуйтесь пунктом "Объявления".')}
      </div>
    </>
  );
};

export default GovernmentComponent;