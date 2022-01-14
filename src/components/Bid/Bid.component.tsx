import { CloseOutlined } from '@ant-design/icons';
import React from 'react';
import {BidProps} from "./Bid.d";
import './Bid.scss';

export const BidComponent = (props:BidProps) => !!props.bid && typeof props.bid.bid !== 'undefined' && props.bid.bid >= 0
? (props.bid.won
    ? <span style={{color: "#00aa00"}}><b>{props.bid.bid + 10}</b></span>
    : <span style={{color: "#aa0000"}}><CloseOutlined /></span>
)
: <></>;
