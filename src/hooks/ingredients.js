import { useReducer } from "react";
import { apiFetch } from '../utils/api'

function reducer(state, action) {
    console.log('INGREDIENTS REDUCE', action.type, action)
    switch (action.type) {
        case 'FETCHING_INGREDIENTS':
            return { ...state, isLoading: true }
        case 'SET_INGREDIENTS':
            return { ...state, ingredients: action.payload, isLoading: false }
        case 'DELETE_INGREDIENT':
            return { ...state, ingredients: state.ingredients.filter(i => i !== action.payload) }
        case 'ADD_INGREDIENT':
            return { ...state, ingredients: [...state.ingredients, action.payload] }
        case 'UPDATE_INGREDIENT':
            return { ...state, ingredients: state.ingredients.map(i => i === action.target ? action.payload : i) }
    }
}

export function useIngredients() {
    const [state, dispatch] = useReducer(reducer, {
        ingredients: null,
        isLoading: false
    })
    return {
        ingredients: state.ingredients,
        fetchIngredients: async function () {
            if (state.isLoading || state.ingredients) {
                return null
            }
            dispatch({ type: 'FETCHING_INGREDIENTS' })
            const ingredients = await apiFetch('/ingredients')
            dispatch({ type: 'SET_INGREDIENTS', payload: ingredients })
        },
        deleteIngredient: async function (ingredient) {
            await apiFetch('/ingredients/' + ingredient.id, {
                method:'DELETE'
            })
            dispatch({ type:'DELETE_INGREDIENT', payload:ingredient})
        }
    }
}