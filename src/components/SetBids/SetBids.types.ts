import { RouteComponentProps } from 'react-router';
import { Player, Round } from '../../util/Seven.types';

export interface ISetBidsStateProps {
    players:Player[];
    getBid: (playerId:number) => number | undefined;
    getWonColor: (playerId:number) => string | undefined;
    getLostColor: (playerId:number) => string | undefined;
    dealerCantBid:number;
    round:Round;
    canStart:boolean;
    canFinish:boolean;
    dealerId:number;
};

export interface ISetBidsDispatchProps {
    setBid:(roundId:number, playerId:number) => (bid:number) => void;
    setHandStatus: (roundId:number, playerId:number, bid:number | undefined, won:boolean) => () => void;
    backToOverview: () => void;
    prevRound: () => void;
    nextRound: () => void;
};

export interface IRouteParams {
    roundId:string;
};
export type SetBidsProps = RouteComponentProps<IRouteParams>;

export type SetBidsComponentProps = ISetBidsStateProps & ISetBidsDispatchProps & SetBidsProps;
