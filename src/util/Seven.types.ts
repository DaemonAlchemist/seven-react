export interface IPlayer {
    id:number;
    name:string;
};
export type Player = IPlayer;

export interface IRound {
    id:number;
    dealerId:number;
    handCount:1|2|3|4|5|6|7;
};
export type Round = IRound;

export interface IBid {
    playerId:number;
    roundId:number;
    bid?:1|2|3|4|5|6|7;
    won?:boolean;
};
export type Bid = IBid;

export interface IGame {
    players:Player[];
    rounds:Round[];
    bids:Bid[];
};
export type Game = IGame;