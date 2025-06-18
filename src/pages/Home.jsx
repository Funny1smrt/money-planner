import { useState, useEffect } from 'react';
import WorkerList from '../components/WorkerList';
import InputCash from '../components/InputCash';
import CalculateAll from '../hooks/calculateAll';
function Home() {


  return (
    <>
      <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
        <InputCash />
        <WorkerList />
        <CalculateAll />
      </div>
    </>
  );
}

export default Home;