"use client"
import { LuLayoutDashboard } from 'react-icons/lu';
import { BsListTask } from 'react-icons/bs';
import { AiOutlinePlus } from 'react-icons/ai';
import { RiLiveLine } from 'react-icons/ri';
import Image from 'next/image'
import backimage from '../../assets/blackimage.png'
import { ChangeEvent, Fragment, useState } from 'react';
import { IoPersonSharp } from "react-icons/io5";
import Model from './model';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useRouter } from 'next/router';


interface SidebarProps {
  handleNavigate: () => void;
  handleNavigate2: () => void;
  handledashboard: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ handleNavigate,handledashboard,handleNavigate2}) => {



  // const [showModal, setShowModal] = useState(false);
  // const [typedData1, setTypedData1] = useState<string>('');
  // const [typedData2, setTypedData2] = useState<string>('');
  // const [typedData3, setTypedData3] = useState<string>('');

  // const handleTextAreaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
  //   setTypedData1(event.target.value);
  // };

  // const handleInputChange1 = (event: { target: { value: any; }; }) => {
  //   const newValue = event.target.value;
  //   setTypedData2(newValue);

  // };

  // const handleInputChange2 = (event: { target: { value: any; }; }) => {
  //   const newValue = event.target.value;
  //   setTypedData3(newValue);

  // };

  const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/';
  const API_URL = 'https://web-production-ecf9.up.railway.app/question';

  // const handlePrintClick = async () => {

  //   console.log('Typed Data1:', typedData1);
  //   console.log('Typed value:', typedData2);
  //   console.log('Typed value:', typedData3);
  //   try {
  //     const response = await axios.post(`${CORS_PROXY}${API_URL}`, {
  //       "work": typedData1,
  //       "deadline": typedData2,
  //       "id": typedData3
  //     });
      
  //     console.log('Server Response:', response.data);

  //     setTypedData1('');
  //     setTypedData2('');
  //     setTypedData3('');
  //     Swal.fire({
  //       title: 'Do you want to save the changes?',
  //       showDenyButton: true,
  //       showCancelButton: true,
  //       confirmButtonText: 'Save',
  //       denyButtonText: `Don't save`,
  //     }).then((result) => {
  //       /* Read more about isConfirmed, isDenied below */
  //       if (result.isConfirmed) {
  //         Swal.fire('Saved!', '', 'success')
  //       } else if (result.isDenied) {
  //         Swal.fire('Changes are not saved', '', 'info')
  //       }

  //     })
  //     setShowModal(false)

      
  //   } catch (error) {
  //     console.error('Error:', error);
  //   }
  // };

 const [clicked, setClicked] = useState(0);

 function myFunction1(){
  handledashboard();
  setClicked(0);
  setClicked(0);
  console.log(clicked);
}
function myFunction2(){
  handleNavigate();
  setClicked(1);
  setClicked(1);
  console.log(clicked);
}

function myFunction3(){
  handleNavigate2();
  setClicked(2);
  setClicked(2);
  console.log(clicked);
}




  return (
    <Fragment>
      <div className="m-4 font-bold bg-[#eef7ff] w-64 justify-between  h-screen p-3 flex flex-col rounded-3xl">
    <div>
    <h1 className="text-xl pb-2 lg:text-5xl font-bold  mt-11 bg-gradient-to-r from-blue-300 to-blue-400 bg-clip-text text-transparent ">Baymax</h1>
        <button type="button" className={`hover:text-white mt-5 justify-between w-56  ${clicked == 0  ? 'text-white' :  'text-[#6e54ff]'  } ${clicked == 0  ? 'bg-[#6e54ff]' :  'bg-[#6e54ff00]' } lg:text-md hover:bg-blue-400 focus:ring-2 focus:outline-none focus:ring-[#6e54ff]/50  rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-[#6e54ff]/40 dark:focus:ring-white-600 mr-2 mb-2`} onClick={myFunction1}>
          Dashboard
          <LuLayoutDashboard />
        </button>
        <button type="button" className={`hover:text-white mt-5 justify-between w-56  ${clicked == 1  ? 'text-white' :  'text-[#6e54ff]'  } ${clicked == 1  ? 'bg-[#6e54ff]' :  'bg-[#6e54ff00]' } text-[#6e54ff] lg:text-md hover:bg-blue-400 focus:ring-2 focus:outline-none focus:ring-[#6e54ff]/50  rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-[#6e54ff]/40 dark:focus:ring-white-600 mr-2 mb-2`} onClick={myFunction2}>
        Start Consult
          <div className="w-14"></div>
          <RiLiveLine />
        </button>
        <button type="button" className={`hover:text-white mt-5 justify-between w-56 ${clicked == 2  ? 'text-white' :  'text-[#6e54ff]'  } ${clicked == 2  ? 'bg-[#6e54ff]' :  'bg-[#6e54ff00]' }  text-[#6e54ff] lg:text-md hover:bg-blue-400 focus:ring-2 focus:outline-none focus:ring-[#6e54ff]/50  rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-[#6e54ff]/40 dark:focus:ring-white-600 mr-2 mb-2`} onClick={myFunction3}>
        Patients
          <div className="w-14"></div>
          <IoPersonSharp />
        </button>
        
    </div>
        <Image
          className='mt-10 mb-5 '
          src={backimage}
          width={800}
          height={800}
          alt="Picture of the author"
          layout='responsive'
        />
      
      </div>
   
    </Fragment>
  )
}

export default Sidebar