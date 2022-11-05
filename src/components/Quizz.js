import React from 'react';

import Question from './Question';

/*
  - add ability to choose category
*/

export default function Quizz(props) {
  const [questionsData, setQuestionsData] = React.useState([]);
  const [quizzOver, setQuizzOver] = React.useState(false);
  const [confirmationModalVisible, setConfirmationModalVisible] = React.useState(false);

  React.useEffect(() => {
    populateWithNewQuestions();
  }, []);

  React.useEffect(() => {
    const toggle = (event) => {
      if(event.key !== 'Escape')
        return;
      
      if(quizzOver)
        props.toggleQuizz();
      else
        setConfirmationModalVisible((prev) => !prev);
    }

    window.addEventListener('keydown', toggle);

    return () => window.removeEventListener('keydown', toggle);
  }, [quizzOver]);

  const questionElements = questionsData.map((questionData) => {
    return (
      <Question
        key={Math.random()}
        questionData={questionData}
        quizzOver={quizzOver}
        chooseAnswer={chooseAnswer}
      />
    );
  })
  
  function randomiseArray(array) {
    const copy = [...array];
    const randomised = [];

    while(copy.length)
      randomised.push(copy.splice(Math.floor(Math.random() * copy.length), 1)[0]);

    return randomised;
  }

  function populateWithNewQuestions() {
    setQuestionsData([]);
    setQuizzOver(false);

    let url = `https://opentdb.com/api.php?amount=${props.questionsMetaData.count}`;
    url += props.questionsMetaData.category ? `&category=${props.questionsMetaData.category}` : '';

    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        const newQuestions = json.results.map((q, index) => {
          const temp = [...q.incorrect_answers, q.correct_answer];
          let answers = [];
      
          for(let i = 0; i < temp.length; i++) {
            answers.push({
              text: temp[i],
              isCorrect: i === temp.length - 1,
              isChosen: false
            });
          }
      
          answers = randomiseArray(answers);
      
          const questionData = {
            index: index,
            question: q.question,
            answers: answers
          }
      
          return questionData;
        });

        setQuestionsData(newQuestions)
      });
  }

  function chooseAnswer(questionIndex, answerIndex) {
    setQuestionsData((prevQuestionsData) => {
      return prevQuestionsData.map((questionData) => {
        const updatedAnswers = [];
        const a = questionData.answers;
        for(let i = 0; i < a.length; i++) {
          updatedAnswers.push({
            ...a[i],
            isChosen: i === answerIndex
          });
        }

        return questionData.index !== questionIndex ? 
          questionData :
          {
            ...questionData,
            answers: updatedAnswers
          }
      });
    });
  }

  function areAllChosen() {
    return questionsData.every(data => data.answers.some(answer => answer.isChosen));
  }

  function checkAnswers() {
    if(!areAllChosen)
      return

    setQuizzOver(true);
  }

  function getScore() {
    let score = 0;
    for(let questionData of questionsData)
      score += questionData.answers.find((a) => a.isChosen && a.isCorrect) ? 1 : 0;

    return score;
  }

  function startNewQuizz() {
    if(quizzOver || confirmationModalVisible)
      props.toggleQuizz();
    else
      setConfirmationModalVisible(true);
  }

  return (
    <div className="quizz">

      {confirmationModalVisible && 
        <div className="confirmation-modal">

          <h1>Are you sure you want to quit?</h1>

          <div className="confirmation-modal__buttons">

            <button className="button" onClick={startNewQuizz}>Yes, I really mean it</button>
            <button className="button" onClick={() => setConfirmationModalVisible(false)}>No, it was a mistake</button>

          </div>

        </div>
      }

      {questionsData.length === 0 ? <h1 style={{textAlign: 'center'}}>Loading...</h1> : questionElements}

      {questionsData.length > 0 &&

        <div className="quizz__bottom">

          {quizzOver && <h5>You scored {getScore()} / {questionsData.length} correct answers</h5>}

          {
            quizzOver ?
              <>
                <button 
                  className={`button button--small`}
                  onClick={populateWithNewQuestions}
                  >
                  Play again
                </button>
              </>
            :
              <button 
                className={`button button--small ${areAllChosen() ? '' : 'button--disabled'}`}
                onClick={areAllChosen() ? checkAnswers : () => 1}
              >
                Check answers
              </button>
          }

          <button 
            className={`button button--small`}
            onClick={startNewQuizz}
          >
            New quizz
          </button>

        </div>
        
      }

    </div>
  );
}

  /*
    questionsData structure:
    [
      {
        index: integer,
        question: string,
        answers: [
          {
            text: string,
            isCorrect: bool,
            isChosen: bool
          }
        ]
      }
    ]
  */