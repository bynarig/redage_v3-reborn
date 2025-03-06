import React, { useState } from 'react';
import { translateText } from '#/shared/locale';
// import './live.css'; // Assuming you have a separate CSS file

interface LiveComponentProps {
  // Add any props here if needed
}

const LiveComponent: React.FC<LiveComponentProps> = () => {
  const [isLive, setIsLive] = useState<boolean>(false);
  const [isCallList, setIsCallList] = useState<boolean>(false);
  const [messageText, setMessageText] = useState<string>('');
  
  // Sample message data (in a real app, this would come from an API)
  const messages = [
    {
      name: "Vitaliy Zdobich [358]",
      type: translateText('fractions', 'Участник эфира'),
      text: "Всем привет, с вами участник прямого эфира Витос Здобос.",
      isMe: false
    },
    {
      name: "Vitaliy Zdobich [358]",
      type: translateText('fractions', 'Ведущий эфира'),
      text: "Всем привет, с вами участник прямого эфира Витос Здобос.",
      isMe: true
    }
  ];
  
  // Sample callers data
  const callers = [
    {
      name: "Vitaliy Zdobich [123]",
      phone: "1337228",
      isConnected: false
    },
    {
      name: "Vitaliy Zdobich [123]",
      phone: "1337228",
      isConnected: true
    }
  ];
  
  const handleSendMessage = () => {
    if (!messageText.trim()) return;
    
    // In a real app, you would send this to the server
    console.log("Sending message:", messageText);
    setMessageText('');
  };
  
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSendMessage();
    }
  };
  
  return (
    <>
      <div className="weazelnews__title">{translateText('fractions', 'Прямой эфир')}</div>
      
      {/* Start Live Section */}
      {!isLive && (
        <div className="weazelnews__live_block">
          <div className="weazelnews__live_title">
            {translateText('fractions', 'Старт прямого эфира')}
          </div>
          <div className="weazelnews__live_subtitle">
            {translateText('fractions', 'Внимание, у Вас есть возможность проводить прямые эфиры, будьте грамотны и внимательны, a еще - не пишите чушь.')}
          </div>
          <div 
            className="weazelnews__button" 
            onClick={() => setIsLive(true)}
          >
            {translateText('fractions', 'Начать прямой эфир')}
          </div>
        </div>
      )}
      
      {/* Active Live Chat Section */}
      {isLive && !isCallList && (
        <>
          <div className="weazelnews__live_block">
            <div className="weazelnews__live_title">
              {translateText('fractions', 'Прямой эфир с')} Vitaliy Zdobich
            </div>
            <div className="weazelnews__live_subtitle">
              {translateText('fractions', 'Внимание, у Вас есть возможность проводить прямые эфиры, будьте грамотны и внимательны, a еще - не пишите чушь.')}
            </div>
            <div className="box-flex">
              <div 
                className="weazelnews__button mr-14" 
                onClick={() => setIsLive(false)}
              >
                {translateText('fractions', 'Завершить эфир')}
              </div>
              <div 
                className="weazelnews__button mr-14"
              >
                {translateText('fractions', 'Выгнать участника')}
              </div>
              <div 
                className="weazelnews__button mr-14" 
                onClick={() => setIsCallList(true)}
              >
                {translateText('fractions', 'Список дозвонившихся')}
              </div>
            </div>
          </div>
          
          <div className="weazelnews__chatbox">
            {messages.map((message, index) => (
              <div 
                key={index} 
                className={`weazelnews__message ${message.isMe ? 'me' : ''}`}
              >
                <div className="weazelnews__message_name">{message.name}</div>
                <div className="weazelnews__message_type">{message.type}</div>
                <div className="weazelnews__message_text">{message.text}</div>
              </div>
            ))}
          </div>
          
          <div className="box-flex">
            <input 
              className="weazelnews__chat_input"
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={translateText('fractions', 'Введите сообщение...')}
            />
            <div 
              className="weazelnews__chat_button"
              onClick={handleSendMessage}
            >
              ➤
            </div>
          </div>
        </>
      )}
      
      {/* Call List Section */}
      {isLive && isCallList && (
        <>
          <div className="weazelnews__live_block">
            <div className="weazelnews__live_title">
              {translateText('fractions', 'Прямой эфир с')} Vitaliy Zdobich
            </div>
            <div className="weazelnews__live_subtitle">
              {translateText('fractions', 'Внимание, у Вас есть возможность проводить прямые эфиры, будьте грамотны и внимательны, a еще - не пишите чушь.')}
            </div>
            <div className="box-flex">
              <div 
                className="weazelnews__button mr-14" 
                onClick={() => setIsLive(false)}
              >
                {translateText('fractions', 'Завершить эфир')}
              </div>
              <div 
                className="weazelnews__button mr-14" 
                onClick={() => setIsCallList(false)}
              >
                {translateText('fractions', 'Вернуться к эфиру')}
              </div>
            </div>
          </div>
          
          <div className="weazelnews__live_calllist">
            {callers.map((caller, index) => (
              <div key={index} className="weazelnews__live_element">
                <div className="weazelnews__element_block">
                  {caller.name} <span className="gray">Тел.</span> {caller.phone}
                </div>
                
                {!caller.isConnected ? (
                  <div className="weazelnews__element_button">
                    {translateText('fractions', 'Допустить до эфира')}
                  </div>
                ) : (
                  <>
                    <div className="weazelnews__element_button live">
                      {translateText('fractions', 'Перейти к эфиру')}
                    </div>
                    <div className="weazelnews__element_button kick">
                      {translateText('fractions', 'Выгнать из эфира')}
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default LiveComponent;