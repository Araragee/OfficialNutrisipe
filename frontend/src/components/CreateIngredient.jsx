import React, { useState } from 'react'

const CreateIngredient = () => {

    const [ingAdminName, setIngAdminName] = useState('');
    const [baseSizeNum, setBaseSizeNum] = useState();
    const [calories, setCalories] = useState();
    const [totalFat, setTotalFat] = useState();
    const [saturatedFat, setSaturatedFat] = useState();
    const [cholesterol, setCholesterol] = useState();
    const [sodium, setSodium] = useState();
    const [totalCarbohydrates, setotalCarbohydrates] = useState();
    const [dietaryFiber, setDietaryFiber] = useState();
    const [sugar, setSugar] = useState();
    const [protein, setProtein] = useState();
    const [vitaminA, setVitaminA] = useState();
    const [vitaminC, setVitaminC] = useState();
    const [calcium, setCalcium] = useState();
    const [iron, setIron] = useState();


    return (

        // <div className="flex flex-1 flex-col gap-6 lg:pl-5 mt-2 w-full">
        //     <input
        //         type="text"
        //         value={title}
        //         onChange={(e) => setTitle(e.target.value)}
        //         placeholder="Give your recipe a title"
        //         className="outline-none text-xl sm:text-3l font-bold border-b-2 border-gray-200 p-2"
        //     />
        // </div>

        <div>create ingredient</div>
    );
}

export default CreateIngredient