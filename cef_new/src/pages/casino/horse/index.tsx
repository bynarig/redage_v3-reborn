import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {translateText} from '#shared/locale';
import {format} from '#shared/api/formatter';
import {safeExecuteClient} from "#api/clientExicutor.ts";
import { selectCharMoney } from '#shared/store/chars';

interface Player {
    id: number;
    name: string;
    class: string;
}

const HorseBetting: React.FC = () => {
    // State management with React hooks instead of Svelte reactivity
    const [animateClass, setAnimateClass] = useState<string[]>([
        'animate-fadeInDown', 'animate-fadeInUp', 'animate-fadeInDown'
    ]);

    const [players] = useState<Player[]>([
        {id: 1, name: 'Sokolyansky', class: 'red'},
        {id: 2, name: 'Maya', class: 'purple'},
        {id: 3, name: 'Source', class: 'blue'},
        {id: 4, name: 'Shaman', class: 'darkblue'},
        {id: 5, name: 'Deluxe', class: 'white'},
        {id: 6, name: 'Mip', class: 'green'}
    ]);

    const [active, setActive] = useState<number>(0);
    const [value, setValue] = useState<string>("500");
    const [bet, setBet] = useState<number>(0);
    const [betWin, setBetWin] = useState<number>(0);
    const [isBet, setIsBet] = useState<boolean>(true);
    const [btnExit, setBtnExit] = useState<boolean>(true);
    const [betMax] = useState<number>(50000);

    // Get character money from Redux store
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
        } else if (numValue < 500) {
            setValue("500");
            window.notificationAdd(4, 9, `Минимальная ставка составляет $${format("money", 500)}`, 3000);
            return;
        } else if (numValue > betMax) {
            setValue(betMax.toString());
            window.notificationAdd(4, 9, `Максимальная ставка на данном столе составляет $${format("money", betMax)}`, 3000);
            return;
        }

        safeExecuteClient("client.horse.setBet", Number(active + 1), numValue);
        setBet(numValue);
    };

    const onExit = () => {
        //if (!btnExit) return;
        safeExecuteClient("client.horse.exit");
    };

    const setActiveHorse = (id: number) => {
        setActive(id);
        safeExecuteClient("client.horse.GET_HORSE", Number(id + 1));
    };

    const onHandleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        let text = e.target.value.replace(/\D+/g, "");
        let numValue = Math.round(Number(text));

        if (numValue < 1) numValue = 1;
        else if (numValue > 999999) numValue = 999999;

        setValue(numValue.toString());
    };

    useEffect(() => {
        // Similar to onMount in Svelte
        const timer = setTimeout(() => {
            setAnimateClass(['animate-heartBeat', 'animate-heartBeat', 'animate-heartBeat']);
        }, 2000);

        // Event listener for isBet updates
        const handleIsBetUpdate = (type: boolean) => {
            setIsBet(type);
        };

        // window.events.addEvent("cef.horse.isBtn", handleIsBetUpdate);

        // Cleanup function (similar to onDestroy in Svelte)
        return () => {
            clearTimeout(timer);
            // window.events.removeEvent("cef.horse.isBtn", handleIsBetUpdate);
        };
    }, []);

    return (
        <main className="w-full h-full flex" id="horse">
            <div className="animate-fadeInLeft w-1/3">
                <ul className="divide-y divide-gray-200">
                    {players.map((player, index) => (
                        <li
                            key={player.id}
                            className={`p-4 cursor-pointer ${player.class} ${active === index ? 'bg-opacity-30 border-l-4' : ''}`}
                            onClick={() => setActiveHorse(index)}
                        >
                            <div className="flex items-center">
                                <div className="h-12 w-12 rounded-full bg-gray-300"></div>
                                <div className="ml-3">
                                    <p className="text-sm font-medium">{player.name}</p>
                                    <p className="text-xs text-gray-500">#{player.id}</p>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="animate-fadeInRight w-2/3 p-4">
                <div className="card bg-base-100 shadow-xl mb-4">
                    <div className="card-body flex flex-row items-center">
                        <div className={`avatar player ${players[active].class}`}>
                            <div className="w-12 rounded-full">
                                {/* Avatar placeholder */}
                                <div className="w-full h-full bg-gray-400"></div>
                            </div>
                        </div>
                        <div className="ml-4">
                            Баланс: <span className="font-bold">${format("money", charMoney)}</span>
                        </div>
                    </div>
                </div>

                <div className="card bg-base-100 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title">{translateText('casino', 'Сделать ставку')}</h2>

                        <div className="grid grid-cols-5 gap-2 mt-4">
                            <button onClick={() => onBet(0)} className="btn btn-outline">X2</button>
                            <button onClick={() => onBet(1)} className="btn btn-outline">X5</button>
                            <button onClick={() => onBet(2)} className="btn btn-outline">1/2</button>
                            <button onClick={() => onBet(3)} className="btn btn-outline">1/4</button>
                            <button onClick={() => onBet(4)} className="btn btn-outline">FULL</button>
                        </div>

                        <div className="form-control mt-4">
                            <input
                                type="text"
                                value={value}
                                onChange={(e) => {
                                    const inputValue = e.target.value.replace(/\D+/g, "");
                                    if (inputValue) {
                                        setValue(inputValue);
                                    } else {
                                        setValue("");
                                    }
                                }}
                                placeholder="Кол-во для ставки"
                                maxLength={6}
                                className="input input-bordered w-full"
                            />
                        </div>

                        <div className="card-actions justify-between mt-4">
                            <button
                                className="btn btn-primary flex-1 mr-2"
                                onClick={onSetBet}
                                disabled={!isBet}
                                style={{opacity: isBet ? 1 : 0.65}}
                            >
                                {translateText('casino', 'Сделать ставку')}
                            </button>
                            <button
                                className="btn btn-secondary flex-1"
                                onClick={onExit}
                                style={{opacity: btnExit ? 1 : 0.65}}
                            >
                                {translateText('casino', 'Выйти')}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default HorseBetting;