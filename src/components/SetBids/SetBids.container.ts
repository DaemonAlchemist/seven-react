import { inject, mergeProps } from "unstateless";
import { injectBids, injectDealer, injectPlayers, injectRound } from "../../util/state";
import { SetBidsComponent } from "./SetBids.component";
import { ISetBidsInputProps, SetBidsProps } from "./SetBids.d";

const connect = inject<ISetBidsInputProps, SetBidsProps>(mergeProps(
    injectRound,
    injectPlayers,
    injectDealer,
    injectBids
));

export const SetBids = connect(SetBidsComponent);
