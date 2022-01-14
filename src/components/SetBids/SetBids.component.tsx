import { ArrowLeftOutlined, ArrowRightOutlined, ArrowUpOutlined, LockOutlined, UnlockOutlined } from '@ant-design/icons';
import { Button, Col, Divider, Row, Slider, Tag } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router';
import { HandCount, IPlayer } from '../../util/types';
import { GotMineButton } from '../GotMineButton';
import { GotScrewedButton } from '../GotScrewedButton';
import { IBidOptionList, SetBidsProps } from "./SetBids.d";
import './SetBids.scss';

const getOptions = (handCount:HandCount, isDealer:boolean, cantBid:number):IBidOptionList => {
    const options:IBidOptionList = {[-1]: ''};
    for(let i=0; i<=handCount + 1; i++) {
        options[i] = !isDealer || i !== cantBid
            ? `${i}`
            : {
                label: `${i}`,
                style: {color: "#ff0000"},
            };
    }
    return options;
};

export const SetBidsComponent = (props:SetBidsProps):JSX.Element => {
    const [bidsLocked, setBidsLocked] = React.useState(false);
    const lockBids = () => {setBidsLocked(true);}
    const unlockBids = () => {setBidsLocked(false);}

    const round = props.round.current;

    let players = [...props.players.list];
    while(players[players.length - 1].id !== props.dealer.current(round.id)) {
        players = players.slice(1).concat(players[0]);
    }

    const curDealer = props.dealer.current(round.id);

    const navigate = useNavigate();
    const nextRound = () => {navigate(`/set-bids/${round.id + 1}`);}
    const prevRound = () => {navigate(`/set-bids/${round.id - 1}`);}
    const backToOverview = () => {navigate('/overview');}

    return <div className="set-bids">{!!props.round && <Row>
        <Col xs={24}>
            <b>Round {round.id + 1} ({round.handCount} {round.handCount > 1 ? "hands" : "hand"})</b>
        </Col>
        <Divider />
        {players.map((player:IPlayer, index:number) => 
            <Col xs={24} key={player.id}>
                {player.name}&nbsp;
                {index === 0 && <Tag color="green">Leads</Tag>}
                {player.id === curDealer &&
                    <>
                        <Tag color="green">Dealer</Tag>
                        {props.round.dealerCantBid >= 0 && !bidsLocked &&
                            <Tag color="red">Can't bid {props.round.dealerCantBid}</Tag>
                        }
                    </>
                }
                <div style={{float: "right", display: bidsLocked ? "block" : "none"}}>
                    <GotMineButton roundId={round.id} playerId={player.id} bid={props.bids.get.one(round.id, player.id)?.bid}/>
                    <GotScrewedButton roundId={round.id} playerId={player.id} />
                </div>
                <div style={{marginBottom: bidsLocked ? "16px" : "32px"}}>
                    <Slider
                        disabled={bidsLocked}
                        min={-1}
                        max={round.handCount}
                        marks={getOptions(round.handCount, player.id === curDealer, props.round.dealerCantBid)}
                        step={1}
                        value={props.bids.get.one(round.id, player.id)?.bid}
                        onChange={props.bids.set(round.id, player.id) as (bid:number) => void}
                        style={{display: bidsLocked ? "none" : undefined}}
                    />
                </div>
                <Divider />
            </Col>
        )}
        <Col xs={6}>
            {round.id > 0 && <Button onClick={prevRound} title='Previous round'>
                <ArrowLeftOutlined />
            </Button>}
        </Col>
        <Col xs={12} className="lock-btn-container">
            {!bidsLocked && <Button onClick={lockBids}>
                <UnlockOutlined /> Lock bids
            </Button>}
            {bidsLocked && <Button onClick={unlockBids}>
                <LockOutlined /> Unlock bids
            </Button>}
        </Col>
        <Col xs={6}>
            <div style={{textAlign: "right"}}>
                {round.id < 12 && <Button disabled={!props.round.canFinish} onClick={nextRound} title='Next round'>
                    <ArrowRightOutlined />
                </Button>}
            </div>
        </Col>
        <Col xs={24} style={{textAlign: "center", marginTop: "16px"}}>
            <Button onClick={backToOverview}>
                <ArrowUpOutlined /> Back to overview
            </Button>
        </Col>
    </Row>}</div>;
}
