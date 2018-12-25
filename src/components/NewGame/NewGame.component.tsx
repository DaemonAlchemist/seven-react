import {Button,Col, Icon, Input, Row} from 'antd';
import * as React from 'react';
import {Player} from "../../util/Seven.types";
import {NewGameComponentProps} from './NewGame.types';

export const NewGameComponent = (props:NewGameComponentProps) =>
    <Row>
        <Col xs={24}><Icon type="user" /> Add Players</Col>
        {props.players.map((player:Player) =>
            <Col key={player.id} xs={24}>
                <Input value={player.name} />
            </Col>
        )}
        <Input.Group>
            <Col xs={20}><Input /></Col>
            <Col xs={4}><Button style={{width: "100%"}}><Icon type="plus" /> Add player</Button></Col>
        </Input.Group>
    </Row>;
