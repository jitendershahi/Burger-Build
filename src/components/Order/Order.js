import React from 'react'
import classes from './Order.css'


const Order = (props) => {
    const Ingredients = [];

    for(let key in props.ingredients){
        Ingredients.push({
            name:key,
            amount:props.ingredients[key]
        })
    }
    console.log(Ingredients)

    const style = {
        textTransform:'capitalize',
        display:'inline-block',
        margin:'0 8px',
        border:'1px solid #ccc',
        padding:'5px'

    }

    const ingredientOutput = Ingredients.map(el => {
        return <span style={style}
         key={el.name}>
         {el.name} {el.amount}
         </span>
    })

    return (
        <div className={classes.Order}>
        <p>Ingredients: {ingredientOutput} </p>
        <p>Price: <strong>USD {Number.parseFloat(props.price).toFixed(2)}</strong></p>
        </div>
    );
    
}

export default Order;