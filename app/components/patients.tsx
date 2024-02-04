"use client"
import React, { useEffect } from "react";
import { useListVals } from "react-firebase-hooks/database";
import db from "../firebase";
import { collection, doc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { ref, set } from "firebase/database";
import Swal from 'sweetalert2';
import { Button, ButtonGroup } from "@nextui-org/react";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Console } from "console";
import patients from "../../assets/patient.png"
import completed from "../../assets/completed.png"
import consultation from "../../assets/consultation.png"
type StatusesKeys = "open" | string;
import Model2 from './model2';


interface MarkerData {
    id: string;
    address: string;
    lat: number;
    lng: number;
}

const containerStyle = {
    height: "400px",
    width: "100%",
    borderRadius: "10px",
};






export default function PatientPage() {


   
    const [classes, setClasses] = useState("ECB");
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchData = async () => {
        try {
          const docRef = doc(db, "163675", "diarization");
          const docSnap = await getDoc(docRef);
         
          if (docSnap.exists()) {
            const datas = docSnap.data()
            setItems(datas.message);
            console.log("Document data:", datas.message);

          } else {
            console.log("No such document!");
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      
    

    // Your JSX and component code here

    // ...

 

    const clickhandle = async () => {
        try {
            setLoading(true);
            fetchData();

        } catch (error) {
            console.error("Error fetching ECB data:", error);
        }
    };

    const [selectedOrderIndex, setSelectedOrderIndex] = useState(1);
    const [showOrderDetails, setShowOrderDetails] = useState(false);

    const [infoWindowData, setInfoWindowData] = React.useState<MarkerData | null>(
        null
    );
    const [isOpen, setIsOpen] = React.useState(false);

    const handleMarkerClick = (marker: MarkerData) => {
        setInfoWindowData(marker);
        setIsOpen(true);
    };

    return (
        <div className="flex min-h-screen  w-full">

            <div
                className="flex w-full flex-col bg-[#eef7ff] sm:w-64 m-4 rounded-3xl p-2"
                style={{ flex: 3 }}
            >
                <div className="py-12 bg-slate-100 sm:py-16 lg:py-7 w-full">
                    {/* <div className="bg-white w-fit p-4 mx-auto m-5 flex rounded-xl">
                        <button
                            type="button"
                            onClick={() => {
                                setClasses("ECB");
                                console.log(classes);
                            }}
                            className={`py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200  focus:text-blue-700 ${classes === "ECB" ? 'active' : ''}`}
                        >
                            ECB
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                setClasses("CSB");
                                console.log(classes);
                            }}
                            className={`py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200  focus:text-blue-700 ${classes === "CSB" ? 'active' : ''}`}
                        >
                            CSB
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                setClasses("EB");
                                console.log(classes);
                            }}
                            className={`py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200  focus:text-blue-700 ${classes === "EB" ? 'active' : ''}`}
                        >
                            EB
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                setClasses("CSA");
                                console.log(classes);
                            }}
                            className={`py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 focus:text-blue-700 ${classes === "CSA" ? 'active' : ''}`}
                        >
                            CSA
                        </button>
                    </div>
                     */}
                    <Model2 isvisible={loading} onClose={async () => setLoading(false)}>
                        <div className="p-2">
                        <h2>Patient Conversation:</h2>
      <ul className="gap-2">
        {items.map((item, index) => (
          <li className={`${index >4 ? 'pt-3' : 'p-0'}`}  key={index}>{item}</li>
        ))}
      </ul>
                        </div>
                    </Model2>

                    <h1 className="mx-auto text-2xl font-semibold py-8 px-12">Patients Status</h1>
                    <div className="px-4 mx-auto max-w-7xl  sm:px-6 lg:px-8">
                        <div className="grid max-w-5xl grid-cols-1 gap-12 mx-auto sm:grid-cols-2 lg:grid-cols-3">

                            <div onClick={() => { clickhandle() }} className="bg-white  border hover:shadow-xl scale-105 cursor-pointer  border-blue-200 rounded-xl">
                                <div className="px-5 flex  py-4">
                                    <p className="text-sm font-medium tracking-wider text-gray-700 uppercase">
                                        <Image

                                            src="https://images.pexels.com/photos/4307869/pexels-photo-4307869.jpeg?auto=compress&cs=tinysrgb&w=600"
                                            width={100}
                                            height={20}
                                            className="object-cover rounded-lg h-32"
                                            alt="Picture of the author"

                                        />{" "}
                                        Athul Babu{" "}
                                    </p>
                                    <div className="flex flex-col justify-center mt-3">
                                        <p className="text-xl font-bold text-slate-600 ml-3">
                                            BPM:78
                                        </p>

                                        <p className="text-xl font-bold text-slate-500 ml-3">
                                            SPO2:78
                                        </p>
                                        <p className="text-xl font-bold text-slate-400 ml-3">
                                            Blood Sugar: 78
                                        </p>

                                    </div>
                                </div>
                            </div>

                            <div onClick={() => { clickhandle() }} className="bg-white  border hover:shadow-xl scale-105 cursor-pointer  border-blue-200 rounded-xl">
                                <div className="px-5 flex  py-4">
                                    <p className="text-sm font-medium tracking-wider text-gray-700 uppercase">
                                        <Image

                                            src="https://images.pexels.com/photos/7647313/pexels-photo-7647313.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                                            width={100}
                                            height={20}
                                            className="object-cover rounded-lg h-32 "
                                            alt="Picture of the author"

                                        />{" "}
                                        Alfred jimmy{" "}
                                    </p>
                                    <div className="flex flex-col justify-center mt-3">
                                        <p className="text-xl font-bold text-slate-600 ml-3">
                                            BPM:78
                                        </p>

                                        <p className="text-xl font-bold text-slate-500 ml-3">
                                            SPO2:78
                                        </p>
                                        <p className="text-xl font-bold text-slate-400 ml-3">
                                            Blood Sugar: 78
                                        </p>

                                    </div>
                                </div>
                            </div>

                            <div onClick={() => { clickhandle() }} className="bg-white  border hover:shadow-xl scale-105 cursor-pointer  border-blue-200 rounded-xl">
                                <div className="px-5 flex  py-4">
                                    <p className="text-sm font-medium tracking-wider text-gray-700 uppercase">
                                        <Image

                                            src="https://images.pexels.com/photos/16264659/pexels-photo-16264659/free-photo-of-a-black-and-white-photo-of-a-young-boy-looking-into-the-dark.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                                            width={100}
                                            height={20}
                                            className=" h-32     object-cover rounded-lg "
                                            alt="Picture of the author"

                                        />{" "}
                                        Goutham C  {" "}
                                    </p>
                                    <div className="flex flex-col justify-center mt-3">
                                        <p className="text-xl font-bold text-slate-600 ml-3">
                                            BPM:78
                                        </p>

                                        <p className="text-xl font-bold text-slate-500 ml-3">
                                            SPO2:78
                                        </p>
                                        <p className="text-xl font-bold text-slate-400 ml-3">
                                            Blood Sugar: 78
                                        </p>

                                    </div>
                                </div>
                            </div>


                        </div>
                        <div className="grid max-w-5xl grid-cols-1 gap-12 mx-auto sm:grid-cols-2 lg:grid-cols-3">


                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}