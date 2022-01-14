import { IBidProps, IDealerProps, IPlayerProps, IRoundProps } from "../../util/types";

// What gets passed into the component from the parent as attributes
export declare interface ISetBidsInputProps {

}

export type SetBidsProps = ISetBidsInputProps & IRoundProps & IPlayerProps & IDealerProps & IBidProps;

export type BidOption = string | {label: string, style: React.CSSProperties};

export interface IBidOptionList {
    [bid:number]: BidOption;
}
