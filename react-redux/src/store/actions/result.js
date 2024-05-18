import * as actionTypes from './actionTypes';

export const saveResult = (res) => {
    return {
        type: actionTypes.STORE_RESULT,
        resultPayloud: res
    };
}

export const storeResult = (payload) => {
    return (dispatch, getState) => {
        setTimeout(() => {
            const oldCounter = getState().ctrReducer.counter;
            console.log(oldCounter);
            dispatch(saveResult(payload));
        }, 2000);
    }
}

export const deleteResult = (payload) => {
    return {
        type: actionTypes.DELETE_RESULT,
        resultElId: payload
    };
}