import { CheckOutlined, CloseSquareTwoTone, PlayCircleOutlined, PlusOutlined, UsergroupAddOutlined } from '@ant-design/icons';
import { Alert, Button, Col, Divider, Input, Row, Tag } from 'antd';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IPlayer } from '../../util/types';
import { NewGameProps } from "./NewGame.d";
import './NewGame.scss';

export const NewGameComponent = (props:NewGameProps) => {
    const [newName, setNewName] = useState<string>("");
    const updateName = (e:React.ChangeEvent<HTMLInputElement>) => {
        setNewName(e.currentTarget.value);
    }

    const addPlayer = () => {
        props.players.add(newName);
        setNewName("");
    }

    const navigate = useNavigate();
    const startGame = () => {navigate("/overview");}
    const cantStartGame = props.dealer.first === -1 || props.players.list.length < 2;

    return <Row className="new-game-form">
        <Col xs={24} className="page-title"><em><UsergroupAddOutlined /> New Game</em></Col>
        <Divider />
        {props.players.list.map((player:IPlayer) =>
            <Col key={player.id} xs={24}>
                {player.name}
                <CloseSquareTwoTone style={{float: "right"}} onClick={props.players.remove(player.id)} />
                {(props.dealer.first === player.id) &&
                    <Tag color="green" style={{float: "right"}}><CheckOutlined /> First dealer</Tag>
                }
                {(props.dealer.first !== player.id) &&
                    <Tag onClick={props.dealer.set(player.id)} style={{float: "right"}}>Deal first</Tag>
                }
            </Col>
        )}
        <Col xs={24}>
            {props.players.list.length < 7 &&
                <Input
                    onChange={updateName}
                    value={newName}
                    placeholder='New player'
                    onPressEnter={addPlayer}
                    addonAfter={<PlusOutlined onClick={addPlayer}/>}
                />
            }
            {props.players.list.length === 7 &&
                <Alert type="info" message="The game is full" />
            }
        </Col>
        <Col xs={24} className="start-btn-container">
            <Button type="primary" size="large" onClick={startGame} disabled={cantStartGame}>
                <PlayCircleOutlined /> Start game
            </Button>
        </Col>
    </Row>;
}