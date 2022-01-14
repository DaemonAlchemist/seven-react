import { IBidProps } from "../../util/types";

// What gets passed into the component from the parent as attributes
export declare interface IGotMineButtonInputProps {
    roundId: number;
    playerId: number;
    bid?: number;
}

export type GotMineButtonProps = IGotMineButtonInputProps & IBidProps;