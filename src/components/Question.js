import React from 'react';

export default function Question(props) {
  function decodeHTML(text) {
    const ta = document.createElement('textarea');
    ta.innerHTML = text;
    return ta.value;
  }

  const answerElements = props.answers.map((answer) => {
    return (
      <li key={Math.random()}>
        <button className="answer">{decodeHTML(answer)}</button>
      </li>
    );
  });

  return (
    <div className="question">

      <h4 className="question__text">{decodeHTML(props.question)}</h4>

      <ul className="question__answers">

        {answerElements}

      </ul>

    </div>
  )
}