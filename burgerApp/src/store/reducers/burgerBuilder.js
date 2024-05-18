import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

const initilState = {
    ingredients: null,
    error: false,
    totalPrice: 4
};

const addIngredient = (state, action) => {
    const updatedIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] + 1 };
            const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
            const updatedState = {
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
                ingredients: updatedIngredients
            }
            return updateObject(state, updatedState);
};

const removeIngredient = (state, action) => {
    const updatedIng = { [action.ingredientName]: state.ingredients[action.ingredientName] - 1 };
            const updatedIngs = updateObject(state.ingredients, updatedIng);
            const updatedStt = {
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
                ingredients: updatedIngs
            }
            return updateObject(state, updatedStt);
};

const setIngredient = (state, action) => {
    return updateObject(state, {
        ingredients: action.ingredients,
        error: false,
        totalPrice: 4
    })
};

const fetchIngredientFaild = (state, action) => {
    return updateObject(state, { error: true })
};

const reducer = (state = initilState, action) => {
    switch (action.type) {
        // Before Refactoring
        /* case actionTypes.ADD_INGREDIENT:
            return {
                ...state,
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                }
            } */
        
        // After Refactoring
        case actionTypes.ADD_INGREDIENT: return addIngredient(state, action);
        case actionTypes.REMOVE_INGREDIENT: return removeIngredient(state, action);
        case actionTypes.SET_INGREDIENTS: return setIngredient(state, action);
        case actionTypes.FETCH_INGREDIENTS_FAILED: return fetchIngredientFaild(state, action);
        default: return state;
    }
}

export default reducer;