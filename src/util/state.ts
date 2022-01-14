import { useParams } from "react-router-dom";
import { first } from "ts-functional";
import { useLocalStorage } from "unstateless";
import { AllowedBid, HandCount, IBid, IBidProps, IDealerProps, IPlayer, IPlayerProps, IRound, IRoundProps, IRoundsProps } from "./types";

export const usePlayers = useLocalStorage.object<IPlayer[]>("seven:players", []);
export const useFirstDealer = useLocalStorage.number("seven:firstDealer", 0);
export const useBids = useLocalStorage.object<IBid[]>("seven:bids", []);

const initialRounds = ([1,2,3,4,5,6,7,6,5,4,3,2,1] as HandCount[]).map((handCount:HandCount, id:number):IRound => ({id, handCount, complete: false}));
export const useRounds = useLocalStorage.object<IRound[]>(initialRounds);

export const injectPlayers = <T>(props:T):T & IPlayerProps => {
    const [players, setPlayers] = usePlayers(); // eslint-disable-line react-hooks/rules-of-hooks
    const [firstDealer, setFirstDealer] = useFirstDealer(); // eslint-disable-line react-hooks/rules-of-hooks

    const add = (name:string) => {
        if(players.length === 0) {
            setFirstDealer(0);
        }

        setPlayers([
            ...players,
            {
                id: (players[players.length - 1] || {id: -1}).id + 1,
                name
            }
        ]);
    };

    const remove = (id:number) => () => {
        setPlayers(players.filter(p => p.id !== id));

        if(firstDealer === id) {
            setFirstDealer((players.filter(player => player.id !== id)[0] || {id: -1}).id)
        }        
    }

    return {...props, players: {list: players, add, remove}};
}

const currentDealer = (firstDealer: number, roundId:number, players: number) => (firstDealer + roundId) % players;
export const injectDealer = <T>(props:T):T & IDealerProps => {
    const [firstDealer, setFirstDealer] = useFirstDealer(); // eslint-disable-line react-hooks/rules-of-hooks
    const [players] = usePlayers(); // eslint-disable-line react-hooks/rules-of-hooks
    const set = (id:number) => () => {setFirstDealer(id);}

    const current = (roundId:number) => currentDealer(firstDealer, roundId, players.length);

    return {...props, dealer: {first: firstDealer, current, set}};
}

export const injectRounds = <T>(props:T):T & IRoundsProps => {
    const [rounds, setRounds] = useRounds(); // eslint-disable-line react-hooks/rules-of-hooks

    const complete = (id:number) => () => {
        setRounds(rounds.splice(id, 1, {...rounds[id], complete: true}));
    }

    return {...props, rounds: {list: rounds, complete}};
}

export const injectRound = <T>(props:T):T & IRoundProps => {
    const [rounds] = useRounds(); // eslint-disable-line react-hooks/rules-of-hooks
    const [bids] = useBids(); // eslint-disable-line react-hooks/rules-of-hooks
    const [players] = usePlayers(); // eslint-disable-line react-hooks/rules-of-hooks
    const [firstDealer] = useFirstDealer(); // eslint-disable-line react-hooks/rules-of-hooks
    const params = useParams(); // eslint-disable-line react-hooks/rules-of-hooks

    const roundId:number = params.roundId ? +params.roundId : -1;

    const current = first(rounds.filter(r => r.id === roundId)) || {id: -1, handCount: 1, complete: false};

    const canStart = bids
        .filter(b => b.roundId === roundId && typeof b.won !== 'undefined')
        .length === players.length;
    const canFinish = bids
        .filter(b => b.roundId === roundId && typeof b.bid !== 'undefined' && b.bid >= 0)
        .length === players.length;
    const dealerCantBid = current.handCount - 
        bids
            .filter(b =>
                b.roundId === roundId &&
                typeof b.bid === "number" &&
                b.bid >= 0 &&
                b.playerId !== currentDealer(firstDealer, roundId, players.length)
            )
            .map(b => b.bid || 0)
            .reduce((bids:number, bid:number) => bids + bid, 0);

    return {...props, round: {current, canStart, canFinish, dealerCantBid}};
}

export const injectBids = <T>(props:T):T & IBidProps => {
    const [bids, setBids] = useBids(); // eslint-disable-line react-hooks/rules-of-hooks

    const clear = () => {setBids([]);}
    const byRound = (roundId:number) => bids.filter(b => b.roundId === roundId);
    const byPlayer = (playerId:number) => bids.filter(b => b.playerId === playerId);
    const one = (roundId:number, playerId:number) => first(bids.filter(b => b.roundId === roundId && b.playerId === playerId));
    const set = (roundId:number, playerId:number) => (bid:AllowedBid) => setBids([
        ...bids.filter(b => b.roundId !== roundId || b.playerId !== playerId),
        {roundId, playerId, bid}
    ]);
    const win = (roundId:number, playerId:number) => () => {
        setBids(bids.map(b => b.roundId === roundId && b.playerId === playerId ? {...b, won: true} : b));
    }

    const lose = (roundId:number, playerId:number) => () => {
        setBids(bids.map(b => b.roundId === roundId && b.playerId === playerId ? {...b, won: false} : b));
    }

    return {...props, bids: {clear, get: {byRound, byPlayer, one}, set, win, lose}};
}