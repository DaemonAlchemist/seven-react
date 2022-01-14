import { IBidProps } from "../../util/types";

// What gets passed into the component from the parent as attributes
export declare interface IGotScrewedButtonInputProps {
    roundId: number;
    playerId: number;
}

export type GotScrewedButtonProps = IGotScrewedButtonInputProps & IBidProps;