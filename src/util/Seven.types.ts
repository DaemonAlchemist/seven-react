
// Entities
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

export interface IGameContainer {
    seven:Game;
}
export type GameContainer = IGameContainer;

// Redux
// Action types
export enum ActionType {
    InitGame,
    AddPlayer,
    SetBid,
};

export interface IAction {
    type:ActionType;
};
export type Action = IAction;

export interface IInitGameAction extends IAction {
    type:ActionType.InitGame;
};
export type InitGameAction = IInitGameAction;

export interface IAddPlayerAction extends IAction {
    type:ActionType.AddPlayer;
    name:string;
};
export type AddPlayerAction = IAddPlayerAction;

export interface ISetBidAction extends IAction {
    type:ActionType.SetBid;
    bid:Bid;
};
export type SetBidAction = ISetBidAction;
