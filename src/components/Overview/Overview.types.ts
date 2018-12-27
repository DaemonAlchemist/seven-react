import { IBid, IPlayer, IRound } from '../../util/Seven.types';

export interface IOverviewStateProps {
    players:IPlayer[],
    rounds:IRound[],
    getBid: (roundId:number, playerId:number) => IBid,
}

export interface IOverviewDispatchProps {
    startRound:(id:number) => () => void;
}

export type OverviewComponentProps = IOverviewStateProps & IOverviewDispatchProps;