import { Button } from '@nextui-org/react';
import React, { useState, useEffect } from 'react';
import { VscDebugStart, VscDebugPause } from "react-icons/vsc";
import { doc, updateDoc } from 'firebase/firestore';
import Swal from 'sweetalert2';
import { getDatabase, ref, set } from "firebase/database";
import db from '../firebase';
import Image from 'next/image'
import axios from 'axios';

// Import MicRecorder
const MicRecorder = require('mic-recorder-to-mp3');

const Mp3Recorder = new MicRecorder({ bitRate: 128 });
const OpenAI = require('openai');
const fs = require('fs');
// Initialize the OpenAI client with your API key
const openai = new OpenAI({
  apiKey: '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',
  dangerouslyAllowBrowser: true// This is the default and can be omitted
});

const Minutespage = () => {

  const [listening, setListening] = useState(false);
  const [result, setResult] = useState("");


  const handleStartRecording = () => {
    setListening(true);
    Mp3Recorder.start().then(() => { }).catch((error: any) => {
      console.error(error);
    });
  };
  const handleStopRecording = async () => {
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

          player.play();
          const translations = await openai.audio.translations.create({
            file: file,
            model: 'whisper-1'
          });
          console.log(translations);

        }).catch((e: any) => {
          alert('We could not retrieve your message');
          console.log(e);
        });


    } catch (error) {
      alert('We could not transcribe the audio');
      console.error(error);
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
      const physicsDocRef = doc(db, 'Notes', 'English');
      const dataToUpdate = {

      };
      await updateDoc(physicsDocRef, dataToUpdate);

      const response = await axios.post(
        "https://cors-anywhere.herokuapp.com/https://ihrd1-production.up.railway.app/summary",
        { subject: "English" }
      );

      console.log('Server Response:', response.data);
    } catch (error) {
      console.error('Error adding document: ', error);
    }
    Swal.fire(
      'Good job!',
      'Successfully summarized!',
      'success'
    );
  };

  return (
    <div className="bg-white-80 flex min-h-screen w-full">
      <div
        className="flex w-full  justify-start flex-col bg-[#6e54ff]/80 sm:w-64 m-4 rounded-3xl"
        style={{ flex: 3 }}
      >
        <div className="h-full  px-6 py-4 sm:px-6 lg:px-8">
          <div className="h-full w-full flex flex-col bg-[#eef7ff] rounded">
            <div className='h-full p-3'>
              <h1 className='justify-center flex text-3xl'>Patient Details {""}</h1>
              <img src="https://images.pexels.com/photos/20087121/pexels-photo-20087121/free-photo-of-a-woman-in-a-black-dress-sitting-on-a-chair.jpeg" className="rounded-full w-80 h-80"/>
              <div className='justify-start flex-col   w-fit  p-4  m-5 rounded-xl  bg-white flex text-lg'>
              <h1 className=''>Patient name: Alfred Jimmy {""}</h1>
              <h1 className=''>Age: 21{""}</h1>
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