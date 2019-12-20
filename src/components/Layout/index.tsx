import {Col as AntCol, Divider as AntDivider, Row as AntRow} from 'antd';
import * as React from 'react';

export const Row = (props:any) =>
    <AntRow style={{paddingLeft: "8px", paddingRight: "8px"}}>
        {React.Children.map(props.children, (a:any) => a)}
    </AntRow>;

export const Col = ({children, ...props}:any) =>
    <AntCol {...props} style={{marginTop: "8px", marginBottom: "8px"}}>
        {React.Children.map(children, (a:any) => a)}
    </AntCol>;
    
export const Divider = ({children, ...props}:any) =>
    <AntDivider {...props} style={{margin: "0px"}}>
        {React.Children.map(children, (a:any) => a)}
    </AntDivider>;
    
