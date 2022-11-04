/* eslint-disable max-len */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/button-has-type */
/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable no-alert, no-console */
import React, { useState, useEffect } from 'react';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { MdDelete } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { ingval, metrics, searchChosenIngredientQuery } from "../utils/data"
import { client } from '../client';
import { categories, fakeDataIng } from '../utils/data';
import Spinner from './Spinner';

const CreatePin = ({ user }) => {
  const [title, setTitle] = useState('');
  const [about, setAbout] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingIngredient, setLoadingIngredient] = useState(false);
  const [fields, setFields] = useState();
  const [category, setCategory] = useState();
  const [imageAsset, setImageAsset] = useState();
  const [wrongImageType, setWrongImageType] = useState(false);
  const [procedure, setProcedure] = useState([]);
  

  const [dropdownClick, setDropdownClick] = useState(true)

  //Ingredient Label For Users
  const [chosenIngredient, setChosenIngredient] = useState('');
  //Full Ingredient Object storage after search -- TEMPORARY STORAGE
  const [chosenIngredientObject, setchosenIngredientObject] = useState();
  const [ingredientDropDown, setIngredientDropDown] = useState([])
  const [chosenMetric, setChosenMetric] = useState();
  const [amount, setAmount] = useState('');
  const [ingredientList, setIngredientList] = useState([]);
  const [finalRecipeObject, setFinalRecipeObject] = useState([]);
  const [nutrientTable, setNutrientTable] = useState([]);

  

  //INGREDIENT SEARCH == SHOW DROPDOWN
  useEffect(() => {
    if (chosenIngredient !== "") {
      setLoadingIngredient(true)
      const query = searchChosenIngredientQuery(chosenIngredient.toLowerCase());
      client.fetch(query).then((data) => {
        if (dropdownClick) {
          setIngredientDropDown(data);
          setChosenMetric('');
          setLoadingIngredient(false);
          
        }
      });
    } else {
      setIngredientDropDown([]);
      setChosenMetric('');
      setLoadingIngredient(false);
    }

  }, [chosenIngredient,]);

  // CHANGE INGREDIENT WHEN DROPDOWN IS CLICKED && RESET DROPDOWNSTATE
  const ChooseIngredientHandler = (a) => {
    setChosenIngredient(a.ingAdminName);
    setchosenIngredientObject(a);
    setIngredientDropDown([])
  }

  // Handlers when to Open And Close Dropdown when selected -- AVOIDS DOUBLE SEARCHING DROPDOWN
  const dropdownClickHandlerOpen = () => {
    setDropdownClick(true)
    console.log()
  }
  const dropdownClickHandlerClose = () => {
    setDropdownClick(false)
  }

  //Handler For Ingredient List Button -- MAIN STORAGE OF FULL INGREDIENT OBJECT -- USES PUSH AND MAKES ARRAY OF OBJECTS TO BE MANIPULATED FOR FINAL RESULT

