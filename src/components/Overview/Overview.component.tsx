import { Button, Divider, Icon } from 'antd';
import * as React from 'react';
import { Bid } from "../Bid";
import { Col, Row } from "../Layout";
import { Score } from "../Score";
import { OverviewComponentProps } from './Overview.types';

const cellWidth = (players:any[]) => ({
    textAlign: "center",
    width: `${100.0 / (players.length + 2)}%`
} as React.CSSProperties);

export const OverviewComponent = (props:OverviewComponentProps) =>
    <Row>
        <Col>
            <div className="ant-table ant-table-default">
                <div className="ant-table-content">
                    <div className="ant-table-body">
                        <table>
                            <thead className="ant-table-thead">
                                <tr>
                                    <th style={cellWidth(props.players)}/>
                                    {props.players.map(player => 
                                        <th key={player.id} className="overview-player-header" style={cellWidth(props.players)}>
                                            <div className="overview-player-label">{player.name}</div>
                                        </th>
                                    )}
                                    <th style={cellWidth(props.players)}/>
                                </tr>
                            </thead>
                            <tbody className="ant-table-body">
                                {props.rounds.map(round =>
                                    <tr key={round.id} className="ant-table-row">
                                        <td style={cellWidth(props.players)}>
                                            <b>{round.handCount}</b>
                                        </td>
                                        {props.players.map(player =>
                                            <td key={player.id} style={cellWidth(props.players)}>
                                                <Bid bid={props.getBid(round.id, player.id)} />
                                            </td>
                                        )}
                                        <td style={cellWidth(props.players)}>
                                            <Icon
                                                onClick={props.startRound(round.id)}
                                                theme="twoTone"
                                                type={round.complete ? "check-circle" : "right-circle"}
                                                twoToneColor={round.complete ? "#00aa00" : undefined}
                                            />
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                            <tfoot className="ant-table-tfoot">
                                <tr>
                                    <th style={cellWidth(props.players)}/>
                                        {props.players.map(player => 
                                            <th key={player.id} className="overview-player-footer" style={cellWidth(props.players)}>
                                                <Score playerId={player.id} />
                                            </th>
                                        )}
                                    <th style={cellWidth(props.players)}/>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
            </div>
            <Divider />
            <Button onClick={props.newGame} style={{display: "block", width: "50%", margin: "auto"}}>
                <Icon type="reload" /> New game
            </Button>
        </Col>
    </Row>;
