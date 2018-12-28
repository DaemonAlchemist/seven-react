import { push } from 'connected-react-router';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';

import { getBids, getPlayers, getRound, setBid } from '../../util/Seven.redux';
import { AllowedBid, IGameContainer } from '../../util/Seven.types';
import {SetBidsComponent} from './SetBids.component';
import {ISetBidsDispatchProps, ISetBidsStateProps, SetBidsProps} from "./SetBids.types";

export const SetBids = withRouter(connect<ISetBidsStateProps, ISetBidsDispatchProps, SetBidsProps>(
    (state:IGameContainer, props:SetBidsProps):ISetBidsStateProps => ({
        bids: getBids(state),
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
