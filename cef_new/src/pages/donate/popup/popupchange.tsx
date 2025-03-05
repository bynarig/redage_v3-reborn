import React, { useState, useEffect } from 'react';
import { executeClient } from '#/shared/api/rage';
import { useSelector } from 'react-redux';
import { RootState } from '#/shared/store';
import "./popups.sass"

interface PopupChangeProps {
  SetPopup?: () => void;
}

const PopupChange: React.FC<PopupChangeProps> = ({ SetPopup }) => {
  // Access the store values
  const accountRedbucks = useSelector((state: RootState) => state.account.accountRedbucks);
  const serverDonateDoubleConvert = useSelector((state: RootState) => state.server.serverDonateDoubleConvert);
  
  // Initial state setup
  const [changeRbBtn, setChangeRbBtn] = useState<number>(10);
  const [changeCashBtn, setChangeCashBtn] = useState<number>(
    Math.round(10 * Math.round(10 * serverDonateDoubleConvert))
  );

  // Update cash value when conversion rate changes
  useEffect(() => {
    setChangeCashBtn(Math.round(changeRbBtn * Math.round(10 * serverDonateDoubleConvert)));
  }, [serverDonateDoubleConvert, changeRbBtn]);

  const onHandleInputTransfer = (value: string, isRb = false) => {
    let numValue = Math.round(Number(value.replace(/\D+/g, "")));
    
    if (numValue < 0) numValue = 0;
    else if (!isRb && numValue > Math.round(999999 * Math.round(10 * serverDonateDoubleConvert))) {
      numValue = Math.round(999999 * Math.round(10 * serverDonateDoubleConvert));
    }
    else if (isRb && numValue > 999999) numValue = 999999;

    if (!isRb) {
      setChangeCashBtn(numValue);
      const rbValue = Math.round(numValue / Math.round(10 * serverDonateDoubleConvert));
      setChangeRbBtn(rbValue < 0 ? 0 : rbValue);
    }
    else {
      setChangeRbBtn(numValue);
      setChangeCashBtn(Math.round(numValue * Math.round(10 * serverDonateDoubleConvert)));
    }
  };

  const onChange = () => {
    if (accountRedbucks < changeRbBtn) {
      return (window as any).notificationAdd(4, 9, `Недостаточно Redbucks!`, 3000);
    }
    // SetPopup();
    executeClient("client.donate.change", changeRbBtn);
  };

  return (
    <div className="newdonate__change">
      <div className="newdonate__change-block">
        <div className="newdonate__change-top">
          <div className="newdonate__change-element">
            <div className="newdonate__change-img redbucks" />
            <input 
              className="newdonate__change-input" 
              value={changeRbBtn} 
              onChange={(e) => onHandleInputTransfer(e.target.value, true)} 
              placeholder="10" 
            />
          </div>
          <div className="newdonate__change-element">
            <div className="newdonate__change-img progress" />
            <div className="newdonate__change-curs">
              1 RB к {Math.round(10 * serverDonateDoubleConvert)}
            </div>
          </div>
          <div className="newdonate__change-element">
            <div className="newdonate__change-img money" />
            <input 
              className="newdonate__change-input" 
              value={changeCashBtn} 
              onChange={(e) => onHandleInputTransfer(e.target.value)} 
              placeholder="10" 
            />
          </div>
        </div>
        <div className="newdonate__change-bottom">
          <div className="newdonate__button_small" onClick={onChange}>
            <div className="newdonate__button-text">Обменять</div>
          </div>
        </div>
      </div>
      <div className="newdonate__escape">
        <div className="box-flex">
          <span className="donateicons-esc" />
          <div className="newdonate__escape-title">ESC</div>
        </div>
        <div className="newdonate__escape-text">
          Нажми, чтобы закрыть
        </div>
      </div>
    </div>
  );
};

export default PopupChange;