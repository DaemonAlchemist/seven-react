import React from 'react';
import { ScoreProps } from "./Score.d";
import './Score.scss';

export const ScoreComponent = (props:ScoreProps) => {
    const score = props.bids.get.byPlayer(props.playerId)
        .filter(bid => bid.won || false)
           .map(bid => bid.bid || 0)
        .reduce((score:number, bid:number) => score + bid + 10, 0)
        
    return <>{score}</>;
}
