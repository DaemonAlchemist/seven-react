import { Tag } from 'antd';
import React from 'react';
import {GotScrewedButtonProps} from "./GotScrewedButton.d";
import './GotScrewedButton.scss';

export const GotScrewedButtonComponent = (props:GotScrewedButtonProps) =>
    <Tag
        color={props.bids.get.one(props.roundId, props.playerId)?.won === false ? "red" : undefined}
        onClick={props.bids.lose(props.roundId, props.playerId)}
    >
        Got screwed
    </Tag>;
