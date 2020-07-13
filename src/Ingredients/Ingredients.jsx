import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Loader } from '../ui/Loader'
import { Button} from '../ui/Button'

export function Ingredients ({ingredients, onDelete}) {
    return <div>
        <h1>Ingrédients</h1>
        {ingredients === null ? <Loader /> : <IngredientsList ingredients={ingredients} onDelete={onDelete}/>}
        {JSON.stringify(ingredients)}
    </div>
}

function IngredientsList({ ingredients, onDelete }) {
    return <ul>
        {ingredients.map(ingredient => <Ingredient key={ingredient.id} ingredient={ingredient} onDelete={onDelete}></Ingredient>)}
    </ul>
}

function Ingredient({ ingredient, onDelete }) {
    const [isLoading, setLoading] = useState(false)

    const handleDelete = async (e) => {
        e.preventDefault()
        setLoading(true)
        await onDelete(ingredient)
    }
    return <li>
        {ingredient.title}
        <Button type='danger' onClick={handleDelete} loading={isLoading}>Supprimer</Button>
    </li>
}

Ingredients.propTypes = {
    ingredients: PropTypes.array
}
