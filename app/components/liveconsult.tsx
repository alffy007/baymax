import { Button } from '@nextui-org/react';
import React, { useState, useEffect } from 'react';
import { VscDebugStart, VscDebugPause } from "react-icons/vsc";
import { Html5QrcodeScanner } from "html5-qrcode";
import Swal from 'sweetalert2';


import Image from 'next/image'
import axios from 'axios';
import Model from './model';
import Model2 from './model2';



// Import MicRecorder
const MicRecorder = require('mic-recorder-to-mp3');

const Mp3Recorder = new MicRecorder({ bitRate: 128 });
const OpenAI = require('openai');
const fs = require('fs');
// Initialize the OpenAI client with your API key
const openai = new OpenAI({
  apiKey: '',
  dangerouslyAllowBrowser: true// This is the default and can be omitted
});

const Minutespage = () => {


 

  useEffect(() => {

    function onScanSuccess(decodedText, decodedResult) {
      html5QrcodeScanner.clear();
      setScanResult(decodedResult)
      // handle the scanned code as you like, for example:
      console.log(`Code matched = ${decodedText}`, decodedResult);
    }
    
    function onScanFailure(error: any) {
      // handle scan failure, usually better to ignore and keep scanning.
      // for example:
      console.warn(`Code scan error = ${error}`);
    }


    let html5QrcodeScanner = new Html5QrcodeScanner(
      "reader",
      { fps: 10, qrbox: {width: 250, height: 250} },
      /* verbose= */ false);
  
      html5QrcodeScanner.render(onScanSuccess, onScanFailure);
  
      const id = setTimeout(() => {
        setScanResult("163675")
      }, 7000);

  }, [])
  

  const [listening, setListening] = useState(false);
  const [ScanResult, setScanResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(true);
  const [translationData, setTranslationData] = useState("");
  const [previuoshistory1, setPreviuoshistory1] = useState("---");
  const [previuoshistory2, setPreviuoshistory2] = useState("---");
  const [previuoshistory3, setPreviuoshistory3] = useState("---");

  const [pastMed1, setPAstMed1] = useState("---");
  const [pastMed2, setPAstMed2] = useState("---");
  const [pastMed3, setPAstMed3] = useState("---");

  const [curentissue1, setCurrentissue1] = useState("---");
  const [curentissue2, setCurrentissue2] = useState("---");

  const [curentmed1, setCurrenmed1] = useState("---");
  const [curentmed2, setCurrentmed2] = useState("---");
  const [curentmed3, setCurrentmed3] = useState("---");

  const [note1, setNote1] = useState("---");
  const [note2, setNote2] = useState("---");
  const [note3, setNote3] = useState("---");

  const [summary, setSummary] = useState("");

  //  useEffect(() => {
  // setLoading1(true);
  // },
  //  []);

  const handleStartRecording = () => {
    setListening(true);
    Mp3Recorder.start().then(() => { }).catch((error: any) => {
      console.error(error);
    });
  };
  const handleStopRecording = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setListening(false);

    try {

      Mp3Recorder
        .stop()
        .getMp3().then(async ([buffer, blob]: any) => {
          // do what ever you want with buffer and blob
          // Example: Create a mp3 file and play
          const file = new File(buffer, 'sample.mp3', {
            type: blob.type,
            lastModified: Date.now()
          });

          const player = new Audio(URL.createObjectURL(file));
          setLoading(true);
          console.log(loading);
          player.play();
          const translations = await openai.audio.translations.create({
            file: file,
            model: 'whisper-1'
          });
          console.log(translations);
          setTranslationData(translations.text);
          setLoading(false);
        }).catch((e: any) => {
          alert('We could not retrieve your message');
          console.log(e);
        });


    } catch (error) {
      alert('We could not transcribe the audio');
      console.error(error);
    } finally {
      setLoading(false);
    }

  };


  // const handleStopRecording = async () => {
  //   setListening(false);
  //   try {
  //     const [buffer, blob] = await Mp3Recorder.stop().getMp3();
  //     const file = new File([buffer], 'sample.mp3', { type: blob.type });

  //     // Use FileReader to read the file as a data URL
  //     const reader = new FileReader();
  //     reader.onloadend = async function () {
  //       if (typeof reader.result === 'string') {
  //         const base64Audio = reader.result.split(',')[1]; // Extract base64 data
  //         const transcribe = await openai.audio.transcriptions.create({
  //           file: base64Audio, // Pass the base64 audio data directly
  //           model: "whisper-1"
  //         });
  //         console.log(transcribe);
  //       const audio = new Audio(audioUrl);
  //       audio.onerror = function (err) {
  //         console.error('Error playing audio:', err);
  //       };
  //       audio.play();
  //       try {
  //         const reader = new FileReader();
  //         reader.readAsDataURL(file);
  //         reader.onloadend = async function () {
  //           if (reader.result instanceof ArrayBuffer || reader.result === null) {
  //             console.error('Failed to read the file.');
  //             return;
  //           }
  //           const base64Audio = reader.result.split(',')[1];
  //           console.log(base64Audio);
  //   const response = await fetch("https://api-inference.huggingface.co/models/openai/whisper-small", {
  //     method: "POST",
  //     headers: { Authorization: "Bearer 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" },
  //     body: base64Audio,
  //   });
  //   const data = await response.json();
  //   if (response.status !== 200) {
  //     throw data.error || new Error(`Request failed with status ${response.status}`);
  //   }
  //   setResult(data.result);
  // };
  // } catch (error: any) {
  //   console.error(error);
  //   alert(error.message);
  // }

  //     // Convert audio file to base64
  //     const baseAudio = await audioToBase64(file);
  //     console.log(baseAudio);
  //     // Call the query function with the base64 audio data
  //     const response = await query(baseAudio);

  //     console.log('API Response:', response);
  //   } catch (error) {
  //     alert('We could not retrieve your message');
  //     console.error(error);
  //   }
  // };

  // const query = async (audioData: any) => {
  //   try {
  //     const response = await fetch(
  //       "https://api-inference.huggingface.co/models/openai/whisper-large-v3",
  //       {
  //         method: "POST",
  //         headers: {
  //           "Authorization": "Bearer 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",
  //           "Content-Type": "audio/mpeg" // Adjust content type if necessary
  //         },
  //         body: audioData
  //       }
  //     );

  //     if (!response.ok) {
  //       throw new Error("Bad response from server");
  //     }

  //     const result = await response.json();
  //     return result;
  //   } catch (error) {
  //     console.error("Error querying the API:", error);
  //     throw error;
  //   }
  // };



  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      setLoading(true);
      const d = new Date();
      const time = d.getHours() + ":" + d.getMinutes();
      console.log(time)
      console.log(translationData)

      const response = await axios.post(
        "https://cors-anywhere.herokuapp.com/https://web-production-afb5b.up.railway.app/summary",
        {
          summary: translationData,
          time: time
        }
      );

      console.log('Server Response:', response.data);

      setPreviuoshistory1(response.data.result.past[0])
      setPreviuoshistory2(response.data.result.past[1])
      setPreviuoshistory3(response.data.result.past[2])
      console.log(previuoshistory1);
      console.log(previuoshistory2);
      console.log(previuoshistory3);



      setPAstMed1(response.data.result.past_medicine[0]);
      setPAstMed2(response.data.result.past_medicine[1]);
      setPAstMed3(response.data.result.past_medicine[2]);

      setCurrentissue1(response.data.result.now[0]);
      setCurrentissue2(response.data.result.now[1]);

      setCurrenmed1(response.data.result.now_medicine[0]);
      setCurrentmed2(response.data.result.now_medicine[1]);
      setCurrentmed3(response.data.result.now_medicine[2]);


      setNote1(response.data.result.instructions[0]);
      setNote2(response.data.result.instructions[1]);
      setNote3(response.data.result.instructions[2]);

      setSummary(response.data.result.summary);
      console.log(response.data.result.summary);

      await axios.post(
        "https://cors-anywhere.herokuapp.com/https://web-production-2af4.up.railway.app/dir",
        {
          statement: translationData,
          date: "03-02-2024",
          time: "2.57"
        }
      );


    } catch (error) {
      console.error('Error adding document: ', error);
    } finally {
      setLoading(false);
    }

    Swal.fire(
      'Got it!',
      'Successfully summarized!',
      'success'
    );
  };

  return (
    <div className="bg-white-80 flex min-h-screen w-full">
      <Model isvisible={loading} onClose={function (): void {
        throw new Error('Function not implemented.');
      }} children={undefined}  ></Model>
      <Model2 isvisible={loading2} onClose={async () => setLoading2(false)}>
        <div className="p-2">
            {ScanResult ? <div>Success</div>: <div id="reader"></div>}    
        </div>
      </Model2>
      <div
        className="flex w-full  justify-start flex-col bg-[#6e54ff]/80 sm:w-64 m-4 rounded-3xl"
        style={{ flex: 3 }}
      >
        <div className="h-full  px-6 py-4 sm:px-6 lg:px-8">
          <div className="h-full w-full flex flex-col bg-[#eef7ff] rounded">
            <div className='h-full p-3'>
              <h1 className='justify-center flex text-3xl'>Patient Details {""}</h1>
              <div className='flex'>
                <div>
                  <div className='p-4 ml-5 w-72 rounded-lg flex mt-5  bg-white '>
                    <img src="https://images.pexels.com/photos/4307869/pexels-photo-4307869.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" className="object-cover  rounded-xl w-36 h-32" />
                    <div>
                      <h1 className='text-5xl justify-center pl-10 flex pt-5'>O+</h1>
                      <h1 className='text-2xl pt-5 text-slate-600 justify-center pl-8 flex'>ID:163675</h1>
                    </div>
                  </div>
                  <div className='justify-start flex-col   w-fit  p-4  m-5 rounded-xl  bg-white flex text-lg'>
                    <h1 className=''>Patient name: Athul Babu {""}</h1>
                    <h1 className=''>Age: 21{""}</h1>
                  </div>
                  <div>
                    <div className='justify-start flex-col  w-72     p-4  m-5 rounded-xl  bg-white flex text-lg'>
                      <h1 className=''>Previous history: {""}</h1>
                      <h1 className=' text-slate-700 text-sm'>{previuoshistory1}{""}</h1>
                      <h1 className=' text-slate-700 text-sm'>{previuoshistory2}{""}</h1>
                      <h1 className=' text-slate-700 text-sm'>{previuoshistory3}{""}</h1>
                    </div>
                    <div className=' flex-col w-72  m-5 rounded-xl  bg-white flex text-lg'>
                      <h1 className='justify-center rounded-t-xl pt-2 h-12 flex bg-blue-400'>Past Medicines {""}</h1>
                      <h2 className='p-4  justify-center flex text-slate-700 text-sm'>{pastMed1}{""}</h2>
                      <h2 className='p-4  justify-center flex text-slate-700 text-sm'>{pastMed2}{""}</h2>
                      <h2 className='p-4  justify-center flex text-slate-700 text-sm'>{pastMed3}{""}</h2>

                    </div>
                  </div>

                </div>

                <div className='h-full gap-0'>
                  <div className=' flex-col w-72  m-5 rounded-xl  bg-white flex text-lg'>
                    <h1 className='justify-center rounded-t-xl pt-2 h-12 flex bg-blue-400'>Current health issues {""}</h1>
                    <h2 className='p-4  justify-center flex text-slate-700 text-sm'>{curentissue1}{""}</h2>
                    <h2 className='p-4  justify-center flex text-slate-700 text-sm'>{curentissue2}{""}</h2>

                  </div>
                  <div className=' flex-col w-72 h-1/2   m-5 rounded-xl  bg-white flex text-lg'>
                    <h1 className='justify-center rounded-t-xl pt-2 h-12 flex bg-blue-400'>Prescribed Medicines(now){""}</h1>
                    <h2 className='p-4  justify-center flex text-slate-700 text-sm'>{curentmed1}{""}</h2>
                    <h2 className='p-4  justify-center flex text-slate-700 text-sm'>{curentmed2}{""}</h2>
                    <h2 className='p-4  justify-center flex text-slate-700 text-sm'>{curentmed3}{""}</h2>

                  </div>
                  <div className=' flex-col w-72 h-1/2 mt-7  m-5 rounded-xl  bg-white flex text-lg'>
                    <h1 className='justify-center rounded-t-xl pt-2 h-12 flex bg-blue-400'>Things to note {""}</h1>
                    <h2 className='p-4  justify-center flex text-slate-700 text-sm'>{note1}{""}</h2>
                    <h2 className='p-4  justify-center flex text-slate-700 text-sm'>{note2}{""}</h2>
                    <h2 className='p-4  justify-center flex text-slate-700 text-sm'>{note3}{""}</h2>

                  </div>

                </div>
                <div className=' flex-col w-96 h-1/2   m-5 rounded-xl  bg-white flex text-lg'>
                  <h1 className='justify-center rounded-t-xl pt-2 h-12 flex bg-blue-400'>Consultation summary {""}</h1>
                  <h2 className='p-4  justify-center flex text-slate-700 text-sm'>03 Feb 2024{""}</h2>
                  <p className='p-3 text-md' >
                    {summary}
                  </p>
                </div>
              </div>

            </div>
            <div className=' flex flex-row justify-center'>
              <Button onClick={listening ? handleStopRecording : handleStartRecording} className={`bg-blue-400 w-fit border-blue-400 rounded p-3 m-3 gap-3 text-white hover:bg-blue-100 focus:border-white ${listening ? 'active' : ''}`}>
                {listening ? "Stop record" : "Start record"}{listening ? <VscDebugPause /> : <VscDebugStart />}
              </Button>
              <Button onClick={handleSubmit} className='bg-[#6e54ff] ml-3 w-fit rounded p-3 m-3 text-white hover:bg-blue-400'>Submit</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Minutespage;