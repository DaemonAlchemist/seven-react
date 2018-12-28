import { RouteComponentProps } from 'react-router';
import { Bid, Player, Round } from '../../util/Seven.types';

export interface ISetBidsStateProps {
    players:Player[];
    bids:Bid[];
    round:Round;
};

export interface ISetBidsDispatchProps {
    setBid:(roundId:number, playerId:number) => (bid:number) => void;
    startRound: () => void;
};

export interface IRouteParams {
    roundId:string;
};
export type SetBidsProps = RouteComponentProps<IRouteParams>;

export type SetBidsComponentProps = ISetBidsStateProps & ISetBidsDispatchProps & SetBidsProps;