const handleIngredientList = () => {



  var item = chosenIngredientObject?.baseSize.find(item => item?.baseSizeNum == chosenMetric);

  console.log(item);
  
  const doc = {
    ingredientName: chosenIngredientObject.ingAdminName,
    metric: chosenMetric,
    amount,
    calories: item.calories * amount,
    totalfat: item.totalfat * amount,
    saturatedfat: item.saturatedfat * amount,
    transfat: item.transfat * amount,
    cholesterol: item.cholesterol * amount,
    sodium: item.sodium * amount,
    totalcarb: item.totalcarb * amount,
    dietaryFiber: item.dietaryFiber * amount,
    sugar: item.sugar * amount,
    protein: item.protein * amount,
    vitaminA: item.vitaminA * amount,
    vitaminC: item.vitaminC * amount,
    calcium: item.calcium * amount,
    iron: item.iron * amount,

  }

  const newArray = [...finalRecipeObject, doc];
  setFinalRecipeObject(newArray);

  setChosenIngredient('');
  setchosenIngredientObject();
  setChosenMetric('')
  setIngredientDropDown([]);
  setAmount('');

  
}






  // handle procedure

  const handleProcedureAdd = () => {
    const qwe = [...procedure, []];
    setProcedure(qwe);
    // console.log(chosenIngredient);
    // console.log(chosenIngredientObject);
    console.log(finalRecipeObject);
    
    


  };
  const handleProcedureChange = (onChangeValue, u) => {
    const inputdata = [...procedure];
    inputdata[u] = onChangeValue.target.value;
    setProcedure(inputdata);
  };
  const handleProcedureDelete = (u) => {
    const deleteProcedure = [...procedure];
    deleteProcedure.splice(u, 1);
    setProcedure(deleteProcedure);
  };

  const navigate = useNavigate();

  const uploadImage = (e) => {
    const selectedFile = e.target.files[0];
    // uploading asset to sanity
    if (selectedFile.type === 'image/png' || selectedFile.type === 'image/svg' || selectedFile.type === 'image/jpeg' || selectedFile.type === 'image/gif' || selectedFile.type === 'image/tiff') {
      setWrongImageType(false);
      setLoading(true);
      client.assets
        .upload('image', selectedFile, { contentType: selectedFile.type, filename: selectedFile.name })
        .then((document) => {
          setImageAsset(document);
          setLoading(false);
        })
        .catch((error) => {
          console.log('Upload failed:', error.message);
        });
    } else {
      setLoading(false);
      setWrongImageType(true);
    }
  };

  const savePin = () => {
    if (title && about && procedure && imageAsset?._id && category) {
      const doc = {
        _type: 'pin',
        _key: uuidv4(),
        title,
        about,

        procedure,
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: imageAsset?._id,
          },
        },
        userId: user._id,
        postedBy: {
          _type: 'postedBy',
          _ref: user._id,
        },
        category,
      };
      client.create(doc).then(() => {
        fetch(ingval);
        navigate('/');
        console.log(doc);
      });
    } else {
      setFields(true);

      setTimeout(
        () => {
          setFields(false);
        },
        2000,
      );
    }
  };

  return (
    <div className="flex flex-col justify-center items-center mt-5 lg:h-4/5">

      <div className=" flex lg:flex-row flex-col justify-center items-center bg-white lg:p-5 p-3 lg:w-4/5  w-full">
        <div className="bg-secondaryColor p-3 flex flex-0.7 w-full">
          <div className=" flex justify-center items-center flex-col border-2 border-dotted border-blue-400 p-3 w-full h-420">
            {loading && (
              <Spinner />
            )}
            {
              wrongImageType && (
                <p>It&apos;s wrong file type.</p>
              )
            }
            {!imageAsset ? (
              // eslint-disable-next-line jsx-a11y/label-has-associated-control
              <label>
                <div className="flex flex-col items-center justify-center h-full">
                  <div className="flex flex-col justify-center items-center">
                    <p className="font-bold text-2xl">
                      <AiOutlineCloudUpload />
                    </p>
                    <p className="text-lg font-semibold">Click to upload</p>
                  </div>

                  <p className="mt-3 text-gray-400 text-xs">
                    Recommendation: Use high-quality JPG, JPEG, SVG, PNG, GIF or TIFF less than 20MB
                  </p>
                </div>
                <input
                  type="file"
                  name="upload-image"
                  onChange={uploadImage}
                  className="w-0 h-0"
                />
              </label>
            ) : (
              <div className="relative h-full">
                <img
                  src={imageAsset?.url}
                  alt="uploaded-pic"
                  className="h-full w-full"
                />
                <button
                  type="button"
                  className="absolute bottom-3 right-3 p-3 rounded-full bg-white text-xl cursor-pointer outline-none hover:shadow-md transition-all duration-500 ease-in-out"
                  onClick={() => setImageAsset(null)}
                >
                  <MdDelete />
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-1 lg:pl-5 mt-5 w-full">
          {user && (
            <div className="flex gap-2 mt-2 mb-2 ml-6 items-center bg-white rounded-lg ">
              <img
                src={user.image}
                className="w-10 h-10 rounded-full"
                alt="user-profile"
              />
              <p className="font-bold">{user.userName}</p>
            </div>
          )}
          <div className="flex flex-1 flex-col gap-6 lg:pl-5 mt-2 w-full">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Give your recipe a title"
              className="outline-none text-xl sm:text-3l font-bold border-b-2 border-gray-200 p-2"
            />
          </div>

          <div className="flex flex-1 flex-col gap-6 lg:pl-5 mt-5 w-full">
            <input
              type="text"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              placeholder="Recipe Description"
              className="outline-none text-base sm:text-lg border-b-2 border-gray-200 p-2"
            />
          </div>

          {/* NUTRIENT MODULE */}

          <input
            type="text"
            onChange={(e) => setChosenIngredient(e.target.value)}
            onClick={() => dropdownClickHandlerOpen()}
            placeholder="Search INGREDIENT"
            value={chosenIngredient}
            className="p-2 w-full bg-white outline-none"
          />

            {/* DISPLAY ALERT IF NO INGREDIENTS FOUND */}
          <div>
          {ingredientDropDown.length == 0 && chosenIngredient !== "" && !loadingIngredient && <div>NO INGREDIENTS FOUND</div>}
            {ingredientDropDown?.map((item) => (
              <div
                onClick={() => { ChooseIngredientHandler(item); dropdownClickHandlerClose(); }}
                key={item?._key}
              >
                {item?.ingAdminName}
                
              </div>
            ))
            }
          </div>
          
          {/* METRIC DROPDOWN */}
          <div className="flex flex-nowrap">

            <select value={chosenMetric}
              onChange={(e) => {
                setChosenMetric(e.target.value);
              }}
              className="mx-2 mt-2 ml-3 block p-2 w-24 text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            > 
              <option className="text-base border-0 outline-none capitalize bg-gray-100 text-gray " value={null} >
                Metric
                </option>
              {
              chosenIngredientObject?.baseSize.map((item) => (
                <option className="text-base border-0 outline-none capitalize bg-gray-100 text-gray " value={item?.baseSizeNum} >
                  {item?.baseSizeNum}
                </option>
              ))}
            </select>
          </div>

          {/* AMOUNT */}
          <input
            type="text"
            onChange={(e) => setAmount(parseInt(e.target.value))}
            placeholder="Amount"
            value={amount}
            className="p-2 w-full bg-white outline-none"
          />
          <button
              className="text-nGreen w-24 h-7.5 float-left py-1 px-1  text-xs font-bold text-center text-white bg-gray-50 rounded-full border border-blue-300"

              onClick={() => handleIngredientList()}
            >
              ADD
            </button>














          {/* div for procedures */}
          <div className="flex flex-1 flex-col gap-2 lg:pl-5 mt-2 w-full py-4">
            <label className=" font-semibold">Procedure</label>
            {procedure.map((data, u) => (
              <div className="flow-root">
                {/* textarea for procedures */}
                <textarea
                  key="u"
                  id="message"
                  rows="4"
                  className="float-left block p-1 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 "
                  placeholder="Procedure"
                  value={data}
                  onChange={(e) => handleProcedureChange(e, u)}
                />
                {/* button for x procedures */}
                <button
                  onClick={() => handleProcedureDelete(u)}
                  className="text-nRed w-5 h-5 float-right px-1 mx-1 mt-1 text-xs font-bold text-center text-white bg-gray-50 rounded-lg border border-red-200"

                >
                  x
                </button>
              </div>
            ))}
            {/* button for add procedures */}
            <button
              className="text-nGreen w-24 h-7.5 float-left py-1 px-1  text-xs font-bold text-center text-white bg-gray-50 rounded-full border border-blue-300"

              onClick={() => handleProcedureAdd()}
            >
              ADD
            </button>
          </div>

          <div className="flex flex-1 flex-col gap-6 lg:pl-5 mt-5 w-full">
            <div>
              <p className="mb-2 font-semibold text:lg sm:text-xl">Choose Recipe Category</p>
              <select
                onChange={(e) => {
                  setCategory(e.target.value);
                }}
                className="outline-none w-4/5 text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer"
              >
                <option value="others" className="sm:text-bg bg-white">Select Category</option>
                {categories.map((item) => (
                  <option className="text-base border-0 outline-none capitalize bg-gray-100 text-black " value={item.name}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex justify-end items-end mt-5">
              {fields && (
                <p className="text-nGreen mr-5 text-xl transition-all duration-150 ease-in ">
                  Please add all fields.
                </p>
              )}
              <button
                type="button"
                onClick={savePin}
                className="transition ease-in-out delay-150 w-36 border border-blue-300 rounded-full bg-gray-200  text-gray-400 hover:text-white hover:-translate-y-1 hover:scale-110 hover:bg-nGreen duration-300">

                Upload Recipe
              </button>

            </div>
          </div>
        </div>
      </div>



    </div>
  );
};

export default CreatePin;
