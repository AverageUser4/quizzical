import React from 'react';

import WelcomeScreen from './components/WelcomeScreen';
import Quizz from './components/Quizz';

export default function App() {
  const [isPlaying, setIsPlaying] = React.useState(false);

  function toggleQuizz() {
    setIsPlaying((prev) => !prev);
  }

  return (
    <main className="app">

      {
        isPlaying ? 
        <Quizz
          toggleQuizz={toggleQuizz}
        /> 
        : 
        <WelcomeScreen
          toggleQuizz={toggleQuizz}
        />
      }

    </main>
  );
}