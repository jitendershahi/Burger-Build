import React from 'react'

import classes from './Button.css'

const Button = (props) => (
    <div>
        <button disabled={props.disabled} className={[classes.Button, classes[props.btnType]].join(' ')}
        onClick={props.clicked}>
        {props.children}
        </button>
    </div>
)

export default Button;