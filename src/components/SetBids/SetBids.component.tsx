import {Button, Icon, Slider, Tag} from 'antd';
import * as React from 'react';
import {HandCount, Player} from "../..//util/Seven.types";
import {Col, Divider} from "../Layout";
import { SetBidsComponentProps } from './SetBids.types';

const getOptions = (handCount:HandCount):{} => {
    const options = {[-1]: ''};
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
                {player.name} {player.id === props.dealerId && <Tag color="green">Dealer</Tag>}
                <Slider
                    min={-1}
                    max={props.round.handCount}
                    marks={getOptions(props.round.handCount)}
                    step={1}
                    value={props.getBid(player.id)}
                    onChange={props.setBid(props.round.id, player.id)}
                />
            </Col>
        )}
        <Divider />
        <Col xs={24}>
            <Button disabled={!props.canStart} onClick={props.startRound} style={{float: "right"}}>
                <Icon type="arrow-right" /> Start Round
            </Button>
        </Col>
    </>;
