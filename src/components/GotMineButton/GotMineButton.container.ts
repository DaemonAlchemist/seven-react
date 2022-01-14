import { inject, mergeProps } from "unstateless";
import { injectBids } from "../../util/state";
import { GotMineButtonComponent } from "./GotMineButton.component";
import { GotMineButtonProps, IGotMineButtonInputProps } from "./GotMineButton.d";

const connect = inject<IGotMineButtonInputProps, GotMineButtonProps>(mergeProps(
    injectBids
));

export const GotMineButton = connect(GotMineButtonComponent);
