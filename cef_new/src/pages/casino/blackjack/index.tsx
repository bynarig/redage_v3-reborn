import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {executeClient} from '#api/rage';
import {format} from '#shared/api/formatter';
import {RootState} from '#shared/store';
import {translateText} from '#shared/locale';
import {GetTime} from '#shared/api/moment';
import {ENVIRONMENT} from "#/env.ts";
import {mockBlackjackData} from "#/shared/data/mock/Casino-mock";

interface BlackjackProps {
    viewData: {
        isBet: boolean;
        isBtn: boolean;
        btnDouble: number;
        btnSplit: number;
        betMax: number;
    };
}


const CasinoBlackjack: React.FC<BlackjackProps> = ({viewData}) => {
    const dispatch = useDispatch();
    const charMoney = useSelector((state: RootState) => state.char.charMoney);
    const serverDateTime = useSelector((state: RootState) => state.server.serverDateTime);
    if (ENVIRONMENT == "development") {
        viewData = mockBlackjackData;
    }
    const [value, setValue] = useState<string>("50");
    const [bet, setBet] = useState<number>(0);
    const [betWin, setBetWin] = useState<number>(0);
    const [isBet, setIsBet] = useState<boolean>(viewData.isBet);
    const [isBtn, setIsBtn] = useState<boolean>(viewData.isBtn);
    const [btnDouble, setBtnDouble] = useState<number>(viewData.btnDouble);
    const [btnSplit, setBtnSplit] = useState<number>(viewData.btnSplit);
    const [time, setTime] = useState<number>(0);
    const [btnExit, setBtnExit] = useState<number>(1);
    const [betMax] = useState<number>(viewData.betMax);

    useEffect(() => {
        const handleBtn = (isBetVal: boolean, isBtnVal: boolean, btnDoubleVal: number, btnSplitVal: number) => {
            setIsBet(isBetVal);
            setIsBtn(isBtnVal);
            setBtnDouble(btnDoubleVal);
            setBtnSplit(btnSplitVal);
        };

        const handleTime = (timeVal: number) => {
            setTime(timeVal);
        };

        const handleBtnExit = (type: number) => {
            setBtnExit(type);
        };

        const handleBet = (value: number) => {
            setBet(value);
        };

        const handleBetWin = (value: number) => {
            setBetWin(value);
        };
        if (ENVIRONMENT != "development") {
            // Add event listeners
            window.events.addEvent("cef.blackjack.btn", handleBtn);
            window.events.addEvent("cef.blackjack.time", handleTime);
            window.events.addEvent("cef.blackjack.btnExit", handleBtnExit);
            window.events.addEvent("cef.blackjack.bet", handleBet);
            window.events.addEvent("cef.blackjack.betWin", handleBetWin);

            // Clean up event listeners
            return () => {
                window.events.removeEvent("cef.blackjack.btn", handleBtn);
                window.events.removeEvent("cef.blackjack.time", handleTime);
                window.events.removeEvent("cef.blackjack.btnExit", handleBtnExit);
                window.events.removeEvent("cef.blackjack.bet", handleBet);
                window.events.removeEvent("cef.blackjack.betWin", handleBetWin);
            };
        }

    }, []);

    const onBet = (type: number) => {
        if (!isBet) return;

        let newValue = parseInt(value);
        switch (type) {
            case 0:
                newValue = newValue * 2;
                break;
            case 1:
                newValue = newValue * 5;
                break;
            case 2:
                newValue = Math.round(newValue / 2);
                break;
            case 3:
                newValue = Math.round(newValue / 4);
                break;
            case 4:
                newValue = betMax;
                break;
        }

        if (newValue > charMoney) newValue = charMoney;
        if (newValue > betMax) newValue = betMax;

        setValue(newValue.toString());
    };

    const onSetBet = () => {
        if (!isBet) return;

        const numValue = Number(value);

        if (numValue > charMoney) {
            setValue(charMoney.toString());
            window.notificationAdd(4, 9, `У Вас нет столько денег!`, 3000);
            return;
        } else if (numValue < 50) {
            setValue("50");
            window.notificationAdd(4, 9, `Минимальная ставка составляет $${format("money", "50")}`, 3000);
            return;
        } else if (numValue > betMax) {
            setValue(betMax.toString());
            window.notificationAdd(4, 9, `Максимальная ставка на данном столе составляет $${format("money", betMax.toString())}`, 3000);
            return;
        }

        executeClient("client.blackjack.setBet", numValue);
        setIsBet(false);
        setTime(0);
        setBet(numValue);
    };

    const onExit = () => {
        if (!btnExit) return;
        executeClient("client.blackjack.exit");
        setIsBtn(false);
        setTime(0);
    };

    const onBtn = (text: string) => {
        if (!isBtn) return;
        executeClient("client.blackjack.btn", text);
        setIsBtn(false);
        setTime(0);
    };

    const onHandleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        let text = e.target.value.replace(/\D+/g, "");
        let numValue = Math.round(parseInt(text || "1"));

        if (numValue < 1) numValue = 1;
        else if (numValue > 999999) numValue = 999999;

        setValue(numValue.toString());
    };

    const formatTime = (timestamp: number) => {
        const time = GetTime(new Date(timestamp).toISOString());
        return {
            time: time.format("H:mm"),
            date: time.format("DD.MM.YYYY")
        };
    };

    const timeFormatted = formatTime(serverDateTime);

    return (
        <div className="w-full h-full flex flex-col items-center justify-center bg-black/80 text-white">
            <div className="absolute top-4 right-4 flex flex-col items-end">
                <div className="text-xl font-bold">{timeFormatted.time}</div>
                <div className="text-sm text-gray-400">{timeFormatted.date}</div>
            </div>

            <div className="absolute top-4 left-4 flex items-center space-x-2">
                <div className="bg-gray-800 px-2 py-1 rounded">~</div>
                <span className="text-gray-300">{translateText('casino', 'Показать/Скрыть курсор')}</span>
            </div>

            <div className="w-96 bg-gray-800 rounded-lg shadow-lg p-4 mb-4">
                <div className="flex items-center mb-4">
                    <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-black font-bold">$</div>
                    <div className="ml-2">
                        <div className="text-gray-400">{translateText('casino', 'Баланс')}:</div>
                        <div className="text-xl">${format("money", charMoney)}</div>
                    </div>

                    {betWin > 0 && (
                        <div className="ml-auto">
                            <div className="text-gray-400">{translateText('casino', 'Выигрыш')}:</div>
                            <div className="text-xl text-green-500">${format("money", betWin)}</div>
                        </div>
                    )}
                </div>

                <div className="text-center font-bold text-xl mb-4">BLACKJACK</div>

                <div className="grid grid-cols-5 gap-2 mb-4">
                    <button onClick={() => onBet(0)} className="bg-gray-700 hover:bg-gray-600 py-1 rounded">X2</button>
                    <button onClick={() => onBet(1)} className="bg-gray-700 hover:bg-gray-600 py-1 rounded">X5</button>
                    <button onClick={() => onBet(2)} className="bg-gray-700 hover:bg-gray-600 py-1 rounded">1/2</button>
                    <button onClick={() => onBet(3)} className="bg-gray-700 hover:bg-gray-600 py-1 rounded">1/4</button>
                    <button onClick={() => onBet(4)} className="bg-gray-700 hover:bg-gray-600 py-1 rounded">Full</button>
                </div>

                <input
                    placeholder="Кол-во для ставки"
                    maxLength={6}
                    className="w-full bg-gray-700 text-white px-4 py-2 rounded mb-4"
                    value={value}
                    onChange={onHandleInput}
                    disabled={!isBet}
                />

                <button
                    onClick={onSetBet}
                    className={`w-full bg-green-600 hover:bg-green-700 py-2 rounded mb-2 ${!isBet ? 'opacity-65 cursor-not-allowed' : ''}`}
                >
                    {translateText('casino', 'Сделать ставку')}
                </button>

                <button
                    onClick={onExit}
                    className={`w-full bg-red-600 hover:bg-red-700 py-2 rounded ${!btnExit ? 'opacity-65 cursor-not-allowed' : ''}`}
                >
                    {translateText('casino', 'Выйти')}
                </button>
            </div>

            <div className="w-96 bg-gray-800 rounded-lg shadow-lg p-4">
                <div className="flex items-center mb-4">
                    <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-black font-bold">$</div>
                    <div className="ml-2">
                        <div className="text-gray-400">{translateText('casino', 'Размер ставки')}:</div>
                        <div className="text-xl">${format("money", bet)}</div>
                    </div>
                </div>

                {time > 0 && (
                    <div className="flex justify-between mb-4">
                        <div className="text-gray-400">{translateText('casino', 'Время')}:</div>
                        <div>{time} {translateText('casino', 'секунд')}.</div>
                    </div>
                )}

                {isBtn && (
                    <div className="grid grid-cols-2 gap-2">
                        <button onClick={() => onBtn("hit")} className="bg-blue-600 hover:bg-blue-700 py-2 rounded">
                            {translateText('casino', 'Взять')}
                        </button>
                        <button onClick={() => onBtn("stand")} className="bg-blue-600 hover:bg-blue-700 py-2 rounded">
                            {translateText('casino', 'Оставить')}
                        </button>
                        {btnDouble !== 0 && bet <= charMoney && (
                            <button onClick={() => onBtn("double")} className="bg-blue-600 hover:bg-blue-700 py-2 rounded">
                                {translateText('casino', 'Удвоить')}
                            </button>
                        )}
                        {btnSplit !== 0 && bet <= charMoney && (
                            <button onClick={() => onBtn("split")} className="bg-blue-600 hover:bg-blue-700 py-2 rounded">
                                {translateText('casino', 'Разделить')}
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CasinoBlackjack;