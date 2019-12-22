import {Icon} from 'antd';
import * as React from 'react';
import { IBidComponentProps } from './Bid.types';

export const Bid = (props:IBidComponentProps) => typeof props.bid.bid !== 'undefined' && props.bid.bid >= 0
    ? (props.bid.won
        ? <span style={{color: "#00aa00"}}><b>{props.bid.bid + 10}</b></span>
        : <span style={{color: "#aa0000"}}><Icon type="close" /></span>
    )
    : <></>;