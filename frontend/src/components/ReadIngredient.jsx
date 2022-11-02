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
                    <h1>{item?.IngAdminName}</h1>
                    <h1>{item?.baseSize}</h1>
                    {item?.baseSize.map((c, i) => (
                        <div key={i}>
                            <img src={c.baseSizeNum} />
                            <h3>{c.calcium}</h3>
                            <h3>{c.calories}</h3>
                            <h3>{c.cholesterol}</h3>
                            <h3>{c.dietaryFiber}</h3>
                            <h3>{c.iron}</h3>
                            <h3>{c.protein}</h3>
                            <h3>{c.saturatedfat}</h3>
                            <h3>{c.sodium}</h3>
                            <h3>{c.sugar}</h3>
                            <h3>{c.totalfat}</h3>
                            <h3>{c.transfat}</h3>
                            <h3>{c.vitaminA}</h3>
                            <h3>{c._key}</h3>
                            <h3>{c._type}</h3>

                            <hr />
                        </div>
                    ))}
                </div>
            ))}



        </div>
    )
}

export default ReadIngredient
