import { Maybe } from "ts-functional/dist/types";

// Entities
export interface IPlayer {
    id:number;
    name:string;
};
export type Player = IPlayer;

export type HandCount = 1|2|3|4|5|6|7;

export interface IRound {
    id:number;
    handCount:HandCount;
    complete:boolean;
};
export type Round = IRound;

export type AllowedBid = HandCount|0;

export interface IBid {
    playerId:number;
    roundId:number;
    bid?:AllowedBid;
    won?:boolean;
};
export type Bid = IBid;

export interface IGame {
    players:Player[];
    rounds:Round[];
    bids:Bid[];
    initialDealerId:number;
};
export type Game = IGame;

export interface IGameContainer {
    seven:Game;
}
export type GameContainer = IGameContainer;

export interface IPlayerProps {
    players: {
        list: IPlayer[];
        add: (name:string) => void;
        remove: (id:number) => () => void;
    }
}

export interface IDealerProps {
    dealer: {
        first: number;
        current: (roundId:number) => number;
        set: (id:number) => () => void;
    }
}

export interface IRoundsProps {
    rounds: {
        list: IRound[];
        complete: (id:number) => () => void;
    }
}

export interface IRoundProps {
    round: {
        current: IRound;
        canStart: boolean;
        canFinish: boolean;
        dealerCantBid: number;
    }
}

export interface IBidProps {
    bids: {
        clear: () => void;
        get: {
            byRound: (roundId:number) => IBid[];
            byPlayer: (playerId:number) => IBid[];
            one: (roundId:number, playerId:number) => Maybe<IBid>;
        },
        set: (roundId:number, playerId:number) => (bid:AllowedBid) => void;
        win: (roundId:number, playerId:number) => () => void;
        lose: (roundId:number, playerId:number) => () => void;
    }
}