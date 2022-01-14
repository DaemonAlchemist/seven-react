import { IBidProps, IDealerProps, IPlayerProps, IRoundsProps } from "../../util/types";

// What gets passed into the component from the parent as attributes
export declare interface IOverviewInputProps {

}

export type OverviewProps = IOverviewInputProps & IPlayerProps & IDealerProps & IRoundsProps & IBidProps;