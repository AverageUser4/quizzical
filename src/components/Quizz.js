import React from 'react';

import Question from './Question';

export default function Quizz(props) {
  const [questions, setQuestions] = React.useState([]);
  
  React.useEffect(() => {
    fetch('https://opentdb.com/api.php?amount=10')
      .then((response) => response.json())
      .then((json) => setQuestions(json.results));
  }, []);

  const questionElements = questions.map((question) => {
    return (
      <Question
        key={Math.random()}
        question={question.question}
        answers={[...question.incorrect_answers, question.correct_answer]}
      />
    );
  });
  

  return (
    <div className="quizz">

      {questionElements}

      <button 
        className="button button--small quizz__button"
        onClick={props.toggleQuizz}
      >Check Answers</button>

    </div>
  );
}