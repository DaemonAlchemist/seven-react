import {Col as AntCol, Divider as AntDivider, Row as AntRow} from 'antd';
import * as React from 'react';

export const Row = (props:any) =>
    <AntRow style={{}}>{React.Children.map(props.children, (a:any) => a)}</AntRow>;

export const Col = (props:any) =>
    <AntCol style={{margin: "8px"}}>
        {React.Children.map(props.children, (a:any) => a)}
    </AntCol>;
    
export const Divider = (props:any) =>
    <AntDivider style={{margin: "0px"}}>
        {React.Children.map(props.children, (a:any) => a)}
    </AntDivider>;
    
