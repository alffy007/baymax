import React from 'react';
import { Player, Controls } from '@lottiefiles/react-lottie-player';

interface MyObject {
  isvisible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  // other properties
}

const Model = ({ isvisible, onClose ,children}: MyObject) => {
  if (!isvisible) return null;


  return (
    <div className='z-10 fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center ' id='wrapper' >
  <Player
  autoplay
  loop
  src="https://lottie.host/5a8476e9-0fb4-4b00-98a8-0e06cd29eee5/yn5NmM8wLS.json"
  style={{ height: '300px', width: '300px' }}
>
  <Controls visible={false} buttons={['play', 'repeat', 'frame', 'debug']} />
</Player>
    </div>
  );
};

export default Model;
