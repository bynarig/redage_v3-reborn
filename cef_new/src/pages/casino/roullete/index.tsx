import React, { useEffect, useState } from 'react';
import { translateText } from '#shared/locale';
import { format } from '#shared/api/formatter';
import { useSelector } from 'react-redux';
import { RootState } from '#shared/store';
import { TimeFormat } from '#shared/api/moment';
import { selectCharMoney } from "#shared/store/chars.ts";

interface RouletteProps {
  viewData: any;
}

const Roulette: React.FC<RouletteProps> = ({ viewData }) => {
  const [bet, setBet] = useState(viewData);
  const [betWin, setBetWin] = useState<number>(0);
  const [time, setTime] = useState<number>(0);

  const serverDateTime = useSelector((state: RootState) => state.server.serverDateTime);
  const charMoney = useSelector(selectCharMoney);

  useEffect(() => {
    const timeHandler = (value: number) => setTime(value);
    const betHandler = (value: any) => setBet(value);
    const betWinHandler = (value: number) => setBetWin(value);

    return () => {
      window.events.removeEvent("cef.roullete.time", timeHandler);
      window.events.removeEvent("cef.roullete.bet", betHandler);
      window.events.removeEvent("cef.roullete.betWin", betWinHandler);
    };
  }, []);

  return (
    <main className="absolute w-full h-full flex flex-col items-center justify-between text-white font-[UniNeue] font-bold" id="roulette">
      {/* Date Box */}
      <div className="z-[1000] absolute top-12 right-12 w-[138px] flex justify-end text-[10px] leading-[10px] text-white">
        <div className="flex flex-col items-center">
          <div className="mb-1 text-2xl leading-6">{TimeFormat(serverDateTime, "H:mm")}</div>
          {TimeFormat(serverDateTime, "DD.MM.YYYY")}
        </div>
      </div>

      {/* Header */}
      <div className="bg-[rgba(1,22,39,0.8)] w-full flex justify-around h-[150px] items-center animate-fadeInDown">
        <div className="flex flex-col">
          <ul className="flex">
            <li className="bg-[rgba(255,255,255,0.05)] rounded px-5 py-2.5 mr-4 flex items-center text-sm font-bold">
              <div className="bg-white text-black rounded px-3 py-1 mr-4 text-2xl">{translateText('casino', 'ЛКМ')}</div>
              <span>{translateText('casino', 'Поставить')}</span>
            </li>
            <li className="bg-[rgba(255,255,255,0.05)] rounded px-5 py-2.5 mr-4 flex items-center text-sm font-bold">
              <div className="bg-white text-black rounded px-3 py-1 mr-4 text-2xl">{translateText('casino', 'ПКМ')}</div>
              <span>{translateText('casino', 'Убрать')}</span>
            </li>
            <li className="bg-[rgba(255,255,255,0.05)] rounded px-5 py-2.5 mr-4 flex items-center text-sm font-bold">
              <div className="bg-white text-black rounded px-3 py-1 mr-4 text-2xl">⟵</div>
              <span>{translateText('casino', 'Уменьшить ставку')}</span>
            </li>
            <li className="bg-[rgba(255,255,255,0.05)] rounded px-5 py-2.5 mr-4 flex items-center text-sm font-bold">
              <div className="bg-white text-black rounded px-3 py-1 mr-4 text-2xl">⟶</div>
              <span>{translateText('casino', 'Увеличить ставку')}</span>
            </li>
            <li className="bg-[rgba(255,255,255,0.05)] rounded px-5 py-2.5 mr-4 flex items-center text-sm font-bold">
              <div className="bg-white text-black rounded px-3 py-1 mr-4 text-2xl">H</div>
              <span>{translateText('casino', 'Камера')}</span>
            </li>
          </ul>
        </div>

        <div className="flex items-center">
          <div className="mr-8">
            <span className="inline-block w-[65px] h-[75px] bg-[url('data:image/svg+xml,%3Csvg width=%2765%27 height=%2775%27 viewBox=%270 0 65 75%27 fill=%27none%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cpath d=%27M52.3956 18.137L57.5416 12.991L62.5495 17.9989L57.4035 23.1449C62.4885 29.5099 64.9434 37.5803 64.264 45.6987C63.5846 53.8171 59.8224 61.3673 53.7502 66.7985C47.678 72.2297 39.7567 75.1298 31.613 74.9031C23.4694 74.6764 15.7216 71.3401 9.96099 65.5795C4.20033 59.8188 0.864061 52.0711 0.637356 43.9275C0.410652 35.7838 3.31072 27.8625 8.74197 21.7903C14.1732 15.718 21.7234 11.9559 29.8418 11.2765C37.9602 10.5971 46.0306 13.052 52.3956 18.137ZM32.4985 67.8337C35.7542 67.8337 38.978 67.1924 41.9858 65.9465C44.9937 64.7006 47.7267 62.8745 50.0288 60.5723C52.331 58.2702 54.1571 55.5372 55.403 52.5294C56.6489 49.5215 57.2902 46.2977 57.2902 43.042C57.2902 39.7863 56.6489 36.5625 55.403 33.5546C54.1571 30.5468 52.331 27.8138 50.0288 25.5116C47.7267 23.2095 44.9937 21.3834 41.9858 20.1375C38.978 18.8916 35.7542 18.2503 32.4985 18.2503C25.9233 18.2503 19.6175 20.8623 14.9681 25.5116C10.3188 30.161 7.70681 36.4668 7.70681 43.042C7.70681 49.6171 10.3188 55.923 14.9681 60.5723C19.6175 65.2217 25.9233 67.8337 32.4985 67.8337ZM28.9568 25.3337H36.0402V46.5837H28.9568V25.3337ZM18.3318 0.541992H46.6652V7.62533H18.3318V0.541992Z%27 fill=%27white%27/%3E%3C/svg%3E%0A')] bg-cover"></span>
          </div>
          <div>
            <div className="text-[#C1C1C1] text-lg font-bold">
              {translateText('casino', 'ОСТАЛОСЬ ДО')} <span className="text-[#D33437]">{translateText('casino', 'НАЧАЛА')}</span>
            </div>
            <div className="text-[70px] font-bold">00:{time < 10 ? "0" + time : time}</div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-[rgba(1,22,39,0.8)] w-full flex h-[120px] items-center justify-around animate-fadeInUp">
        <ul className="flex w-full justify-around text-2xl font-bold text-[#C1C1C1]">
          <li className="flex items-center">
            <span className="inline-block w-[42px] h-[42px] mr-4 bg-[url('data:image/svg+xml,%3Csvg width=%2742%27 height=%2742%27 viewBox=%270 0 42 42%27 fill=%27none%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cpath d=%27M20.9994 41.8334C9.4931 41.8334 0.166016 32.5063 0.166016 21.0001C0.166016 9.49383 9.4931 0.166748 20.9994 0.166748C32.5056 0.166748 41.8327 9.49383 41.8327 21.0001C41.8327 32.5063 32.5056 41.8334 20.9994 41.8334ZM20.9994 37.6668C25.4196 37.6668 29.6589 35.9108 32.7845 32.7852C35.9101 29.6596 37.666 25.4204 37.666 21.0001C37.666 16.5798 35.9101 12.3406 32.7845 9.21497C29.6589 6.08936 25.4196 4.33342 20.9994 4.33342C16.5791 4.33342 12.3398 6.08936 9.21424 9.21497C6.08863 12.3406 4.33268 16.5798 4.33268 21.0001C4.33268 25.4204 6.08863 29.6596 9.21424 32.7852C12.3398 35.9108 16.5791 37.6668 20.9994 37.6668ZM13.7077 25.1667H25.166C25.4423 25.1667 25.7072 25.057 25.9026 24.8617C26.0979 24.6663 26.2077 24.4014 26.2077 24.1251C26.2077 23.8488 26.0979 23.5839 25.9026 23.3885C25.7072 23.1932 25.4423 23.0834 25.166 23.0834H16.8327C15.4513 23.0834 14.1266 22.5347 13.1498 21.5579C12.1731 20.5812 11.6243 19.2564 11.6243 17.8751C11.6243 16.4937 12.1731 15.169 13.1498 14.1922C14.1266 13.2155 15.4513 12.6667 16.8327 12.6667H18.916V8.50008H23.0827V12.6667H28.291V16.8334H16.8327C16.5564 16.8334 16.2915 16.9432 16.0961 17.1385C15.9008 17.3339 15.791 17.5988 15.791 17.8751C15.791 18.1514 15.9008 18.4163 16.0961 18.6117C16.2915 18.807 16.5564 18.9167 16.8327 18.9167H25.166C26.5474 18.9167 27.8721 19.4655 28.8489 20.4422C29.8256 21.419 30.3744 22.7437 30.3744 24.1251C30.3744 25.5064 29.8256 26.8312 28.8489 27.8079C27.8721 28.7847 26.5474 29.3334 25.166 29.3334H23.0827V33.5001H18.916V29.3334H13.7077V25.1667Z%27 fill=%27%2327AE60%27/%3E%3C/svg%3E%0A')] bg-cover"></span>
            <div className="text">
              {translateText('casino', 'Баланс')} : <b className="text-white">${format("money", charMoney)}</b>
            </div>
          </li>
          <li className="flex items-center">
            <span className="inline-block w-[42px] h-[42px] mr-4 bg-[url('data:image/svg+xml,%3Csvg width=%2742%27 height=%2742%27 viewBox=%270 0 42 42%27 fill=%27none%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cpath d=%27M18.916 0.271126V6.56279C11.8493 7.57738 6.41602 13.6565 6.41602 21.0003C6.41602 29.0545 12.9452 35.5836 20.9993 35.5836C24.2743 35.5836 27.2993 34.5045 29.7327 32.6795L34.1848 37.1315C30.5931 40.069 25.9993 41.8336 20.9993 41.8336C9.4931 41.8336 0.166016 32.5065 0.166016 21.0003C0.166016 10.1982 8.38893 1.31488 18.916 0.271126ZM41.7285 23.0836C41.3118 27.2732 39.6577 31.0982 37.1306 34.1836L32.6785 29.7336C34.1098 27.8253 35.0806 25.5545 35.4348 23.0836H41.7306H41.7285ZM23.0868 0.271126C32.9285 1.24821 40.7535 9.07529 41.7327 18.917H35.4368C34.5243 12.5315 29.4723 7.47946 23.0868 6.56488V0.269043V0.271126Z%27 fill=%27%234A93FF%27/%3E%3C/svg%3E%0A')] bg-cover"></span>
            <div className="text">
              {translateText('casino', 'Ставка')} : <b className="text-white">${format("money", bet)}</b>
            </div>
          </li>
          {betWin > 0 && (
            <li className="flex items-center">
              <span className="inline-block w-[42px] h-[42px] mr-4 bg-[url('data:image/svg+xml,%3Csvg width=%2740%27 height=%2738%27 viewBox=%270 0 40 38%27 fill=%27none%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cpath d=%27M4.41667 0.250244V33.5836H37.75V37.7502H0.25V0.250244H4.41667ZM35.5417 6.37524L39.9583 10.7919L27.3333 23.4211L21.0833 17.1711L12.875 25.3794L8.45833 20.9586L21.0833 8.33358L27.3333 14.5836L35.5417 6.37524Z%27 fill=%27%23DD3333%27/%3E%3C/svg%3E%0A')] bg-cover"></span>
              <div className="text">
                {translateText('casino', 'Выигрыш')} : <b className="text-white">${format("money", betWin)}</b>
              </div>
            </li>
          )}
        </ul>
      </div>
    </main>
  );
};

export default Roulette;