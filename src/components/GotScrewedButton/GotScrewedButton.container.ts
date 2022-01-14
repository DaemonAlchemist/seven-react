import { inject, mergeProps } from "unstateless";
import { injectBids } from "../../util/state";
import { GotScrewedButtonComponent } from "./GotScrewedButton.component";
import { GotScrewedButtonProps, IGotScrewedButtonInputProps } from "./GotScrewedButton.d";

const connect = inject<IGotScrewedButtonInputProps, GotScrewedButtonProps>(mergeProps(
    injectBids
));

export const GotScrewedButton = connect(GotScrewedButtonComponent);
