
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

// Redux
// Action types
export enum ActionType {
    InitGame,
    AddPlayer,
    RemovePlayer,
    SetInitialDealer,
    SetBid,
    CompleteRound,
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

export interface IRemovePlayerAction extends IAction {
    type: ActionType.RemovePlayer;
    id:number;
}
export type RemovePlayerAction = IRemovePlayerAction;

export interface ISetInitialDealerAction extends IAction {
    type:ActionType.SetInitialDealer;
    id:number;
}
export type SetInitialDealerAction = ISetInitialDealerAction;

export interface ISetBidAction extends IAction {
    type:ActionType.SetBid;
    bid:Bid;
};
export type SetBidAction = ISetBidAction;

export interface ICompleteRoundAction extends IAction {
    type:ActionType.CompleteRound;
    roundId:number;
}
export type CompleteRoundAction = ICompleteRoundAction;