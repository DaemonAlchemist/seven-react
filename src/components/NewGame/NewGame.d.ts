import { IDealerProps, IPlayerProps } from "../../util/types";

// What gets passed into the component from the parent as attributes
export declare interface INewGameInputProps {

}

export type NewGameProps = INewGameInputProps & IPlayerProps & IDealerProps;