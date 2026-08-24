import React, { useState } from 'react';
import EntryScreen from './components/EntryScreen';
import Garage from './components/Garage';

export default function App() {
  const [hasEntered, setHasEntered] = useState(false);

  return (
    <>
      {!hasEntered && (
        <EntryScreen onEnterGarage={() => setHasEntered(true)} />
      )}
      <Garage />
    </>
  );
}
