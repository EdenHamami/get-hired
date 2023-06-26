import { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import '../App.css';
import * as React from "react";
import { Link, useLocation } from "react-router-dom";
import './TechnicalQuestions.css';

function MyExercises() {

  //all the questions from the server
  const [questions, setQuestions] = useState([]);

  const [questionStatuses, setQuestionStatuses] = useState([]);

  //the questions after changing in search box
  const [filteredQuestions, setFilteredQuestions] = useState([]);

  //get the table from the server
  useEffect(() => {
    axios.post("http://127.0.0.1:3001/technical-questions").then((response) => {
      setQuestions(response.data);
    });
  }, []);

  useEffect(() => {
    fetchQuestionStatuses();
  }, [questions]);

  const fetchQuestionStatuses = async () => {

    for (let i = 0; i < questions.length; i++) {
      try {
        console.log(questions[i])
        const res = await axios.post(`http://127.0.0.1:3001/is_succeed`, { question_id: questions[i]._id },
          { headers: { 'Authorization': `${localStorage.getItem('token')}` } });
        if (res.data.message == false) {
          setQuestionStatuses(prevStatuses => [...prevStatuses, { question_id: questions[i]._id, status: 1 }]);
          setFilteredQuestions(prevQuestions => [...prevQuestions, questions[i]])
        } else {
          setQuestionStatuses(prevStatuses => [...prevStatuses, { question_id: questions[i]._id, status: 2 }]);
          setFilteredQuestions(prevQuestions => [...prevQuestions, questions[i]])
        }
      } catch (error) {
        setQuestionStatuses(prevStatuses => [...prevStatuses, { question_id: questions[i]._id, status: 0 }]);
      }
    }
    console.log(questionStatuses)
  };

  return (

    <div className="questions-container">
      <div className="questions-image-container"></div>
      <div className="questions-content-container">
        <table className="table questions-table">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Topic</th>
              <th scope="col">Difficulty</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredQuestions
              .filter(question => {
                const foundStatus = questionStatuses.find(q => q.question_id === question._id);
                return foundStatus ? foundStatus.status !== 0 : true;
              }).map(question => (
              <tr key={question.id}>
                <th className="question-name" scope="row"><Link to="/online_compiler" className="question-name" state={question}>{question.title}</Link></th>
                <td>{question.types.map((type, index) => (
                  <div className="question-topic" key={index}>{type.name}</div>
                ))}</td>
                <td>{question.difficultyLevel}</td>
                <td>
                  {questionStatuses.find((q) => q.question_id === question._id) ? (
                    questionStatuses.find((q) => q.question_id === question._id).status === 1 ? (
                      "solved wrong"
                    ) : questionStatuses.find((q) => q.question_id === question._id).status === 0 ? (
                      "not solved"
                    ) : questionStatuses.find((q) => q.question_id === question._id).status === 2 ? (
                      "solved correctly"
                    ) : (
                      "Loading..."
                    )
                  ) : (
                    "Loading..."
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MyExercises;