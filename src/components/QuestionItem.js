import React, { useState } from "react";


function QuestionItem({ question, onDeleteQuestion }) {
  const { id, prompt, answers, correctIndex } = question;
  const [updatedIndex, setUpdatedIndex] = useState(correctIndex)

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  function handleOnChange(event){
    let index = event.target.id
    setUpdatedIndex(index)
    fetch(`http://localhost:4000/questions/${id}`, {
      method:"PATCH", 
      headers:{
        "Content-Type":"application/json"
      }, 
      body:JSON.stringify({"correctIndex": index})
    })
    .then((response) => response.json())
    .then((index) => setUpdatedIndex(index))

  }

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={updatedIndex} onChange={handleOnChange}>{options}</select>
      </label>
      <button onClick={() => onDeleteQuestion(id)}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;