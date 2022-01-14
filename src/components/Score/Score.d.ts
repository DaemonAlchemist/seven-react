import { IBidProps } from "../../util/types";

// What gets passed into the component from the parent as attributes
export declare interface IScoreInputProps {
    playerId: number;
}

export type ScoreProps = IScoreInputProps & IBidProps;