"use client"
import "babel-polyfill"
import { useRouter } from "next/navigation";
import PatientPage from "../components/patients";
import Sidebar from "../components/sidebar";




export default function Home() {
    const router = useRouter();
    const handledashboard = () => {
        router.push('/');
      };
      const handleNavigate = () => {
        router.push('/views');
      };
      const handleNavigate2 = () => {
        router.push('/patients');
      };
    
  return (
   
      <div className=" flex flex-row ">
      <Sidebar handledashboard={handledashboard} handleNavigate={handleNavigate} handleNavigate2={handleNavigate2}/>
      <PatientPage/>
      </div>

  )
}
