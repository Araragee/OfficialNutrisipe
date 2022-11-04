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
                className="outline-none text-xl sm:text-3l font-bold border-b-2 border-gray-200 p-2"
            />

            {/* DISPLAY INGREDIENTS */}
            <div className="flex flex-col">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="py-2 inline-block  sm:px-6 lg:px-8">
                        <div className="overflow-hidden">
                            <table className=' text-center border border-slate-300 border-fixed'>

                                {ingredientList?.map((item, index) => (
                                    <div key={index}>
                                        <thead className="border-b ">
                                            <tr className="bg-white border-b ">

                                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 w-full ">{item?.ingAdminName}</th>
                                                <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4">Base Size </th>
                                                <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4">Calories</th>
                                                <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4">TotalFat</th>
                                                <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4">Saturated Fat</th>
                                                <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4">Trans Fat</th>
                                                <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4">Cholesterol</th>
                                                <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4">Sodium</th>
                                                <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4">Total Carb</th>
                                                <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4">Dietary Fiber</th>
                                                <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4">Sugar</th>
                                                <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4">Protein</th>
                                                <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4">Vitamin A</th>
                                                <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4">Vitamin C</th>
                                                <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4">Calcium</th>
                                                <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4">Iron</th>
                                            </tr>
                                        </thead>
                                        <tbody className="border-b">
                                        {item?.baseSize?.map((c) => (
                                            <tr key={c?._key}>

                                            

                                                
                                                    
                                                    
                                                    <td  className=" text-sm font-medium text-gray-900 px-6 py-4"></td>
                                                        <td  className="text-sm font-medium text-gray-900 px-6 py-4">{c.baseSizeNum}</td>
                                                        <td  className="ext-sm font-medium text-gray-900 px-6 py-4">{c.calories}</td>
                                                        <td  className=" text-sm font-medium text-gray-900 px-6 py-4">{c.totalfat}</td>
                                                        <td  className=" text-sm font-medium text-gray-900 px-6 py-4">{c.saturatedfat}</td>
                                                        <td  className=" text-sm font-medium text-gray-900 px-6 py-4">{c.transfat}</td>
                                                        <td  className=" text-sm font-medium text-gray-900 px-6 py-4">{c.cholesterol}</td>
                                                        <td  className=" text-sm font-medium text-gray-900 px-6 py-4">{c.sodium}</td>
                                                        <td  className=" text-sm font-medium text-gray-900 px-6 py-4">{c.totalcarb}</td>
                                                        <td className=" text-sm font-medium text-gray-900 px-6 py-4">{c.dietaryFiber}</td>
                                                        <td className=" text-sm font-medium text-gray-900 px-6 py-4">{c.sugar}</td>
                                                        <td  className=" text-sm font-medium text-gray-900 px-6 py-4" >{c.protein}</td>
                                                        <td  className=" text-sm font-medium text-gray-900 px-6 py-4" >{c.vitaminA}</td>
                                                        <td className=" text-sm font-medium text-gray-900 px-6 py-4" >{c.vitaminC}</td>
                                                        <td  className=" text-sm font-medium text-gray-900 px-6 py-4" >{c.calcium}</td>
                                                        <td  className=" text-sm font-medium text-gray-900 px-6 py-4" >{c.iron}</td>
                                                    </tr>
                                               
                                               


                                
                                        )
                                        )} </tbody>
                                    </div>))}


                            </table>


                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default ReadIngredient;
