import {Player} from "../../util/Seven.types";

export interface INewGameStateProps {
    players:Player[];
    initialDealerId:number;
};

export interface INewGameDispatchProps {
    addPlayer:(name:string) => void;
    setInitialDealer:(playerId:number) => void;
};

export type NewGameComponentProps = INewGameStateProps & INewGameDispatchProps;
