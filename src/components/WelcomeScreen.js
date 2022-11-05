import React from 'react';

export default function WelcomeScreen(props) {
  return (
    <div className="welcome-screen">

      <h1>Quizzical</h1>

      <span className="welcome-screen__desc">The Best Quizzes On The Internet</span>

      <button
        className="button"
        onClick={props.toggleQuizz}
      >Start Quiz</button>

    </div>
  );
}