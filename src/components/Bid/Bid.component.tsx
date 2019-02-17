import {Icon} from 'antd';
import * as React from 'react';
import { IBidComponentProps } from './Bid.types';

export const Bid = (props:IBidComponentProps) => typeof props.bid.bid !== 'undefined' && props.bid.bid >= 0
    ? (props.bid.won
        ? <span style={{color: "#00ff00"}}>{props.bid.bid + 10}</span>
        : <span style={{color: "#ff0000"}}><Icon type="close" /></span>
    )
    : <></>;