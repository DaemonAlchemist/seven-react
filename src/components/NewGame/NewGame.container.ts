import { inject, mergeProps } from "unstateless";
import { injectDealer, injectPlayers } from "../../util/state";
import { NewGameComponent } from "./NewGame.component";
import { INewGameInputProps, NewGameProps } from "./NewGame.d";

const connect = inject<INewGameInputProps, NewGameProps>(mergeProps(
    injectPlayers,
    injectDealer
));

export const NewGame = connect(NewGameComponent);
