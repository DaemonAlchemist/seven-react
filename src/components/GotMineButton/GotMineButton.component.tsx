import { Tag } from 'antd';
import React from 'react';
import {GotMineButtonProps} from "./GotMineButton.d";
import './GotMineButton.scss';

export const GotMineButtonComponent = (props:GotMineButtonProps) =>
    <Tag
        color={props.bids.get.one(props.roundId, props.playerId)?.won === true ? "green" : undefined}
        onClick={props.bids.win(props.roundId, props.playerId)}
    >
        Got my {props.bid}
    </Tag>;
