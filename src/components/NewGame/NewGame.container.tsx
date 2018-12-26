import {input} from "basic-reducers";
import {connect} from 'react-redux';
import {IGameContainer} from "../../util/Seven.types";
import {NewGameComponent} from "./NewGame.component";
import {INewGameDispatchProps, INewGameStateProps} from "./NewGame.types";

export const NewGame = connect<INewGameStateProps, INewGameDispatchProps>(
    (state:IGameContainer):INewGameStateProps => ({
        initialDealerId: 1,
        newPlayerName: input.value(() => state, "newPlayer"),
        players: [{id:0, name: "Andy"}, {id: 1, name: "Andrea"}, {id: 2, name: "Adrian"}],
    }),
    (dispatch:any):INewGameDispatchProps => ({
        addPlayer:(name:string) => () => {alert(name);},
        onNewPlayerNameChange: (e:any) => {dispatch(input.set("newPlayer", e.target.value));},
        setInitialDealer:(playerId:number) => () => {alert(playerId);},
        startGame: () => {alert("start game");},
    })
)(NewGameComponent);
