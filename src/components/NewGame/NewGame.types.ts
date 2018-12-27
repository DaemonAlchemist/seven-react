import {Player} from "../../util/Seven.types";

export interface INewGameStateProps {
    players:Player[];
    initialDealerId:number;
    newPlayerName:string;
    disableStartBtn:boolean;
};

export interface INewGameDispatchProps {
    addPlayer:(name:string) => () => void;
    onNewPlayerNameChange: (e:any) => void;
    removePlayer:(id:number) => () => void;
    setInitialDealer:(playerId:number) => () => void;
    startGame: () => void;
};

export type NewGameComponentProps = INewGameStateProps & INewGameDispatchProps;
