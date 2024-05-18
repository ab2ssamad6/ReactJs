import * as actionTypes from './actionTypes';

export const increment = () => {
    return {
        type: actionTypes.INCREMENT
    };
}

export const decrement = () => {
    return {
        type: actionTypes.DECREMENT
    };
}

export const add = (payload) => {
    return {
        type: actionTypes.ADD,
        val: payload
    };
}

export const substract = (payload) => {
    return {
        type: actionTypes.SUBTRACT,
        val: payload
    };
}