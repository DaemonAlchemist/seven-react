import {Button, Icon, Slider} from 'antd';
import * as React from 'react';
import {HandCount, Player} from "../..//util/Seven.types";
import {Col, Divider} from "../Layout";
import { SetBidsComponentProps } from './SetBids.types';

const getOptions = (handCount:HandCount):{} => {
    const options = {};
    for(let i=0; i<=handCount; i++) {
        options[i] = `${i}`;
    }
    return options;
};

export const SetBidsComponent = (props:SetBidsComponentProps):JSX.Element =>
    <>
        <Col xs={24}>
            <b>Bid on round {props.round.id + 1} ({props.round.handCount} {props.round.handCount > 1 ? "hands" : "hand"})</b>
        </Col>
        <Divider />
        {props.players.map((player:Player) => 
            <Col xs={24} key={player.id}>
                {player.name}
                <Slider
                    min={0}
                    max={props.round.handCount}
                    marks={getOptions(props.round.handCount)}
                    step={1}
                    onChange={props.setBid(props.round.id, player.id)}
                />
            </Col>
        )}
        <Divider />
        <Col xs={24}>
            <Button onClick={props.startRound} style={{float: "right"}}>
                <Icon type="edit" /> Start Round
            </Button>
        </Col>
    </>;
