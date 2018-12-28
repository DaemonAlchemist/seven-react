import { push } from 'connected-react-router';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';

import { getBidsByRound, getInitialDealerId, getPlayers, getRound, setBid } from '../../util/Seven.redux';
import { AllowedBid, IBid, IGameContainer } from '../../util/Seven.types';
import {SetBidsComponent} from './SetBids.component';
import {ISetBidsDispatchProps, ISetBidsStateProps, SetBidsProps} from "./SetBids.types";

export const SetBids = withRouter(connect<ISetBidsStateProps, ISetBidsDispatchProps, SetBidsProps>(
    (state:IGameContainer, props:SetBidsProps):ISetBidsStateProps => ({
        canStart: getBidsByRound(state, +props.match.params.roundId)
            .filter((bid:IBid) => typeof bid.bid !== 'undefined' && bid.bid >= 0)
            .length === getPlayers(state).length,
        dealerId: (getInitialDealerId(state) + (+props.match.params.roundId)) % getPlayers(state).length,
        getBid: (playerId:number):number | undefined => (getBidsByRound(state, +props.match.params.roundId)
            .filter((bid:IBid) => bid.playerId === playerId)[0] || {bid: undefined})
            .bid,
        players: getPlayers(state),
        round: getRound(state, +props.match.params.roundId),
    }),
    (dispatch:any, props:SetBidsProps):ISetBidsDispatchProps => ({
        setBid: (roundId:number, playerId:number) => (bid:AllowedBid) => {
            dispatch(setBid({roundId, playerId, bid}));
        },
        startRound: () => {
            dispatch(push(`/record-results/${props.match.params.roundId}`));
        },
    })
)(SetBidsComponent));
