import React, { useState, useEffect } from 'react'
import { client } from '../client';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import ReadIngredient from './ReadIngredient';

const CreateIngredient = ({ user }) => {

    const navigate = useNavigate();

    const [ingAdminName, setIngAdminName] = useState('');
    const [baseSizeMetric, setBaseSizeMetric] = useState('');
    const [calories, setCalories] = useState('');
    const [totalFat, setTotalFat] = useState('');
    const [saturatedFat, setSaturatedFat] = useState('');
    const [transFat, settransFat] = useState('');
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
    const [uploadSuccessAlert, setuploadSuccessAlert] = useState(false)








    const [baseSizeList, setBaseSizeList] = useState([]);


    const ModalHandlerOpen = () => {
        setModalOpen(true);
    }
    const ModalHandlerClose = () => {
        setModalOpen(false);
    }




    const deleteBaseSizeHandler = (i) => {
        let newDataArr = [...baseSizeList]
        newDataArr.splice(i, 1)
        setBaseSizeList(newDataArr)
    }





    // Adds Object To The BaseSizeArray AND resets states to make room for new object
    const handleAddBaseSize = () => {
        const baseSizeItem = {
            _key: uuidv4(),
            baseSizeNum: baseSizeMetric,
            calories: parseInt(calories),
            totalfat: parseInt(totalFat),
            saturatedfat: parseInt(saturatedFat),
            transfat: parseInt(transFat),
            cholesterol: parseInt(cholesterol),
            sodium: parseInt(sodium),
            totalcarb: parseInt(totalCarbohydrates),
            dietaryFiber: parseInt(dietaryFiber),
            sugar: parseInt(sugar),
            protein: parseInt(protein),
            vitaminA: parseInt(vitaminA),
            vitaminC: parseInt(vitaminC),
            calcium: parseInt(calcium),
            iron: parseInt(iron)
        }

        const newArray = [...baseSizeList, baseSizeItem];
        setBaseSizeList(newArray);
        setModalOpen(false);
        setBaseSizeMetric('');
        setCalories('');
        setTotalFat('');
        settransFat('');
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

        console.log(baseSizeList)


    }

    //Handler for Uploading Ingredients to Database
    const uploadIngredient = () => {

        if (ingAdminName && baseSizeList) {
            const doc = {
                _type: 'ingredientAdmin',
                _key: uuidv4(),
                ingAdminName,
                baseSize: baseSizeList
            };
            client.create(doc).then(() => {
                setBaseSizeList([]);
                setIngAdminName('');
                console.log(doc);
            });
            setuploadSuccessAlert(true)

            setTimeout(
                () => {
                    setuploadSuccessAlert(false);
                },
                8000,
            );

        }
    }
    if (user?.isAdmin) {
        return (
            //UPLOAD INGREDIENT BUTTON

            <div className="flex flex-col justify-center items-center mt-5 lg:h-4/5">


                <div className="flex flex-1 flex-col gap-6 lg:pl-5 mt-2 w-full">
                    <input
                        type="text"
                        value={ingAdminName}
                        onChange={(e) => setIngAdminName(e.target.value)}
                        placeholder="Ingredient Name"
                        className="outline-none text-xl sm:text-3l font-bold border-b-2 border-gray-200 p-2"
                    />
                </div>

                {/* TABLE FOR BaseArrayList */}

                <div className="flex flex-col">
                    <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="py-2 inline-block  sm:px-6 lg:px-8">
                            <div className="overflow-hidden">
                                <table className='min-w-full text-center'>
                                    <thead className="border-b">
                                        {/* <tbody> */}
                                        <tr className="bg-white border-b">
                                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4">Base Size </th>
                                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4">Calories</th>
                                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4">Total Fat</th>
                                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4">Saturated Fat </th>
                                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4">Cholesterol</th>
                                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4">Total Carb</th>
                                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4">Dietary Fiber </th>
                                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4">Sugar</th>
                                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4">Protein</th>
                                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4">Vitamin A</th>
                                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4">Vitamin C</th>
                                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4">Calcium</th>
                                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4">Iron</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {baseSizeList.length < 1 ?
                                            <tr>
                                                <td colSpan={2.5}>No Base Size Data entered Yet</td>
                                            </tr> :

                                            baseSizeList.map((info, i) => {
                                                return (
                                                    <tr key={i} className="bg-white border-b">
                                                        <td>{info.baseSizeNum}</td>
                                                        <td>{info.calories}</td>
                                                        <td>{info.totalfat}</td>
                                                        <td>{info.saturatedfat}</td>
                                                        <td>{info.cholesterol}</td>
                                                        <td>{info.totalcarb}</td>
                                                        <td>{info.dietaryFiber}</td>
                                                        <td>{info.sugar}</td>
                                                        <td>{info.protein}</td>
                                                        <td>{info.vitaminA}</td>
                                                        <td>{info.vitaminC}</td>
                                                        <td>{info.calcium}</td>
                                                        <td>{info.iron}</td>

                                                        <tr><td className='text-red-300 pl-2 '><button onClick={() => deleteBaseSizeHandler(i)}>Delete</button></td></tr>
                                                    </tr>



                                                )

                                            }

                                            )

                                        }

                                    </tbody>

                                </table>


                            </div>
                        </div>
                    </div>
                </div>


                {ModalOpen && <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex flex-col 
            justify-center items-center  ">

                    <div className="fixed bg-gray-100 p-2 rounded-md h-96 w-96 overflow-scroll ">
                        <div className="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600 w-full">
                            <h3 className="ml-2 text-xl font-semibold  items-center text-nGreen">
                                Add Ingredients
                            </h3>

                            <button
                                className="ml-2 mt-2 mx-1 px-1 text-xs font-bold text-center transition ease-in-out delay-150 w-4 h-4 border border-gray-400 rounded bg-gray-200  text-gray-400 hover:text-white hover:-translate-y-1 hover:scale-110 hover:bg-nRed duration-300"
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
                                type="number"
                                value={calories}
                                onChange={(e) => setCalories((e.target.value))}
                                placeholder="calories"
                                className="outline-none text-xl sm:text-3l font-bold border-b-2 border-gray-200 p-2 w-full "
                            />
                        </div>
                        <div className="flex flex-1 flex-col  pl-5 pr-5   mt-2 ">
                            <input
                                type="number"
                                value={totalFat}
                                onChange={(e) => setTotalFat(e.target.value)}
                                placeholder="totalFat"
                                className="outline-none text-xl sm:text-3l font-bold border-b-2 border-gray-200 p-2 w-full "
                            />
                        </div>
                        <div className="flex flex-1 flex-col  pl-5 pr-5 mt-2 ">
                            <input
                                type="number"
                                value={saturatedFat}
                                onChange={(e) => setSaturatedFat(e.target.value)}
                                placeholder="saturatedFat"
                                className="outline-none text-xl sm:text-3l font-bold border-b-2 border-gray-200 p-2 w-full "
                            />
                        </div>
                        <div className="flex flex-1 flex-col  pl-5 pr-5 mt-2 ">
                            <input
                                type="number"
                                value={transFat}
                                onChange={(e) => settransFat(e.target.value)}
                                placeholder="transFat"
                                className="outline-none text-xl sm:text-3l font-bold border-b-2 border-gray-200 p-2 w-full "
                            />
                        </div>
                        <div className="flex flex-1 flex-col pl-5 pr-5  mt-2 ">
                            <input
                                type="number"
                                value={cholesterol}
                                onChange={(e) => setCholesterol(e.target.value)}
                                placeholder="cholesterol"
                                className="outline-none text-xl sm:text-3l font-bold border-b-2 border-gray-200 p-2 w-full"
                            />
                        </div>
                        <div className="flex flex-1 flex-col  pl-5 pr-5  mt-2 ">
                            <input
                                type="number"
                                value={sodium}
                                onChange={(e) => setSodium(e.target.value)}
                                placeholder="sodium"
                                className="outline-none text-xl sm:text-3l font-bold border-b-2 border-gray-200 p-2 w-full"
                            />
                        </div>
                        <div className="flex flex-1 flex-col  pl-5 pr-5 mt-2 ">
                            <input
                                type="number"
                                value={totalCarbohydrates}
                                onChange={(e) => setTotalCarbohydrates(e.target.value)}
                                placeholder="total Carbohydrates"
                                className="outline-none text-xl sm:text-3l font-bold border-b-2 border-gray-200 p-2 w-full"
                            />
                        </div>
                        <div className="flex flex-1 flex-col  pl-5 pr-5 mt-2 " >
                            <input
                                type="number"
                                value={dietaryFiber}
                                onChange={(e) => setDietaryFiber(e.target.value)}
                                placeholder="dietaryFiber"
                                className="outline-none text-xl sm:text-3l font-bold border-b-2 border-gray-200 p-2 w-full"
                            />
                        </div>
                        <div className="flex flex-1 flex-col  pl-5 pr-5 mt-2 ">
                            <input
                                type="number"
                                value={sugar}
                                onChange={(e) => setSugar(e.target.value)}
                                placeholder="sugar"
                                className="outline-none text-xl sm:text-3l font-bold border-b-2 border-gray-200 p-2 w-full"
                            />
                        </div>
                        <div className="flex flex-1 flex-col  pl-5 pr-5  mt-2 ">
                            <input
                                type="number"
                                value={protein}
                                onChange={(e) => setProtein(e.target.value)}
                                placeholder="protein"
                                className="outline-none text-xl sm:text-3l font-bold border-b-2 border-gray-200 p-2  w-full"
                            />
                        </div>
                        <div className="flex flex-1 flex-col  pl-5 pr-5 mt-2 ">
                            <input
                                type="number"
                                value={vitaminA}
                                onChange={(e) => setVitaminA(e.target.value)}
                                placeholder="vitaminA"
                                className="outline-none text-xl sm:text-3l font-bold border-b-2 border-gray-200 p-2 w-full"
                            />
                        </div>
                        <div className="flex flex-1 flex-col  pl-5 pr-5 mt-2 ">
                            <input
                                type="number"
                                value={vitaminC}
                                onChange={(e) => setVitaminC(e.target.value)}
                                placeholder="vitaminC"
                                className="outline-none text-xl sm:text-3l font-bold border-b-2 border-gray-200 p-2  w-full"
                            />
                        </div>
                        <div className="flex flex-1 flex-col pl-5 pr-5  mt-2 ">
                            <input
                                type="number"
                                value={calcium}
                                onChange={(e) => setCalcium(e.target.value)}
                                placeholder="calcium"
                                className="outline-none text-xl sm:text-3l font-bold border-b-2 border-gray-200 p-2 w-full"
                            />
                        </div>
                        <div className="flex flex-1 flex-col  pl-5 pr-5 mt-2 ">
                            <input
                                type="number"
                                value={iron}
                                onChange={(e) => setIron(e.target.value)}
                                placeholder="iron"
                                className="outline-none text-xl sm:text-3l font-bold border-b-2 border-gray-200 p-2 w-full"
                            />
                        </div>

                        <div className='mt-3'>
                            <button
                                className="ml-5 transition ease-in-out delay-150 w-24 border border-blue-300 rounded-full bg-gray-200  text-gray-400 hover:text-white hover:-translate-y-1 hover:scale-110 hover:bg-nGreen duration-300"
                                onClick={handleAddBaseSize}
                            >
                                CONFIRM
                            </button>

                            <button
                                className="ml-2 transition ease-in-out delay-150 w-24 border border-blue-300 rounded-full bg-gray-200  text-gray-400 hover:text-white hover:-translate-y-1 hover:scale-110 hover:bg-nRed duration-300"
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
                    Add Base Size
                </button>}

                {uploadSuccessAlert && (
                    <p className="text-nGreen mr-5 text-xl transition-all duration-150 ease-in ">
                        Ingredient Successfully addedd to the database.
                    </p>
                )}


                <div className="flex justify-end items-end mt-5">
                    <button
                        type="button"
                        onClick={uploadIngredient}
                        className="mb-3 transition ease-in-out delay-150 w-36 border border-blue-300 rounded-full bg-nTeal  text-gray-700 hover:text-white font-bold hover:-translate-y-1 hover:scale-110 duration-300 hover:bg-nGreen"
                    >
                        Add To Database
                    </button>
                </div>

                <ReadIngredient />

            </div>





        );
    } else {
        return <p className="text-nGreen mr-5 text-xl transition-all duration-150 ease-in ">
            Unauthorized Access
        </p>;
    }
}
export default CreateIngredient