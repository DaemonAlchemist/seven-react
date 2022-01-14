import { inject, mergeProps } from "unstateless";
import {BidComponent} from "./Bid.component";
import {IBidInputProps, BidProps} from "./Bid.d";

const connect = inject<IBidInputProps, BidProps>(mergeProps((a:any) => a));

export const Bid = connect(BidComponent);
