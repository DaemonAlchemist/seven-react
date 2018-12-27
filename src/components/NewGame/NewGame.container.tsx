import {input} from "basic-reducers";
import {push} from 'connected-react-router';
import {connect} from 'react-redux';
import {addPlayer, getInitialDealerId, getPlayers,removePlayer, setInitialDealer} from "../../util/Seven.redux";
import {IGameContainer} from "../../util/Seven.types";
import {NewGameComponent} from "./NewGame.component";
import {INewGameDispatchProps, INewGameStateProps} from "./NewGame.types";

export const NewGame = connect<INewGameStateProps, INewGameDispatchProps>(
    (state:IGameContainer):INewGameStateProps => ({
        disableStartBtn: getInitialDealerId(state) === -1 || getPlayers(state).length < 2,
        initialDealerId: getInitialDealerId(state),
        newPlayerName: input.value(() => state, "newPlayer"),
        players: getPlayers(state),
    }),
    (dispatch:any):INewGameDispatchProps => ({
        addPlayer:(name:string) => () => {
            dispatch(addPlayer(name))
            dispatch(input.clear("newPlayer"));
        },
        onNewPlayerNameChange: (e:any) => {
            dispatch(input.set("newPlayer", e.target.value));
        },
        removePlayer:(id:number) => () => {
            dispatch(removePlayer(id))
        },
        setInitialDealer:(playerId:number) => () => {
            dispatch(setInitialDealer(playerId))
        },
        startGame: () => {
            dispatch(push("/overview"));
        },
    })
)(NewGameComponent);
