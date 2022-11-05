import React from 'react';

export default function WelcomeScreen(props) {
  const categoryElements = props.availableCategories.map((category) => {
    return (
      <option 
        key={category.id}
        value={category.id}
      >
        {category.name}
      </option>
    );
  });

  function changeCategory(event) {
    props.setQuestionsMetaData((prev) => ({
      ...prev, category: event.target.value
    }));
  }

  function questionsCountHandler(event) {
    let count = parseInt(event.target.value);
    count = Math.min(Math.max(count, 5), 50);
    count = Number.isNaN(count) ? 5 : count;
    props.setQuestionsMetaData((prev) => ({ ...prev, count }));
  }

  return (
    <div className="welcome-screen">

      <h1>Quizzical</h1>

      <span className="welcome-screen__desc">The Best Quizzes On The Web</span>

      <button
        className="button"
        onClick={props.toggleQuizz}
      >Start Quiz</button>

      <form className="welcome-screen__options">

        <select
          value={props.questionsMetaData.category}
          onChange={changeCategory}
        >
          <option value="">All</option>
          {categoryElements}
        </select>

        <input 
          type="number"
          value={props.questionsMetaData.count}
          onChange={questionsCountHandler}
        />

      </form>

    </div>
  );
}