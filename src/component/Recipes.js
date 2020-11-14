import React  from 'react'
import'./recipes.modules.css'

const Recipes = ({title , calories , image , ingredients}) => {

    return(
        <div className="recipe">
            <h1 className="recipe-title">{title}</h1>
            <ol>
                {ingredients.map((ingredient)=>{
                 return(
                    <li>{ingredient.text}</li>
                 ) 
                })}
            </ol>
            <p>{calories}</p>
            <img className="image" src={image} alt="" />
        </div>
    )

}

export default Recipes