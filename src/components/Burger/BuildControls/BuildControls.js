import React from 'react'

import classes from './BuildControls.css'
import BuildControl from './BuildControl/BuildControl'

const controls = [
    {label:'Salad', type:'salad'},
    {label:'Bacon', type:'bacon'},
    {label:'Cheese', type:'cheese'},
    {label:'Meat', type:'meat'},
]

const buildcontrols = (props) => {
    return (
        <div className={classes.BuildControls}>
        <p>Current Price:<strong>{props.price.toFixed(2)}</strong></p>
        {controls.map((el) => {
           return <BuildControl 
           label={el.label}
            key={el.label} 
            added={() => props.addingredient(el.type)}
            remove={() => props.removeingredient(el.type)}
            disable={props.disable[el.type]}/> 
        })}
        </div>
    )
}

export default buildcontrols;