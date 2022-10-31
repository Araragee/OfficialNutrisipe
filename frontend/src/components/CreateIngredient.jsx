import React, { useState, useEffect } from 'react'

const CreateIngredient = () => {

    const [ingAdminName, setIngAdminName] = useState('');
    const [baseSizeMetric, setBaseSizeMetric] = useState('');
    const [calories, setCalories] = useState('');
    const [totalFat, setTotalFat] = useState('');
    const [saturatedFat, setSaturatedFat] = useState('');
    const [cholesterol, setCholesterol] = useState('');
    const [sodium, setSodium] = useState('');
    const [totalCarbohydrates, setTotalCarbohydrates] = useState('');
    const [dietaryFiber, setDietaryFiber] = useState('');
    const [sugar, setSugar] = useState('');
    const [protein, setProtein] = useState('');
    const [vitaminA, setVitaminA] = useState('');
    const [vitaminC, setVitaminC] = useState('');
    const [calcium, setCalcium] = useState('');
    const [iron, setIron] = useState('');
    const [ModalOpen, setModalOpen] = useState(false);



    const [baseSizeList, setBaseSizeList] = useState([]);

    // useEffect(() => {
    //     console.log(baseSizeList);
    // }, [baseSizeList]);

    const ModalHandlerOpen = () => {
        setModalOpen(true);
    }
    const ModalHandlerClose = () => {
        setModalOpen(false);
    }

    const UploadIngredient = () => {
        console.log(baseSizeList)
    }


    const handleAddBaseSize = () => {
        const baseSizeItem = {
            baseSizeMetric,
            calories,
            totalFat,
            saturatedFat,
            cholesterol,
            sodium,
            totalCarbohydrates,
            dietaryFiber,
            sugar,
            protein,
            vitaminA,
            vitaminC,
            calcium,
            iron
        }

        const newArray = [...baseSizeList, baseSizeItem];
        setBaseSizeList(newArray);
        setModalOpen(false);
        setBaseSizeMetric('');
        setCalories('');
        setTotalFat('');
        setSaturatedFat('');
        setCholesterol('');
        setSodium('');
        setTotalCarbohydrates('');
        setDietaryFiber('');
        setSugar('');
        setProtein('');
        setVitaminA('');
        setVitaminC('');
        setCalcium('');
        setIron('');
    }



    return (

        <div className="flex flex-col justify-center items-center mt-5 lg:h-4/5">

            <div className="flex justify-end items-end mt-5">
                <button
                    type="button"
                    onClick={UploadIngredient}
                    class="mb-3 transition ease-in-out delay-150 w-36 border border-blue-300 rounded-full bg-gray-200  text-gray-400 hover:text-white hover:-translate-y-1 hover:scale-110 duration-300 hover:bg-nGreen"
                >
                    Upload ingredient
                </button>
            </div>
            <div className="flex flex-1 flex-col gap-6 lg:pl-5 mt-2 w-full">
                <input
                    type="text"
                    value={ingAdminName}
                    onChange={(e) => setIngAdminName(e.target.value)}
                    placeholder="Ingredient Name"
                    className="outline-none text-xl sm:text-3l font-bold border-b-2 border-gray-200 p-2"
                />
            </div>

            
            {ModalOpen && <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex flex-col 
            justify-center items-center  ">
                
                <div className="fixed bg-gray-100 p-2 rounded-md h-96 w-96 overflow-scroll ">
                <div class="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600 w-full">
                <h3 class="ml-2 text-xl font-semibold  items-center text-nGreen">
                    Add Ingredientsss
                </h3>
                
                <button
               class="ml-2 mt-2 mx-1 px-1 text-xs font-bold text-center transition ease-in-out delay-150 w-4 h-4 border border-gray-400 rounded bg-gray-200  text-gray-400 hover:text-white hover:-translate-y-1 hover:scale-110 hover:bg-nRed duration-300"
               onClick={ModalHandlerClose}
            >
                X
            </button>
                </div>
                    
                <div className="flex flex-1 flex-col pl-5 pr-5 mt-2 ">
                    <input
                        type="text"
                        value={baseSizeMetric}
                        onChange={(e) => setBaseSizeMetric(e.target.value)}
                        placeholder="Base Size Metric"
                        className="outline-none text-xl sm:text-3l font-bold border-b-2 border-gray-200 p-2 w-full"
                    />
                </div>
                <div className="flex flex-1 flex-col  pl-5 pr-5 mt-2 ">
                    <input
                        type="text"
                        value={calories}
                        onChange={(e) => setCalories(e.target.value)}
                        placeholder="calories"
                        className="outline-none text-xl sm:text-3l font-bold border-b-2 border-gray-200 p-2 w-full "
                    />
                </div>
                <div className="flex flex-1 flex-col  pl-5 pr-5   mt-2 ">
                    <input
                        type="text"
                        value={totalFat}
                        onChange={(e) => setTotalFat(e.target.value)}
                        placeholder="totalFat"
                        className="outline-none text-xl sm:text-3l font-bold border-b-2 border-gray-200 p-2 w-full "
                    />
                </div>
                <div className="flex flex-1 flex-col  pl-5 pr-5 mt-2 ">
                    <input
                        type="text"
                        value={saturatedFat}
                        onChange={(e) => setSaturatedFat(e.target.value)}
                        placeholder="saturatedFat"
                        className="outline-none text-xl sm:text-3l font-bold border-b-2 border-gray-200 p-2 w-full "
                    />
                </div>
                <div className="flex flex-1 flex-col pl-5 pr-5  mt-2 ">
                    <input
                        type="text"
                        value={cholesterol}
                        onChange={(e) => setCholesterol(e.target.value)}
                        placeholder="cholesterol"
                        className="outline-none text-xl sm:text-3l font-bold border-b-2 border-gray-200 p-2 w-full"
                    />
                </div>
                <div className="flex flex-1 flex-col  pl-5 pr-5  mt-2 ">
                    <input
                        type="text"
                        value={sodium}
                        onChange={(e) => setSodium(e.target.value)}
                        placeholder="sodium"
                        className="outline-none text-xl sm:text-3l font-bold border-b-2 border-gray-200 p-2 w-full"
                    />
                </div>
                <div className="flex flex-1 flex-col  pl-5 pr-5 mt-2 ">
                    <input
                        type="text"
                        value={totalCarbohydrates}
                        onChange={(e) => setTotalCarbohydrates(e.target.value)}
                        placeholder="total Carbohydrates"
                        className="outline-none text-xl sm:text-3l font-bold border-b-2 border-gray-200 p-2 w-full"
                    />
                </div>
                <div className="flex flex-1 flex-col  pl-5 pr-5 mt-2 " >
                    <input
                        type="text"
                        value={dietaryFiber}
                        onChange={(e) => setDietaryFiber(e.target.value)}
                        placeholder="dietaryFiber"
                        className="outline-none text-xl sm:text-3l font-bold border-b-2 border-gray-200 p-2 w-full"
                    />
                </div>
                <div className="flex flex-1 flex-col  pl-5 pr-5 mt-2 ">
                    <input
                        type="text"
                        value={sugar}
                        onChange={(e) => setSugar(e.target.value)}
                        placeholder="sugar"
                        className="outline-none text-xl sm:text-3l font-bold border-b-2 border-gray-200 p-2 w-full"
                    />
                </div>
                <div className="flex flex-1 flex-col  pl-5 pr-5  mt-2 ">
                    <input
                        type="text"
                        value={protein}
                        onChange={(e) => setProtein(e.target.value)}
                        placeholder="protein"
                        className="outline-none text-xl sm:text-3l font-bold border-b-2 border-gray-200 p-2  w-full"
                    />
                </div>
                <div className="flex flex-1 flex-col  pl-5 pr-5 mt-2 ">
                    <input
                        type="text"
                        value={vitaminA}
                        onChange={(e) => setVitaminA(e.target.value)}
                        placeholder="vitaminA"
                        className="outline-none text-xl sm:text-3l font-bold border-b-2 border-gray-200 p-2 w-full"
                    />
                </div>
                <div className="flex flex-1 flex-col  pl-5 pr-5 mt-2 ">
                    <input
                        type="text"
                        value={vitaminC}
                        onChange={(e) => setVitaminC(e.target.value)}
                        placeholder="vitaminC"
                        className="outline-none text-xl sm:text-3l font-bold border-b-2 border-gray-200 p-2  w-full"
                    />
                </div>
                <div className="flex flex-1 flex-col pl-5 pr-5  mt-2 ">
                    <input
                        type="text"
                        value={calcium}
                        onChange={(e) => setCalcium(e.target.value)}
                        placeholder="calcium"
                        className="outline-none text-xl sm:text-3l font-bold border-b-2 border-gray-200 p-2 w-full"
                    />
                </div>
                <div className="flex flex-1 flex-col  pl-5 pr-5 mt-2 ">
                    <input
                        type="text"
                        value={iron}
                        onChange={(e) => setIron(e.target.value)}
                        placeholder="iron"
                        className="outline-none text-xl sm:text-3l font-bold border-b-2 border-gray-200 p-2 w-full"
                    />
                </div>
               
                <div class='mt-3'>
                <button
                class="ml-5 transition ease-in-out delay-150 w-24 border border-blue-300 rounded-full bg-gray-200  text-gray-400 hover:text-white hover:-translate-y-1 hover:scale-110 hover:bg-nGreen duration-300"
                     onClick={handleAddBaseSize}
            >
                CONFIRM
            </button>
        
            <button
               class="ml-2 transition ease-in-out delay-150 w-24 border border-blue-300 rounded-full bg-gray-200  text-gray-400 hover:text-white hover:-translate-y-1 hover:scale-110 hover:bg-nRed duration-300"
               onClick={ModalHandlerClose}
            >
                CANCEL
            </button>
            
            </div>
            </div>
            </div>

            }


            {!ModalOpen && <button
                className="mt-5 text-nGreen w-24 h-7.5 float-left py-1 px-1  text-xs font-bold text-center text-white bg-gray-50 rounded-full border border-blue-300"
                onClick={ModalHandlerOpen}
            >
                ADD
            </button>}


        </div>


        // <div>create ingredient</div>
    );
}

export default CreateIngredient