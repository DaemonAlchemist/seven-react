import {switchOn} from 'atp-pointfree';
import {ActionType} from "./Seven.types";

// Action creators

// Reducer
export const sevenReducer = (state:any = {}, action:any) => switchOn(action.type, {
    [ActionType.InitGame]: () => state,
    [ActionType.AddPlayer]: () => state,
    [ActionType.SetBid]: () => state,
    default: () => state
});

// Selectors
