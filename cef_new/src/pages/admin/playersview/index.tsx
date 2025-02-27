import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {translateText} from '#/shared/locale'
import './assets/css/playerlist.css';
import SmallLogo from '../../assets/images/logo.png';
import {addPlayer, updatePlayerList} from 'store/playerListSlice';
import {RootState} from '#/shared/store';

const PlayerList: React.FC = () => {
    const dispatch = useDispatch();
    const items = useSelector((state: RootState) => state.playerList.items);
    const [playersSort, setPlayersSort] = useState<number>(0);
    const [sortRevert, setSortRevert] = useState<boolean>(false);

    useEffect(() => {
        window.playerlist = {
            addPlayer: (id: number, name: string, level: number, ping: number) => {
                dispatch(addPlayer({id, name, level, ping}));
            },
            updatePlayerList: () => {
                dispatch(updatePlayerList());
            },
        };
    }, [dispatch]);

    const sortPlayers = (id: number) => {
        if (playersSort === id) {
            setSortRevert(!sortRevert);
        } else {
            setPlayersSort(id);
            setSortRevert(false);
        }
    };

    return (
        <div className="plist">
            <div className="head">
                <img src={SmallLogo} alt="SmallLogo"/>
                <h1>RedAge.net</h1>
                <span>Players: {items.length}</span>
            </div>
            <div className="list">
                <table>
                    <thead>
                    <tr>
                        <th
                            onClick={() => sortPlayers(0)}
                            className={`${playersSort === 0 ? 'selectedSort' : ''} ${sortRevert ? 'reversedSort' : ''}`}
                        >
                            ID
                        </th>
                        <th
                            onClick={() => sortPlayers(1)}
                            className={`${playersSort === 1 ? 'selectedSort' : ''} ${sortRevert ? 'reversedSort' : ''}`}
                        >
                            {translateText('admin', 'Никнейм')}
                        </th>
                        <th
                            onClick={() => sortPlayers(2)}
                            className={`${playersSort === 2 ? 'selectedSort' : ''} ${sortRevert ? 'reversedSort' : ''}`}
                        >
                            {translateText('admin', 'Уровень')}
                        </th>
                        <th
                            onClick={() => sortPlayers(3)}
                            className={`${playersSort === 3 ? 'selectedSort' : ''} ${sortRevert ? 'reversedSort' : ''}`}
                        >
                            {translateText('admin', 'Пинг')}
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {items.map((value, index) => (
                        <tr key={index}>
                            <td>{value.id}</td>
                            <td>{value.name}</td>
                            <td>{value.level}</td>
                            <td>{value.ping}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PlayerList;