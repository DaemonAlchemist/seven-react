import { push } from 'connected-react-router';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';

import { completeRound, getBidsByRound, getInitialDealerId, getPlayers, getRound, setBid } from '../../util/Seven.redux';
import { AllowedBid, IBid, IGameContainer } from '../../util/Seven.types';
import {SetBidsComponent} from './SetBids.component';
import {ISetBidsDispatchProps, ISetBidsStateProps, SetBidsProps} from "./SetBids.types";

const getBid = (state:IGameContainer, roundId:number, playerId:number):IBid =>
    getBidsByRound(state, roundId)
        .filter((bid:IBid) => bid.playerId === playerId)[0]
     || {bid: undefined};

const getDealerId = (state:IGameContainer, roundId:number) =>
    (getInitialDealerId(state) + (roundId)) % getPlayers(state).length

export const SetBids = withRouter(connect<ISetBidsStateProps, ISetBidsDispatchProps, SetBidsProps>(
    (state:IGameContainer, props:SetBidsProps):ISetBidsStateProps => ({
        canFinish: getBidsByRound(state, +props.match.params.roundId)
            .filter((bid:IBid) => typeof bid.won !== 'undefined')
            .length === getPlayers(state).length, 
        canStart: getBidsByRound(state, +props.match.params.roundId)
            .filter((bid:IBid) => typeof bid.bid !== 'undefined' && bid.bid >= 0)
            .length === getPlayers(state).length,
        dealerCantBid: getRound(state, +props.match.params.roundId).handCount - 
            getBidsByRound(state, +props.match.params.roundId)
                .filter((bid:IBid) => typeof bid.bid === "number" && bid.bid >= 0 && bid.playerId !== getDealerId(state, +props.match.params.roundId))
                .map((bid:IBid):number => bid.bid || 0)
                .reduce((bids:number, bid:number) => bids + bid, 0),
        dealerId: getDealerId(state, +props.match.params.roundId),
        getBid: (playerId:number):number | undefined => getBid(state, +props.match.params.roundId, playerId).bid,
        getLostColor: (playerId:number):string | undefined => {
            const bid:IBid = getBid(state, +props.match.params.roundId, playerId);
             return typeof bid.won === 'undefined' ? undefined : bid.won ? undefined : "red";
        },
        getWonColor: (playerId:number):string | undefined => {
            const bid:IBid = getBid(state, +props.match.params.roundId, playerId);
             return typeof bid.won === 'undefined' ? undefined : bid.won ? "green" : undefined;
        },
        players: (() => {
            let players = getPlayers(state);
            while(players[players.length - 1].id !== getDealerId(state, +props.match.params.roundId)) {
                players = players.slice(1).concat(players[0]);
            }
            return players;
        })(),
        round: getRound(state, +props.match.params.roundId),
    }),
    (dispatch:any, props:SetBidsProps):ISetBidsDispatchProps => ({
        backToOverview: () => {
            dispatch(completeRound(+props.match.params.roundId));
            dispatch(push(`/overview`));
        },
        nextRound: () => {
            dispatch(completeRound(+props.match.params.roundId));
            dispatch(push(`/overview`));
            setTimeout(() => {
                dispatch(push(`/set-bids/${+props.match.params.roundId + 1}`));
            }, 0);
        },
        prevRound: () => {
            dispatch(push(`/set-bids/${+props.match.params.roundId - 1}`))
        },
        setBid: (roundId:number, playerId:number) => (bid:AllowedBid) => {
            dispatch(setBid({roundId, playerId, bid}));
        },
        setHandStatus: (roundId:number, playerId:number, bid:AllowedBid | undefined, won:boolean | undefined) => () => {
            dispatch(setBid({roundId, playerId, bid, won}));
        }
    })
)(SetBidsComponent));
