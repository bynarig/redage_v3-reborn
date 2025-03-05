import React from 'react';
import { translateText } from '#/shared/locale';
import { executeClient } from '#/shared/api/rage';

interface UniqueItemProps {
  SetPopup?: any; // Preserving the export but as a prop
}

interface SelectListItem {
  id: number;
  name: string;
  class: string;
  price: number;
  img: string;
  list?: string[];
  desc?: string;
}

const UniqueNew: React.FC<UniqueItemProps> = ({ SetPopup }) => {
  // Maintaining the original data structure
  const selectListId: SelectListItem = {
    id: 0,
    name: "Боевой пропуск Season 4",
    class: "reborn", //ХЗ ЧЕ ЭТО)))
    price: 7777,
    img: (window as any).document.cloud + 'inventoryItems/items/bp.png',
    list: [
      "Более 300 уникальных заданий",
      "Огромное количество уникальной одежды",
      "Два уникальных автомобиля, которые уже ждут тебя",
    ]
  };

  const onSelectMenu = () => {
    executeClient("client.donate.close");
    executeClient('client.battlepass.open');
  };

  return (
    <div className="main-menu__header-element">
      <div className="main-menu__star-block">
        <div 
          className="star-img" 
          style={{ backgroundImage: `url(${selectListId.img})` }} 
        />
      </div>
      <div className="main-menu__element-info">
        <div className="main-menu__timer-box">
          <div className="main-menu__timer box-center">
            {translateText('donate', 'Новое')}
          </div>
        </div>
        <div className="main-menu__title">{selectListId.name}</div>
        {selectListId.list ? (
          <div className="main-menu__paragraph">
            {selectListId.list.map((text, index) => (
              <React.Fragment key={index}>
                <b>- </b>{text}<br />
              </React.Fragment>
            ))}
          </div>
        ) : selectListId.desc ? (
          <div className="main-menu__paragraph">{selectListId.desc}</div>
        ) : null}
        <div className="newdonate__button_small" onClick={onSelectMenu}>
          <div className="newdonate__button-text">
            {translateText('donate', 'Перейти')}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UniqueNew;