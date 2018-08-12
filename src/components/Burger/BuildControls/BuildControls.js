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
        {controls.map((el) => {
           return <BuildControl 
           label={el.label}
            key={el.label} 
            added={() => props.addingredient(el.type)}/> 
        })}
        </div>
    )
}

export default buildcontrols;