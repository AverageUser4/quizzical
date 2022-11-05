import React from 'react';

export default function Question(props) {
  function decodeHTML(text) {
    const ta = document.createElement('textarea');
    ta.innerHTML = text;
    return ta.value;
  }

  const answerElements = props.questionData.answers.map((answer, index) => {
    let className = "answer";
    className += answer.isChosen ? ' answer--chosen' : '';
    if(props.quizzOver) {
      className += ' answer--disabled';
      className += answer.isCorrect ? ' answer--correct' : '';
      className += !answer.isCorrect && answer.isChosen ? ' answer--wrong' : '';
    }

    return (
      <li key={Math.random()}>

        <button
          className={className}
          onClick={() => props.quizzOver ? () => 1 : 
            props.chooseAnswer(props.questionData.index, index)}
        >
          {decodeHTML(answer.text)}
        </button>

      </li>
    );
  });

  return (
    <div className="question">

      <h4 className="question__text">
        {decodeHTML(props.questionData.question)}
        {!props.questionData.answers.some((a) => a.isChosen) && 
          <span className="question__unanswered-mark">*</span>}
      </h4>

      <ul className="question__answers">

        {answerElements}

      </ul>

    </div>
  )
}