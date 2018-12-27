import {Button, Icon} from 'antd';
import * as React from 'react';
import {Bid} from "../Bid";
import { OverviewComponentProps } from './Overview.types';

export const OverviewComponent = (props:OverviewComponentProps) =>
    <div className="ant-table ant-table-default">
        <div className="ant-table-content">
            <div className="ant-table-body">
                <table>
                    <thead className="ant-table-thead">
                        <tr>
                            <th/>
                            {props.players.map(player => 
                                <th key={player.id} style={{textAlign: "center"}}>
                                    {player.name}
                                </th>
                            )}
                            <th/>
                        </tr>
                    </thead>
                    <tbody className="ant-table-body">
                        {props.rounds.map(round =>
                            <tr key={round.id} className="ant-table-row">
                                <td style={{textAlign: "center"}}>
                                    <b>{round.handCount}</b>
                                </td>
                                {props.players.map(player =>
                                    <td key={player.id} style={{textAlign: "center"}}>
                                        <Bid bid={props.getBid(round.id, player.id)} />
                                    </td>
                                )}
                                <td>
                                    <Button onClick={props.startRound(round.id)}>
                                        <Icon type={round.complete ? "check" : "arrow-right"} />
                                    </Button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    </div>;