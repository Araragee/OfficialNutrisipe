import React, { useState } from "react";
import { client } from "../client";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import ReadIngredient from "./ReadIngredient";

const CreateIngredient = ({ user }) => {
 

  const [foodItem, setFoodItem] = useState("");
  const [altName, setAltName] = useState("");
  const [ediblePortion, setEdiblePortion] = useState("");
  const [energy, setEnergy] = useState("");
  const [prot, setProt] = useState("");
  const [fat, setFat] = useState("");
  const [carb, setCarb] = useState("");
  const [calcium, setCalcium] = useState("");
  const [phos, setPhos] = useState("");
  const [iron, setIron] = useState("");
  const [vitA, setVitA] = useState("");
  const [thia, setThia] = useState("");
  const [ribo, setRibo] = useState("");
  const [nia, setNia] = useState("");
  const [vitC, setVitC] = useState("");
  const [ModalOpen, setModalOpen] = useState(false);
  const [uploadSuccessAlert, setuploadSuccessAlert] = useState(false);
  const [uploadFailedAlert, setuploadFailedAlert] = useState(false);

  const ModalHandlerOpen = () => {
    setModalOpen(true);
  };
  const ModalHandlerClose = () => {
    setModalOpen(false);
  };

  //Handler for Uploading Ingredients to Database
  const uploadIngredient = () => {
    if (foodItem !== "") {
      const doc = {
        _type: "ingredientData",
        _key: uuidv4(),
        foodItem,
        altName,
        ediblePortion: Number(ediblePortion),
        energy: Number(energy),
        prot: Number(prot),
        fat: Number(fat),
        carb: Number(carb),
        calcium: Number(calcium),
        phos: Number(phos),
        iron: Number(iron),
        vitA: Number(vitA),
        thia: Number(thia),
        ribo: Number(ribo),
        nia: Number(nia),
        vitC: Number(vitC)
      };

      client.create(doc).then(() => {
        // setIngAdminName("");
        console.log(doc);
      });
      setuploadSuccessAlert(true);

      setTimeout(() => {
        setuploadSuccessAlert(false);
      }, 8000);
    } else {
        setuploadFailedAlert(true);

      setTimeout(() => {
        setuploadFailedAlert(false);
      }, 8000);
    }
  };

  if (user?.isAdmin) {
    return (
      //UPLOAD INGREDIENT BUTTON

      <div className="flex flex-col justify-center items-center mt-5 lg:h-4/5 ">
        <div className="font-bold text-3xl pb-4">
          {" "}
          ADD AN INGREDIENT TO DATABASE
        </div>
        <div className="flex flex-1 flex-col gap-6 lg:pl-5 ">
          <input
            type="text"
            value={foodItem}
            onChange={(e) => setFoodItem(e.target.value)}
            placeholder="Ingredient Name"
            className="ooutline-none text-xl sm:text-3l font-bold border-b-2 border-gray-200 p-2"
          />
        </div>

        <div className="flex flex-1 flex-col gap-6 lg:pl-5 ">
          <input
            type="text"
            value={altName}
            onChange={(e) => setAltName(e.target.value)}
            placeholder="Alternate Name"
            className="ooutline-none text-xl sm:text-3l font-bold border-b-2 border-gray-200 p-2"
          />
        </div>

        <div className="flex flex-1 flex-col gap-6 lg:pl-5 ">
          <input
            type="text"
            value={ediblePortion}
            onChange={(e) => setEdiblePortion(e.target.value)}
            placeholder="Edible Portion"
            className="ooutline-none text-xl sm:text-3l font-bold border-b-2 border-gray-200 p-2"
          />
        </div>

        <div className="flex flex-1 flex-col gap-6 lg:pl-5 ">
          <input
            type="text"
            value={energy}
            onChange={(e) => setEnergy(e.target.value)}
            placeholder="Energy"
            className="ooutline-none text-xl sm:text-3l font-bold border-b-2 border-gray-200 p-2"
          />
        </div>

        <div className="flex flex-1 flex-col gap-6 lg:pl-5 ">
          <input
            type="text"
            value={prot}
            onChange={(e) => setProt(e.target.value)}
            placeholder="Protein"
            className="ooutline-none text-xl sm:text-3l font-bold border-b-2 border-gray-200 p-2"
          />
        </div>

        <div className="flex flex-1 flex-col gap-6 lg:pl-5 ">
          <input
            type="text"
            value={fat}
            onChange={(e) => setFat(e.target.value)}
            placeholder="Fat"
            className="ooutline-none text-xl sm:text-3l font-bold border-b-2 border-gray-200 p-2"
          />
        </div>

        <div className="flex flex-1 flex-col gap-6 lg:pl-5 ">
          <input
            type="text"
            value={carb}
            onChange={(e) => setCarb(e.target.value)}
            placeholder="Carb"
            className="ooutline-none text-xl sm:text-3l font-bold border-b-2 border-gray-200 p-2"
          />
        </div>

        <div className="flex flex-1 flex-col gap-6 lg:pl-5 ">
          <input
            type="text"
            value={calcium}
            onChange={(e) => setCalcium(e.target.value)}
            placeholder="Calcium"
            className="ooutline-none text-xl sm:text-3l font-bold border-b-2 border-gray-200 p-2"
          />
        </div>

        <div className="flex flex-1 flex-col gap-6 lg:pl-5 ">
          <input
            type="text"
            value={phos}
            onChange={(e) => setPhos(e.target.value)}
            placeholder="Phosporus"
            className="ooutline-none text-xl sm:text-3l font-bold border-b-2 border-gray-200 p-2"
          />
        </div>

        <div className="flex flex-1 flex-col gap-6 lg:pl-5 ">
          <input
            type="text"
            value={iron}
            onChange={(e) => setIron(e.target.value)}
            placeholder="Iron"
            className="ooutline-none text-xl sm:text-3l font-bold border-b-2 border-gray-200 p-2"
          />
        </div>

        <div className="flex flex-1 flex-col gap-6 lg:pl-5 ">
          <input
            type="text"
            value={vitA}
            onChange={(e) => setVitA(e.target.value)}
            placeholder="Vitamin A"
            className="ooutline-none text-xl sm:text-3l font-bold border-b-2 border-gray-200 p-2"
          />
        </div>

        <div className="flex flex-1 flex-col gap-6 lg:pl-5 ">
          <input
            type="text"
            value={thia}
            onChange={(e) => setThia(e.target.value)}
            placeholder="Thiamine"
            className="ooutline-none text-xl sm:text-3l font-bold border-b-2 border-gray-200 p-2"
          />
        </div>

        <div className="flex flex-1 flex-col gap-6 lg:pl-5 ">
          <input
            type="text"
            value={ribo}
            onChange={(e) => setRibo(e.target.value)}
            placeholder="Ribo"
            className="ooutline-none text-xl sm:text-3l font-bold border-b-2 border-gray-200 p-2"
          />
        </div>

        <div className="flex flex-1 flex-col gap-6 lg:pl-5 ">
          <input
            type="text"
            value={nia}
            onChange={(e) => setNia(e.target.value)}
            placeholder="Nia"
            className="ooutline-none text-xl sm:text-3l font-bold border-b-2 border-gray-200 p-2"
          />
        </div>

        <div className="flex flex-1 flex-col gap-6 lg:pl-5 ">
          <input
            type="text"
            value={vitC}
            onChange={(e) => setVitC(e.target.value)}
            placeholder="Vitamin C"
            className="ooutline-none text-xl sm:text-3l font-bold border-b-2 border-gray-200 p-2"
          />
        </div>


        {uploadSuccessAlert && (
          <p className="text-nGreen mr-5 text-xl transition-all duration-150 ease-in ">
            Ingredient Successfully addedd to the database.
          </p>
        )}

        {uploadFailedAlert && (
          <p className="text-nGreen mr-5 text-xl transition-all duration-150 ease-in ">
            Please input all required fields.
          </p>
        )}

        <div className="flex justify-end items-end mt-5">
          <button
            type="button"
            onClick={uploadIngredient}
            className="mb-3 transition ease-in-out delay-150 w-36 border rounded-full bg-nGreen text-white hover:text-white font-bold hover:-translate-y-1 hover:scale-110 duration-300 hover:bg-nOrange"
          >
            Add To Database
          </button>
        </div>

        <ReadIngredient
          uploadSuccessAlert={uploadSuccessAlert}
          setuploadSuccessAlert={setuploadSuccessAlert}
        />
      </div>
    );
  } else {
    return (
      <p className="text-nGreen mr-5 text-xl transition-all duration-150 ease-in ">
        Unauthorized Access
      </p>
    );
  }
};

export default CreateIngredient;
