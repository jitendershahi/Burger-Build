import React from 'react';
import BurgerIngredients from './BurgerIngredients/BurgerIngredients'

import classes from './burger.css'


const burger = (props) => {
    let transformingredients = Object.keys(props.ingredients)
        .map((el) => {
            return [...Array(props.ingredients[el])]
            .map((element, i) => {
                return <BurgerIngredients type={el} key={el + i} />
            })
        })
        .reduce((pre ,el) => {
            return pre.concat(el)
        },[])

        if(transformingredients.length === 0){
          transformingredients = 'please add some ingredients'  
        }


    return (
        <div className={classes.Burger}>
            <BurgerIngredients type="bread-top" />
            {transformingredients}
            <BurgerIngredients type="bread-bottom" />
        </div>
    )
}

export default burger;