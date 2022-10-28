import React, { useState } from 'react';
import { AiOutlineCloudUpload, AiOutlinePlus } from 'react-icons/ai';
import { MdDelete } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

import { client } from '../client';
import { categories } from '../utils/data';
import Spinner from './Spinner';

const CreatePin = ({ user }) => {
  const [title, setTitle] = useState('');
  const [about, setAbout] = useState('');
  const [loading, setLoading] = useState(false);
  const [fields, setFields] = useState();
  const [category, setCategory] = useState();
  const [imageAsset, setImageAsset] = useState();
  const [wrongImageType, setWrongImageType] = useState(false);
  const [ingredient, setIngredient] = useState(['']);
  const [ingredientVal, setIngredientVal] = useState(['']);
  const [procedure, setProcedure] = useState(['']);
  


  // handle ingredient
  const handleIngredientAdd=()=>{
      const abc=[...ingredient,[]]
      setIngredient(abc)
  }
  const handleIngredientChange=(onChangeValue,i)=>{
   const inputdata=[...ingredient]
   inputdata[i]=onChangeValue.target.value;
   setIngredient(inputdata)
  }
  const handleIngredientDelete=(i)=>{
      const deleteIngredient=[...ingredient]
      deleteIngredient.splice(i,1)
      setIngredient(deleteIngredient)  
  }

  // handle ingredientval
  const handleIngredientValChange=(onChangeValue,u)=>{
    const inputdata=[...ingredientVal]
    inputdata[u]=onChangeValue.target.value;
    setIngredientVal(inputdata)
   }
   
   const handleIngredientValAdd=()=>{
    const qwe=[...ingredientVal,[]]
    setIngredientVal(qwe)
}
const handleIngredientValDelete=(i)=>{
  const deleteIngredientVal=[...ingredientVal]
  deleteIngredientVal.splice(i,1)
  setIngredientVal(deleteIngredientVal)  
}

  // handle procedure

    const handleProcedureAdd=()=>{
      const qwe=[...procedure,[]]
      setProcedure(qwe)
  }
  const handleProcedureChange=(onChangeValue,u)=>{
   const inputdata=[...procedure]
   inputdata[u]=onChangeValue.target.value;
   setProcedure(inputdata)
  }
  const handleProcedureDelete=(u)=>{
      const deleteProcedure=[...procedure]
      deleteProcedure.splice(u,1)
      setProcedure(deleteProcedure)  
  }





  
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
    if (title && about && procedure && imageAsset?._id && ingredient && category) {
      const doc = {
        _type: 'pin',
        title,
        about,
        ingredient,
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
        navigate('/');
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
      {fields && (
        <p className="mb-5 text-xl transition-all duration-150 ease-in " style={{ color:"#008083"}}>
          Please add all fields.
          </p>
      )}
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
            className="outline-none text-base sm:text-lg border-b-2 border-gray-200 p-2"/>
            </div>
            
        <div className="h-56 grid grid-cols-3 gap-4 content-evenly lg:pl-5 mt-5 w-1/2" class="float-root  flex items-stretch" >
        <div class='float-left py-4'>
            <label className='mt-2, ml-4 font-semibold'>Ingredients</label>
            {ingredient.map((data,i)=>{
                return(
              <div class="flex flex-nowrap">
                 
                 <input type="text" id="small-input" class="mx-2 mt-2 block p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder='Ingredient'
                  value={data} 
                  onChange={e=>handleIngredientChange(e,i)} />
                    
            </div> )})}
            </div> 
            
            <div class='float-middle py-4'>
                <label className='mt-2, ml-4 font-semibold' >Grams</label>
            {ingredient.map((data,i)=>{
                return(
              <div class="flex flex-nowrap">
                  
                  <input type="text" id="small-input" class="mx-2 mt-2 block p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder='Grams'
                  value={data} 
                  onChange={e=>handleIngredientChange(e,i)} />
                  <button onClick={() => handleIngredientDelete(i)} class="py-1 px-1 mx-1 mt-2 text-xs font-bold text-center text-white bg-gray-50 rounded-lg border border-blue-300"
                  style={{width: "50px", color:"#008083", height:"35px"}}>
                    x
                    </button>
            </div> )})}
            </div>
            
            
              </div>
              <button class="py-1 px-3 mx-2 text-xs font-bold text-center text-white bg-gray-50 rounded-full border border-blue-300"
              style={{width: "100px", color:"#008083", height:"30px"}}
              onClick = {() => handleIngredientAdd()}
              >
                 ADD
              </button>
            
          <div className="flex flex-1 flex-col gap-2 lg:pl-5 mt-2 w-full py-4">
             <label>Procedure</label>
               
                {procedure.map((data,u)=>{
                  return(
                 <div class="flow-root">
                    <textarea id="message" rows="4" class="float-left block p-1 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 " 
                    placeholder="Procedure"         
                    value={data} 
                    onChange={e=>handleProcedureChange(e,u)}></textarea>
                    
                    <button onClick={()=>handleProcedureDelete(u)}class="float-right py-1 px-1 mx-1 mt-2 text-xs font-bold text-center text-white bg-gray-50 rounded-lg border border-blue-300"
                  style={{width: "40px", color:"#008083", height:"35px"}}>
                    x
                    </button>
               </div>
                )})}
                
            </div>
            <button  class="py-1 px-3 mx-2 text-xs font-bold text-center text-white bg-gray-50 rounded-full border border-blue-300"
              style={{width: "100px", color:"#008083", height:"30px"}}
              onClick = {() => handleProcedureAdd() }
              >
                 ADD
              </button>

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
              <button
                type="button"
                onClick={savePin}
                className="text-base text-white p-2 rounded-full outline-none" style={{width: "140px", backgroundColor: "#008083"}}
              >
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
