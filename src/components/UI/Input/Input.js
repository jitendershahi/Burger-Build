import React from 'react'

import classes from './Input.css'

const Input = (props) => {
    let inputType = null
    console.log(props)

    switch(props.elementType) {
        case 'input':
        inputType = <input className={classes.InputElement} {...props.elementConfig} value={props.value} />
        break;
        case 'text-area':
        inputType = <textarea className={classes.InputElement} {...props.elementConfig} value={props.value}></textarea>
        break;
        case ( 'select' ):
        inputType = (
            <select
                className={classes.InputElement}
                value={props.value}
                >
                {props.elementConfig.options.map(option => (
                    <option key={option.value} value={option.value}>
                        {option.displayValue}
                    </option>
                ))}
            </select>
        );
        break;

        // case 'select':
        // inputType = 
        // <select
        //  className={classes.InputElement} 
        //  value={props.value}>
        //  {props.elementConfig.options.map(el => {
        //     return <option key={el.value} value={el.value}>{el.displayValue}</option>
        //  })}</select>
        
        // break;
        default:    
        inputType = <input className={classes.InputElement} {...props.elementConfig} value={props.value}/>
    }
    return (
        <div className={classes.Input}>
        <label className={classes.Label}>{props.label}</label>
            {inputType}
        </div>
    )
}

export default Input;