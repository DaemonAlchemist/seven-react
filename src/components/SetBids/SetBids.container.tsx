import { push } from 'connected-react-router';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';

import { getBidsByRound, getInitialDealerId, getPlayers, getRound, setBid } from '../../util/Seven.redux';
import { AllowedBid, IBid, IGameContainer } from '../../util/Seven.types';
import {SetBidsComponent} from './SetBids.component';
import {ISetBidsDispatchProps, ISetBidsStateProps, SetBidsProps} from "./SetBids.types";

const getBid = (state:IGameContainer, roundId:number, playerId:number):IBid =>
    getBidsByRound(state, roundId)
        .filter((bid:IBid) => bid.playerId === playerId)[0]
     || {bid: undefined};

export const SetBids = withRouter(connect<ISetBidsStateProps, ISetBidsDispatchProps, SetBidsProps>(
    (state:IGameContainer, props:SetBidsProps):ISetBidsStateProps => ({
        canStart: getBidsByRound(state, +props.match.params.roundId)
            .filter((bid:IBid) => typeof bid.bid !== 'undefined' && bid.bid >= 0)
            .length === getPlayers(state).length,
        dealerId: (getInitialDealerId(state) + (+props.match.params.roundId)) % getPlayers(state).length,
        getBid: (playerId:number):number | undefined => getBid(state, +props.match.params.roundId, playerId).bid,
        getLostColor: (playerId:number):string | undefined => {
            const bid:IBid = getBid(state, +props.match.params.roundId, playerId);
             return typeof bid.won === 'undefined' ? undefined : bid.won ? undefined : "red";
        },
        getWonColor: (playerId:number):string | undefined => {
            const bid:IBid = getBid(state, +props.match.params.roundId, playerId);
             return typeof bid.won === 'undefined' ? undefined : bid.won ? "green" : undefined;
        },
        players: getPlayers(state),
        round: getRound(state, +props.match.params.roundId),
    }),
    (dispatch:any, props:SetBidsProps):ISetBidsDispatchProps => ({
        backToOverview: () => {
            dispatch(push(`/overview`));
        },
        setBid: (roundId:number, playerId:number) => (bid:AllowedBid) => {
            dispatch(setBid({roundId, playerId, bid}));
        },
        setHandStatus: (roundId:number, playerId:number, bid:AllowedBid | undefined, won:boolean | undefined) => () => {
            dispatch(setBid({roundId, playerId, bid, won}));
        }
    })
)(SetBidsComponent));
