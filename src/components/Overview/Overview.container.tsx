import {_, map, partitionOn} from 'atp-pointfree';
import {push} from 'connected-react-router';
import {connect} from 'react-redux';
import { getBids, getPlayers, getRounds } from '../../util/Seven.redux';
import { IBid, IGameContainer } from '../../util/Seven.types';
import {OverviewComponent} from "./Overview.component";
import { IOverviewDispatchProps, IOverviewStateProps } from './Overview.types';

export const Overview = connect<IOverviewStateProps, IOverviewDispatchProps>(
    (state:IGameContainer) => ({
        getBid: (() => {
            const bids = _(map(partitionOn("playerId")), partitionOn("roundId"))(getBids(state) || []) || {};
            return (roundId:number, playerId:number):IBid => bids[roundId] && bids[roundId][playerId]
                ? bids[roundId][playerId]
                : {roundId, playerId};
        })(),
        players: getPlayers(state),
        rounds: getRounds(state),
    }),
    (dispatch:any) => ({
        startRound: (id:number) => () => {
            dispatch(push(`/set-bids/${id}`));
        }
    }),
)(OverviewComponent);
