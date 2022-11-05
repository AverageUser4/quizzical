import React from 'react';

import WelcomeScreen from './components/WelcomeScreen';
import Quizz from './components/Quizz';

export default function App() {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [availableCategories, setAvailableCategories] =  React.useState([{ id: '', name: 'All' }]);

  const [questionsMetaData, setQuestionsMetaData] = React.useState({
    count: 5,
    category: ''
  });

  React.useEffect(() => {
    fetch('https://opentdb.com/api_category.php')
      .then(response => response.json())
      .then(json => setAvailableCategories(json.trivia_categories))
      .catch(() => window.alert('Unable to get questions. Try again later or refres the page.'));
  }, []);

  function toggleQuizz() {
    setIsPlaying((prev) => !prev);
  }

  return (
    <main className="app">

      {
        isPlaying ? 
        <Quizz
          toggleQuizz={toggleQuizz}
          questionsMetaData={questionsMetaData}
        /> 
        : 
        <WelcomeScreen
          toggleQuizz={toggleQuizz}
          availableCategories={availableCategories}
          questionsMetaData={questionsMetaData}
          setQuestionsMetaData={setQuestionsMetaData}
        />
      }

    </main>
  );
}