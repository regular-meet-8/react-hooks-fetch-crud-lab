
import React, { useEffect, useState } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {

  const [questions, setQuestions] = useState([])

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((res) => res.json())
      .then((questions) => setQuestions(questions))

  }, [])

  function deleteQuestion(id) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",

    })
    .then((resonse) => resonse.json())
    .then((q) => {
      const updatedList = questions.filter((question) => question.id !== id)
      setQuestions(updatedList)
    })

  }


  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
      {
        questions.map((question) => (
          <QuestionItem key={question.id} question={question} onDeleteQuestion={deleteQuestion}/>
        ))
      }
      </ul>
    </section>
  );
}

export default QuestionList;