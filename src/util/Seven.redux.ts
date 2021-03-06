import {splice, switchOn} from 'atp-pointfree';
import {
    ActionType, AddPlayerAction, HandCount, IAction, IBid, ICompleteRoundAction, IGame,
    IGameContainer, IPlayer, IRound, ISetBidAction, RemovePlayerAction, SetInitialDealerAction
} from "./Seven.types";

// Action creators
export const initGame = () => ({type: ActionType.InitGame});
export const addPlayer = (name:string) => ({type: ActionType.AddPlayer, name});
export const removePlayer = (id:number) => ({type: ActionType.RemovePlayer, id});
export const setInitialDealer = (id:number) => ({type: ActionType.SetInitialDealer, id});
export const setBid = (bid:IBid) => ({type:ActionType.SetBid, bid});
export const completeRound = (roundId:number) => ({type:ActionType.CompleteRound, roundId});
// Reducer
const initialState = {
    bids: [],
    initialDealerId: -1,
    players: [],
    rounds: [1,2,3,4,5,6,7,6,5,4,3,2,1].map((handCount:HandCount, id:number):IRound => ({id, handCount, complete: false})),
};
export const sevenReducer = (state:IGame = initialState, action:IAction) => switchOn(action.type, {
    [ActionType.InitGame]: () => Object.assign({}, initialState),
    [ActionType.AddPlayer]: () => Object.assign({}, state, {
        initialDealerId: state.players.length === 0 ? 0 : state.initialDealerId,
        players: state.players.concat({
            id: (state.players[state.players.length - 1] || {id: -1}).id + 1,
            name: (action as AddPlayerAction).name
        })
        .map((player:IPlayer, id:number) => ({...player, id})),
    }),
    [ActionType.RemovePlayer]: () => Object.assign({}, state, {
        initialDealerId: state.initialDealerId === (action as RemovePlayerAction).id
            ? (state.players.filter(player => player.id !== (action as RemovePlayerAction).id)[0] || {id: -1}).id
            : state.initialDealerId,
        players: state.players
            .filter(player => player.id !== (action as RemovePlayerAction).id)
            .map((player:IPlayer, id:number) => ({...player, id})),
    }),
    [ActionType.SetInitialDealer]: () => Object.assign({}, state, {
        initialDealerId: (action as SetInitialDealerAction).id
    }),
    [ActionType.SetBid]: () => Object.assign({}, state, {
        bids: state.bids
            .filter((bid:IBid) => bid.roundId !== (action as ISetBidAction).bid.roundId || bid.playerId !== (action as ISetBidAction).bid.playerId)
            .concat((action as ISetBidAction).bid)
    }),
    [ActionType.CompleteRound]: () => Object.assign({}, state, {
        rounds: splice(
            (action as ICompleteRoundAction).roundId,
            1,
            Object.assign({}, state.rounds[(action as ICompleteRoundAction).roundId], {complete: true})
        )(state.rounds)
    }),
    default: () => state
});

// Selectors
export const getInitialDealerId = (state:IGameContainer):number => state.seven.initialDealerId;
export const getPlayers = (state:IGameContainer):IPlayer[] => state.seven.players;
export const getRounds = (state:IGameContainer):IRound[] => state.seven.rounds;
export const getRound = (state:IGameContainer, roundId:number):IRound => state.seven.rounds.filter(round => round.id === roundId)[0];
export const getBids = (state:IGameContainer):IBid[] => state.seven.bids;
export const getBidsByRound = (state:IGameContainer, roundId:number) =>
    state.seven.bids.filter(bid => bid.roundId === roundId);
export const getBidsByPlayer = (state:IGameContainer, playerId:number) =>
    state.seven.bids.filter(bid => bid.playerId === playerId);
