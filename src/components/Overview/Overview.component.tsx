import {Button, Icon} from 'antd';
import * as React from 'react';
import {Bid} from "../Bid";
import {Col} from "../Layout";
import { OverviewComponentProps } from './Overview.types';

const cellWidth = (players:any[]) => ({
    textAlign: "center",
    width: `${100.0 / (players.length + 2)}%`
} as React.CSSProperties);

export const OverviewComponent = (props:OverviewComponentProps) =>
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
                                        <Button onClick={props.startRound(round.id)}>
                                            <Icon type={round.complete ? "check" : "arrow-right"} />
                                        </Button>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                        <tfoot className="ant-table-tfoot">
                            <tr>
                                <th style={cellWidth(props.players)}/>
                                    {props.players.map(player => 
                                        <th key={player.id} className="overview-player-footer" style={cellWidth(props.players)}>
                                            0
                                        </th>
                                    )}
                                <th style={cellWidth(props.players)}/>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </div>
    </Col>;
