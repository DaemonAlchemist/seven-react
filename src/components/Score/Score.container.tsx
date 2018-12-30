// import {prop} from 'atp-pointfree';
import * as React from 'react';
import {connect} from 'react-redux';
import {getBidsByPlayer} from "../../util/Seven.redux";
import {IBid, IGameContainer} from "../../util/Seven.types";
import {IScoreProps, IScoreStateProps} from "./Score.types";

// const debug = (stuff:any) => {alert(JSON.stringify(stuff)); return stuff;};

export const Score = connect<IScoreStateProps, {}, IScoreProps, IGameContainer>(
    (state:IGameContainer, props:IScoreProps):IScoreStateProps => ({
        score: getBidsByPlayer(state, props.playerId)
            .filter((bid:IBid):boolean => bid.won || false)
            .map((bid:IBid):number => bid.bid || 0)
            .reduce((score:number, bid:number) => score + bid + 10, 0),
    })
)((props:IScoreStateProps & IScoreProps) => <>{props.score}</>);