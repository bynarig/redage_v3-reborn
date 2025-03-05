import React, {useEffect, useState} from 'react';
import {executeClient} from '#/shared/api/rage';
import {format} from '#/shared/api/formatter';
import {translateText} from '#/shared/locale';
import {useSelector} from 'react-redux';
import Logos from './logo.svg';
import {selectCharMoney} from "#shared/store/chars.ts";

const CasinoJackpot: React.FC = () => {
    const [animateClass, setAnimateClass] = useState<string[]>(['animated fadeInDown', 'animated fadeInUp', 'animated fadeInDown']);
    const [value, setValue] = useState<string>("");
    const [bet, setBet] = useState<number>(0);
    const [betWin, setBetWin] = useState<number>(0);
    const [isBet, setIsBet] = useState<boolean>(true);
    const [btnExit, setBtnExit] = useState<boolean>(true);
    const betMax = 10000;

    const charMoney = useSelector(selectCharMoney);

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
        } else if (numValue < 25) {
            setValue("25");
            window.notificationAdd(4, 9, `Минимальная ставка составляет $${format("money", 25)}`, 3000);
            return;
        } else if (numValue > betMax) {
            setValue(betMax.toString());
            window.notificationAdd(4, 9, `Максимальная ставка на данном столе составляет $${format("money", betMax)}`, 3000);
            return;
        }

        executeClient("client.spin.setBet", numValue);
        setIsBet(false);
        setBet(numValue);
        setBtnExit(false);
    };

    const onExit = () => {
        if (!btnExit) return;
        executeClient("client.spin.exit");
    };

    const onHandleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        let text = e.target.value.replace(/\D+/g, "");
        let num = Math.round(parseInt(text || "0"));

        if (num <= 0) num = 0;
        else if (num > 99999) num = 99999;

        setValue(num.toString());
    };

    // Event listeners
    useEffect(() => {
        const handleBtnExit = (type: boolean) => {
            setIsBet(type);
            setBtnExit(type);
        };

        window.events.addEvent("cef.spin.btnExit", handleBtnExit);

        return () => {
            window.events.removeEvent("cef.spin.btnExit", handleBtnExit);
        };
    }, []);

    // Animation effect
    useEffect(() => {
        const timer = setTimeout(() => {
            setAnimateClass(['animated heartBeat', 'animated heartBeat', 'animated heartBeat']);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4" id="jacpot">
            <div className="flex flex-col md:flex-row gap-6 w-full max-w-6xl">
                {/* Left Column */}
                <div className="w-full md:w-3/5 bg-gray-800 rounded-lg shadow-lg p-6">
                    <div className="flex flex-col items-center mb-6">
                        <img src={Logos} alt="Jackpot Logo" className="mb-2"/>
                        <div className="text-3xl font-bold text-yellow-400 animated flipInX">JACKPOT</div>

                        <div className="flex justify-center gap-4 my-8">
                            {[0, 1, 2].map((index) => (
                                <div key={index} className={`${animateClass[index]} text-6xl font-bold text-red-500 bg-gray-700 p-6 rounded-lg`}>
                                    7
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="animated fadeInLeft bg-green-700 rounded-lg p-4">
                            <div className="flex items-center">
                                <span className="bg-white text-green-800 font-bold rounded px-2 py-1 mr-2">X2</span>
                                <span>{translateText('casino', 'Два одинаковых изображения')}</span>
                            </div>
                        </div>

                        <div className="animated fadeInLeft bg-yellow-600 rounded-lg p-4">
                            <div className="flex items-center">
                                <span className="bg-white text-yellow-800 font-bold rounded px-2 py-1 mr-2">X4</span>
                                <span>{translateText('casino', 'Две семёрки')}</span>
                            </div>
                        </div>

                        <div className="animated fadeInLeft bg-purple-700 rounded-lg p-4">
                            <div className="flex items-center">
                                <span className="bg-white text-purple-800 font-bold rounded px-2 py-1 mr-2">X6</span>
                                <span>{translateText('casino', 'Три одинаковых изображения')}</span>
                            </div>
                        </div>

                        <div className="animated fadeInLeft bg-red-700 rounded-lg p-4">
                            <div className="flex items-center">
                                <span className="bg-white text-red-800 font-bold rounded px-2 py-1 mr-2">X10</span>
                                <span>{translateText('casino', 'Три семёрки')}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column */}
                <div className="w-full md:w-2/5 bg-gray-800 rounded-lg shadow-lg p-6 animated fadeInRight">
                    <div className="flex items-center mb-6 bg-gray-700 p-4 rounded-lg">
                        <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center text-black font-bold mr-3">$</div>
                        <div>
                            <div className="text-gray-400">{translateText('casino', 'Баланс')}:</div>
                            <div className="text-xl">${format("money", charMoney)}</div>
                        </div>
                    </div>

                    <div className="bg-gray-700 p-4 rounded-lg mb-6">
                        <div className="text-center text-gray-400 mb-4">{translateText('casino', 'СДЕЛАЛ СТАВКУ')}</div>
                        <div className="grid grid-cols-5 gap-2 mb-4">
                            <button onClick={() => onBet(0)} className="bg-blue-600 hover:bg-blue-700 py-2 rounded">X2</button>
                            <button onClick={() => onBet(1)} className="bg-blue-600 hover:bg-blue-700 py-2 rounded">X5</button>
                            <button onClick={() => onBet(2)} className="bg-blue-600 hover:bg-blue-700 py-2 rounded">1/2</button>
                            <button onClick={() => onBet(3)} className="bg-blue-600 hover:bg-blue-700 py-2 rounded">1/4</button>
                            <button onClick={() => onBet(4)} className="bg-blue-600 hover:bg-blue-700 py-2 rounded">FULL</button>
                        </div>

                        <input
                            type="text"
                            value={value}
                            onChange={onHandleInput}
                            placeholder="Кол-во для ставки"
                            maxLength={5}
                            className="w-full bg-gray-600 text-white px-4 py-2 rounded mb-4"
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
                </div>
            </div>
        </div>
    );
};

export default CasinoJackpot;