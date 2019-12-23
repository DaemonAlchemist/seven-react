import {Button, Icon, Slider, Tag} from 'antd';
import * as React from 'react';
import {HandCount, Player} from "../..//util/Seven.types";
import {Col, Divider, Row} from "../Layout";
import { SetBidsComponentProps } from './SetBids.types';

const getOptions = (handCount:HandCount, isDealer:boolean, cantBid:number):{} => {
    const options = {[-1]: ''};
    for(let i=0; i<=handCount; i++) {
        options[i] = !isDealer || i !== cantBid
            ? `${i}`
            : {
                label: `${i}`,
                style: {color: "#ff0000"},
            };
    }
    return options;
};

export const SetBidsComponent = (props:SetBidsComponentProps):JSX.Element => {
    const [bidsLocked, setBidsLocked] = React.useState(false);
    const lockBids = () => {setBidsLocked(true);}
    const unlockBids = () => {setBidsLocked(false);}

    return <Row>
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
                <div style={{float: "right", display: props.canStart && bidsLocked ? "block" : "none"}}>
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
                <div style={{marginBottom: bidsLocked ? "16px" : "32px"}}>
                    <Slider
                        disabled={bidsLocked}
                        min={-1}
                        max={props.round.handCount}
                        marks={getOptions(props.round.handCount, player.id === props.dealerId, props.dealerCantBid)}
                        step={1}
                        value={props.getBid(player.id)}
                        onChange={props.setBid(props.round.id, player.id)}
                        style={{display: bidsLocked ? "none" : undefined}}
                    />
                </div>
                <Divider />
            </Col>
        )}
        <Col xs={8}>
            {props.round.id > 0 && <Button onClick={props.prevRound}>
                <Icon type="arrow-left" /> Round&nbsp;{props.round.id}
            </Button>}
        </Col>
        <Col xs={8}>
            {!bidsLocked && <Button onClick={lockBids}>
                <Icon type="unlock" /> Lock bids
            </Button>}
            {bidsLocked && <Button onClick={unlockBids}>
                <Icon type="lock" /> Unlock bids
            </Button>}
        </Col>
        <Col xs={8}>
            <div style={{textAlign: "right"}}>
                {props.round.id < 12 && <Button disabled={!props.canFinish} onClick={props.nextRound}>
                    Round&nbsp;{props.round.id + 2} <Icon type="arrow-right" />
                </Button>}
            </div>
        </Col>
        <Divider />
        <Col xs={24}>
            <Button disabled={!props.canFinish} onClick={props.backToOverview} style={{marginLeft: "25%", width: "50%"}}>
                <Icon type="arrow-up" /> Back to overview
            </Button>
        </Col>
    </Row>;
}
