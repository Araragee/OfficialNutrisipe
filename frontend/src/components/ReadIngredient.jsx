import React, { useState, useEffect } from 'react'
import { allIngredientsQuery, searchIngredientQuery } from '../utils/data';
import { client } from '../client';


const ReadIngredient = () => {
    const [ingredientList, setIngredientList] = useState()
    const [searchIngredientTerm, setSearchIngredientTerm] = useState('')
    const ingredientFetchHandler = () => {
        client.fetch(allIngredientsQuery).then((data) => {
            setIngredientList(data);
        });
    }



    //INGREDIENT LIST TESTER
    // useEffect(() => {
    //     console.log(ingredientList);
    // }, [ingredientList])



    //SEARCH BAR QUERY GETTER
    useEffect(() => {
        if (searchIngredientTerm !== '') {

          const query = searchIngredientQuery(searchIngredientTerm.toLowerCase());
          client.fetch(query).then((data) => {
            setIngredientList(data);
            console.log(ingredientList);

            
          });
        } 
        else {
          client.fetch(allIngredientsQuery).then((data) => {
            setIngredientList(data);

            console.log(ingredientList);
          });
        }
      }, [searchIngredientTerm]);





    return (
        //SEARCH BAR
        <div>
            <input
                type="text"
                onChange={(e) => setSearchIngredientTerm(e.target.value)}
                placeholder="Search INGREDIENT"
                value={searchIngredientTerm}
                className="p-2 w-full bg-white outline-none"
            />

            {/* DISPLAY INGREDIENTS */}
            {ingredientList?.map((item, index) => (
                <div key={index}>
                    <h1>IngAdminName: {item?.ingAdminName}</h1>
                    {item?.baseSize?.map((c) => (
                        <div key={c?._key}>
                            <h3>baseSizeNum: {c.baseSizeNum}</h3>
                            <h3>calcium: {c.calcium}</h3>
                            <h3>calories: {c.calories}</h3>
                            <h3>cholesterol: {c.cholesterol}</h3>
                            <h3>dietaryFiber: {c.dietaryFiber}</h3>
                            <h3>iron: {c.iron}</h3>
                            <h3>protein: {c.protein}</h3>
                            <h3>saturatedfat: {c.saturatedfat}</h3>
                            <h3>sodium: {c.sodium}</h3>
                            <h3>sugar: {c.sugar}</h3>
                            <h3>totalfat: {c.totalfat}</h3>
                            <h3>transfat: {c.transfat}</h3>
                            <h3>vitaminA: {c.vitaminA}</h3>
                            <hr />
                        </div>
                    ))}
                </div>
            ))}

        
        </div>
    )
}

export default ReadIngredient;
