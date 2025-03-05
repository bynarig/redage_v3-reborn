import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { translateText } from '#/shared/locale';
import { format } from '#/shared/api/formatter';
import { executeClient, executeClientAsync } from '#/shared/api/rage';
import { GetTime } from '#/shared/api/moment';
import moment from 'moment-timezone';
import { RootState } from '#/shared/store';

interface VipItem {
  id: number;
  name: string;
  price: number;
  class: string;
  img: string;
  list: string[];
}

interface PremiumProps {
  setPopup: (name: string | null, data?: any) => void;
}

const Premium: React.FC<PremiumProps> = ({ setPopup }) => {
  const [isLoad, setIsLoad] = useState(false);
  const [vipLists, setVipLists] = useState<VipItem[]>([]);
  const [unixTime, setUnixTime] = useState(0);

  const accountRedbucks = useSelector((state: RootState) => state.account.redbucks);
  const accountSubscribe = useSelector((state: RootState) => state.account.subscribe);

  const bool = (text: any): boolean => {
    return String(text).toLowerCase() === "false";
  };

  const showPopup = (item: VipItem, index: number) => {
    if (item.id === 0) {
      if (bool(accountSubscribe) && accountRedbucks < item.price) {
        return window.notificationAdd(4, 9, `Недостаточно Redbucks!`, 3000);
      }
    } else if (accountRedbucks < item.price) {
      return window.notificationAdd(4, 9, `Недостаточно Redbucks!`, 3000);
    }
    
    setPopup("PopupPremium", vipLists[index]);
  };

  const onReward = () => {
    executeClient("client.donate.reward");
  };

  // Initialize data
  useEffect(() => {
    const fetchVipLists = async () => {
      try {
        const result = await executeClientAsync("donate.vipLists");
        if (result && typeof result === "string") {
          setVipLists(JSON.parse(result));
          setIsLoad(true);
        }
      } catch (error) {
        console.error("Failed to fetch VIP lists:", error);
      }
    };
    
    fetchVipLists();
  }, []);

  // Update subscription time
  useEffect(() => {
    if (bool(accountSubscribe)) return;
    
    let time = (accountSubscribe !== false ? GetTime(accountSubscribe).diff(GetTime()) : 0);
    if (time > (86500 - (1000 * 60))) time -= (1000 * 60);
    setUnixTime(time);
    
    const interval = setInterval(() => {
      if (accountSubscribe && !bool(accountSubscribe)) {
        let updatedTime = GetTime(accountSubscribe).diff(GetTime());
        if (updatedTime > (86500 - (1000 * 60))) updatedTime -= (1000 * 60);
        setUnixTime(updatedTime);
      }
    }, 1000);
    
    return () => clearInterval(interval);
  }, [accountSubscribe]);

  if (!isLoad) return null;

  return (
    <div id="newdonate__premium" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {vipLists.map((item, index) => (
        <div 
          key={index} 
          className={`bg-gray-800 rounded-lg p-4 relative overflow-hidden ${item.class}`}
        >
          <div 
            className="absolute top-0 right-0 w-20 h-20 bg-contain bg-no-repeat" 
            style={{ backgroundImage: `url(${document.cloud}donate/premium/${item.img}.svg)` }} 
          />
          <h3 className="text-xl font-bold text-white mb-3">{item.name}</h3>
          <div className="text-gray-300 mb-4 space-y-1">
            {item.list.map((text, idx) => (
              <div key={idx} className="flex">
                <span className="font-bold mr-2">-</span>
                <span>{text}</span>
              </div>
            ))}
          </div>

          {item.id === 0 ? (
            <button 
              onClick={() => showPopup(item, index)} 
              className="w-full py-2 bg-gradient-to-r from-red-600 to-red-700 rounded text-white hover:from-red-700 hover:to-red-800 transition"
            >
              {translateText('donate', 'Купить за')} {format("money", item.price)} RB
            </button>
          ) : (
            <>
              {bool(accountSubscribe) ? (
                <button 
                  onClick={() => showPopup(item, index)} 
                  className="w-full py-2 bg-gradient-to-r from-red-600 to-red-700 rounded text-white hover:from-red-700 hover:to-red-800 transition"
                >
                  {translateText('donate', 'Купить за')} {format("money", item.price)} RB
                </button>
              ) : (
                unixTime > 0 ? (
                  <button 
                    onClick={onReward} 
                    className="w-full py-2 bg-gradient-to-r from-blue-600 to-blue-700 rounded text-white hover:from-blue-700 hover:to-blue-800 transition"
                  >
                    {moment.utc(unixTime).format("HH:mm")}
                  </button>
                ) : (
                  <button 
                    onClick={onReward} 
                    className="w-full py-2 bg-gradient-to-r from-green-600 to-green-700 rounded text-white hover:from-green-700 hover:to-green-800 transition"
                  >
                    {translateText('donate', 'Забрать')}
                  </button>
                )
              )}
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default Premium;