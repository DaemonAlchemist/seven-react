import { inject, mergeProps } from "unstateless";
import { injectBids } from "../../util/state";
import { ScoreComponent } from "./Score.component";
import { IScoreInputProps, ScoreProps } from "./Score.d";

const connect = inject<IScoreInputProps, ScoreProps>(mergeProps(
    injectBids
));

export const Score = connect(ScoreComponent);
