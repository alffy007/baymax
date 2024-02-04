"use client"
import 'babel-polyfill';
import { useRouter } from 'next/navigation';
import Dashboard from './components/dashboard'
import Sidebar from './components/sidebar'





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
    <main className=" min-h-screen bg-white">
      <div className=" flex flex-row ">
      <Sidebar handleNavigate={handleNavigate} handledashboard={handledashboard} handleNavigate2={handleNavigate2}/>
      <Dashboard/>
      </div>
    </main>
  )
}
