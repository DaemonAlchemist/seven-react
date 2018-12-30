import {push} from 'connected-react-router';
import {connect} from 'react-redux';
import { getBids, getPlayers, getRounds, initGame } from '../../util/Seven.redux';
import { IBid, IGameContainer } from '../../util/Seven.types';
import {OverviewComponent} from "./Overview.component";
import { IOverviewDispatchProps, IOverviewStateProps } from './Overview.types';

export const Overview = connect<IOverviewStateProps, IOverviewDispatchProps>(
    (state:IGameContainer) => ({
        getBid: (roundId:number, playerId:number) => getBids(state)
            .filter((bid:IBid) => bid.roundId === roundId && bid.playerId === playerId)[0]
            || {roundId, playerId},
        players: getPlayers(state),
        rounds: getRounds(state),
    }),
    (dispatch:any) => ({
        newGame: () => {
            dispatch(initGame());
            dispatch(push("/"));
        },
        startRound: (id:number) => () => {
            dispatch(push(`/set-bids/${id}`));
        }
    }),
)(OverviewComponent);
