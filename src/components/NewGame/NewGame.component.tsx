import {Button, Icon, Input, Tag} from 'antd';
import * as React from 'react';
import {Player} from "../../util/Seven.types";
import {Col, Divider, Row} from "../Layout";
import {NewGameComponentProps} from './NewGame.types';

export const NewGameComponent = (props:NewGameComponentProps) =>
    <Row>
        <Col xs={24}><em><Icon type="usergroup-add" /> New Game</em></Col>
        <Divider />
        {props.players.map((player:Player) =>
            <Col key={player.id} xs={24}>
                {player.name}
                <Icon
                    type="close-square"
                    theme="twoTone"
                    onClick={props.removePlayer(player.id)}
                    style={{float: "right"}}
                />
                {(props.initialDealerId === player.id) &&
                    <Tag color="green" style={{float: "right"}}><Icon type="check" /> First dealer</Tag>
                }
                {(props.initialDealerId !== player.id) &&
                    <Tag onClick={props.setInitialDealer(player.id)} style={{float: "right"}}>Deal first</Tag>
                }
            </Col>
        )}
        <Col xs={24}>
            <Input
                onChange={props.onNewPlayerNameChange}
                value={props.newPlayerName}
                addonAfter={<Icon type="plus" onClick={props.addPlayer(props.newPlayerName)}/>}
            />
        </Col>
        <Col xs={24}>
            <Button onClick={props.startGame} style={{float: "right"}} disabled={props.disableStartBtn}>
                <Icon type="play-circle" /> Start game
            </Button>
        </Col>
    </Row>;
