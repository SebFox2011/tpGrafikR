import React, { useState } from 'react'
import { Ingredients } from '../Ingredients/Ingredients'

export function Site() {

    const [page, setPage] = useState('ingredients')
    
    let content = null
    if (page === 'ingredients')
        content = <Ingredients/>

    return <> 
        <NavBar currentPage={page} onClick={setPage}/>
        {content}
        </>
}

function NavBar({ currentPage, onClick }) {

    const navClass = function (page) {
        let className = 'nav-item'
        if (page === currentPage) {
            className = ' active'
        }
        return className
    }

    return <nav className='navbar navbar-expand-sm navbar-dark bg-primary'>
        <a href="#" className="navbar-brand">Recettes</a>
        <ul className="navbar-nav mr-auto">
            <li className={navClass('recipes')}>
                <a href="#recipes" className="nav-link" onClick={()=> onClick('recipes')}>Recettes</a>
            </li>
            <li className={navClass('ingredients')}>
                <a href="#ingredients" className="nav-link" onClick={() => onClick('ingredients')}>Ingrédients</a>
            </li>
        </ul>
    </nav>
}