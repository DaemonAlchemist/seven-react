import { inject, mergeProps } from "unstateless";
import { injectBids, injectDealer, injectPlayers, injectRounds } from "../../util/state";
import {OverviewComponent} from "./Overview.component";
import {IOverviewInputProps, OverviewProps} from "./Overview.d";

const connect = inject<IOverviewInputProps, OverviewProps>(mergeProps(
    injectDealer,
    injectPlayers,
    injectRounds,
    injectBids
));

export const Overview = connect(OverviewComponent);
