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
            <b>Round {props.round.id + 1} ({props.round.handCount} {props.round.handCount > 1 ? "hands" : "hand"})</b>
        </Col>
        <Divider />
        {props.players.map((player:Player, index:number) => 
            <Col xs={24} key={player.id}>
                {player.name}&nbsp;
                {index === 0 && <Tag color="green">Leads</Tag>}
                {player.id === props.dealerId &&
                    <>
                        <Tag color="green">Dealer</Tag>
                        {props.dealerCantBid >= 0 &&
                            <Tag color="red">Can't bid {props.dealerCantBid}</Tag>
                        }
                    </>
                }
                <div style={{float: "right"}}>
                    <Tag
                        color={props.getWonColor(player.id)}
                        onClick={props.setHandStatus(props.round.id, player.id, props.getBid(player.id), true)}
                    >
                        Got my&nbsp;{props.getBid(player.id)}!
                    </Tag>
                    <Tag
                        color={props.getLostColor(player.id)}
                        onClick={props.setHandStatus(props.round.id, player.id, props.getBid(player.id), false)}
                    >
                        Got screwed
                    </Tag>
                </div>
                <Slider
                    min={-1}
                    max={props.round.handCount}
                    marks={getOptions(props.round.handCount)}
                    step={1}
                    value={props.getBid(player.id)}
                    onChange={props.setBid(props.round.id, player.id)}
                    style={{marginBottom: "32px"}}
                />
                <Divider />
            </Col>
        )}
        <Col xs={24}>
            <Button disabled={!props.canStart} onClick={props.backToOverview} style={{float: "right"}}>
                <Icon type="arrow-right" /> Overview
            </Button>
        </Col>
    </>;
