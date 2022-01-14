import { CheckCircleTwoTone, ReloadOutlined, RightCircleTwoTone } from '@ant-design/icons';
import { Button, Col, Divider, Popconfirm, Row } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Bid } from '../Bid';
import { Score } from '../Score';
import {OverviewProps} from "./Overview.d";
import './Overview.scss';

export const OverviewComponent = (props:OverviewProps) => {
    const cellWidth = {
        textAlign: "center",
        width: `${100.0 / (props.players.list.length + 2)}%`
    } as React.CSSProperties;
    
    const navigate = useNavigate();
    const startRound = (roundId:number) => () => {
        navigate(`/set-bids/${roundId}`);
    }

    const newGame = () => {
        navigate("/");
    }

    return <Row>
        <Col>
            <div className="ant-table ant-table-default">
                <div className="ant-table-content">
                    <div className="ant-table-body">
                        <table className="overview">
                            <thead className="ant-table-thead">
                                <tr>
                                    <th style={cellWidth}/>
                                    {props.players.list.map(player => 
                                        <th key={player.id} className="overview-player-header" style={cellWidth}>
                                            <div className="overview-player-label">{player.name}</div>
                                        </th>
                                    )}
                                    <th style={cellWidth}/>
                                </tr>
                            </thead>
                            <tbody className="ant-table-body">
                                {props.rounds.list.map(round =>
                                    <tr key={round.id} className="ant-table-row">
                                        <td style={cellWidth}>
                                            <b>{round.handCount}</b>
                                        </td>
                                        {props.players.list.map(player =>
                                            <td key={player.id} style={cellWidth}>
                                                <Bid bid={props.bids.get.one(round.id, player.id)} />
                                            </td>
                                        )}
                                        <td style={cellWidth}>
                                            {round.complete
                                                ? <CheckCircleTwoTone color='#00aa00' onClick={startRound(round.id)} />
                                                :<RightCircleTwoTone onClick={startRound(round.id)} />
                                            }
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                            <tfoot className="ant-table-tfoot">
                                <tr>
                                    <th style={cellWidth}/>
                                        {props.players.list.map(player => 
                                            <th key={player.id} className="overview-player-footer" style={cellWidth}>
                                                <Score playerId={player.id} />
                                            </th>
                                        )}
                                    <th style={cellWidth}/>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
            </div>
            <Popconfirm onConfirm={newGame} title="Are you sure you want to start a new game?" okText="Start a new game" cancelText="Continue this game">
                <Button style={{display: "block", width: "50%", margin: "auto"}}>
                    <ReloadOutlined /> New game
                </Button>
            </Popconfirm>
        </Col>
    </Row>;
}
