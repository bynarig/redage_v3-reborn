import React, { useState, useEffect } from 'react';
import { translateText } from '#/shared/locale';
import { format } from '#/shared/api/formatter';
import { executeClient } from '#/shared/api/rage';
import './main.css'; // Change to CSS to avoid SASS compilation issues

interface FractionCreateProps {
  viewData?: number;
}

const FractionCreate: React.FC<FractionCreateProps> = ({ viewData = 0 }) => {
  // State variables
  const [isCrime, setIsCrime] = useState<boolean>(false);
  const [orgName, setOrgName] = useState<string>('');

  // Event handlers
  const onSelectType = (_isCrime: boolean) => {
    setIsCrime(_isCrime);
  };

  const onCreate = () => {
    const check = format("createOrg", orgName);
    if (!check.valid) {
      // Type safety for window global
      (window as any).notificationAdd(4, 9, check.text, 3000);
      return;
    }

    executeClient('client.org.create.buy', isCrime, orgName);
  };

  const onClose = () => {
    executeClient('client.org.create.close');
  };

  const onKeyUp = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const { keyCode } = event;

    if (keyCode === 13)
      onCreate();

    if (keyCode === 27)
      onClose();
  };

  // Key event handler
  useEffect(() => {
    const handleKeyUp = (event: KeyboardEvent) => {
      const { keyCode } = event;

      if (keyCode === 13)
        onCreate();

      if (keyCode === 27)
        onClose();
    };

    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [isCrime, orgName]);

  return (
    <div id="fractionscreate" onKeyUp={onKeyUp} tabIndex={0}>
      <div className="newproject__buttonblock" onClick={onClose}>
        <div className="newproject__button">ESC</div>
        <div>{translateText('player', 'Закрыть')}</div>
      </div>
      <div className="fractionscreate__title">Создание организации</div>
      <div className="fractionscreate__subtitle">В данном меню вы можете выбрать тип своей организации и создать её. Подходите к процессу создания серьезно!</div>
      <div className="fractionscreate__text_title">Тип организации:</div>
      <div 
        className={`fractionscreate__element mb-32 ${isCrime ? 'active' : ''}`}
        onClick={() => onSelectType(true)}
      >
        <div className="fractionscreate__checkbox">
          <div className="active"></div>
        </div>
        <div className="box-column">
          <div className="box-flex">
            <div className="fractionscreate__icon crime"></div>
            <div className="fractionscreate__element_title">Группировка</div>
          </div>
          <div className="fractionscreate__element_type crime">Криминальная организация</div>
          <div className="fractionscreate__element_text">
            Ячейка преступного мира, деятельность которой состоит в формировании альянсов с другими криминальными фракциями, войне за влияние, ограблениях, похищениях и стычках с силовыми и юридическими структурами.
          </div>
        </div>
      </div>
      <div 
        className={`fractionscreate__element ${!isCrime ? 'active' : ''}`}
        onClick={() => onSelectType(false)}
      >
        <div className="fractionscreate__checkbox">
          <div className="active"></div>
        </div>
        <div className="box-column">
          <div className="box-flex">
            <div className="fractionscreate__icon gos"></div>
            <div className="fractionscreate__element_title">Сообщество</div>
          </div>
          <div className="fractionscreate__element_type gos">Легальная организация</div>
          <div className="fractionscreate__element_text">
            Частное предприятие, которое подписывает контракт с правительством для защиты прав и интересов государства. Имеет возможность оказывать влияние на политические и силовые структуры, является частью государственной системы.
          </div>
        </div>
      </div>
      <div className="fractionscreate__text_title">Название организации:</div>
      <div className="box-flex">
        <input 
          className="fractionscreate__input" 
          placeholder="Введите название.." 
          value={orgName}
          onChange={(e) => setOrgName(e.target.value)}
        />
        <div className="box-column">
          <div className="fractionscreate__small">Стоимость создания:</div>
          <div>${format("money", viewData)}</div>
        </div>
      </div>
      <div className="fractionscreate__info">
        Название от 3 и до 30 символов
        <br />
        Запрещено использовать в названии нецензурные выражения, оскорбления или названия существующих организаций.
      </div>
      <div className="fractionscreate__button" onClick={onCreate}>
        Создать организацию
      </div>
    </div>
  );
};

export default FractionCreate;