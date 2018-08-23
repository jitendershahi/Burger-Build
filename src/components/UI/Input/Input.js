import React from 'react'

import classes from './Input.css'

const Input = (props) => {
    let inputType = null

    let inputClass = [classes.InputElement]

    if(props.inValid && props.shouldValidate && props.touched){
        inputClass.push(classes.Invalid)
    }

    switch(props.elementType) {
        case 'input':
        inputType = <input onChange={props.clicked} className={inputClass.join(' ')} {...props.elementConfig} value={props.value} />
        break;
        case 'text-area':
        inputType = <textarea onChange={props.clicked} className={inputClass.join(' ')} {...props.elementConfig} value={props.value}></textarea>
        break;
        case ( 'select' ):
        inputType = (
            <select
                className={inputClass.join(' ')}
                value={props.value}
                onChange={props.clicked}
                >
                {props.elementConfig.options.map(option => (
                    <option key={option.value} value={option.value} >
                        {option.displayValue}
                    </option>
                ))}
            </select>
        );
        break;
        default:    
        inputType = <input className={inputClass.join(' ')} {...props.elementConfig} value={props.value} onChange={props.clicked}/>
    }
    return (
        <div className={classes.Input}>
        <label className={classes.Label}>{props.label}</label>
            {inputType}
        </div>
    )
}

export default Input;