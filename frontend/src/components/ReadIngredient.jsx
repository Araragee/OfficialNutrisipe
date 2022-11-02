import React, { useState, useEffect } from 'react'
import { allIngredientsQuery } from '../utils/data';
import { client } from '../client';

const ReadIngredient = () => {
    const [ingredientList, setIngredientList] = useState()
    const ingredientFetchHandler = () => {
        client.fetch(allIngredientsQuery).then((data) => {
            setIngredientList(data);

            // {ingredientList.map((item, index) => (
            //     <div key={index}>
            //       <h1>{item.ingAdminName}</h1>
            //     </div>
            //   ))}

        });
    }

    useEffect(() => {
        console.log(ingredientList);
    }, [ingredientList])





    return (
        <div>ReadIngredient
            <button
                class="ml-2 mt-2 mx-1 px-1 text-xs font-bold text-center transition ease-in-out delay-150 w-4 h-4 border border-gray-400 rounded bg-gray-200  text-gray-400 hover:text-white hover:-translate-y-1 hover:scale-110 hover:bg-nRed duration-300"
                onClick={ingredientFetchHandler}
            >
                FETCHHHHHHH
            </button>

            {ingredientList?.map((item, index) => (
                <div key={index}>
                    <h1>IngAdminName: {item?.ingAdminName}</h1>
                    {item?.baseSize?.map((c, i) => (
                        <div key={i}>
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
                            <h3>_key {c._key}</h3>
                            <h3>_type {c._type}</h3>

                            <hr />
                        </div>
                    ))}
                </div>
            ))}



        </div>
    )
}

export default ReadIngredient
