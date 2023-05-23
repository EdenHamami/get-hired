import {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import '../App.css';
import * as React from "react";
import { Link, useLocation} from "react-router-dom";
import './PersonalQuestion.css';

function PersonalQuestion() {

  const location = useLocation();
  const data = location.state;

  const [showSolution, setShowSolution] = useState(false);

  //show the solution
  const handleButtonClickSolution = () => {
    setShowSolution(!showSolution);
  };

  const [question, setQuestion] = useState('');
  const [name, setName] = useState('');
  const [goal, setgoal] = useState('');
  const [recommendedAnswer, setRecommendedAnswer] = useState('');
  const [exampleAnswer, serExampleAnswer] = useState('');

    useEffect(() => {
      console.log(data)
      const problemId =data._id; // Replace with the actual problemId
      console.log(problemId)
  axios.post(`http://127.0.0.1:3001/personal-question/${problemId}`).then(res => {
    console.log(res.data)
    setQuestion(res.data.question);
    setName(res.data.name);
    setgoal(res.data.goal);
    setRecommendedAnswer(res.data.recommended_answer);
    serExampleAnswer(res.data.example_answer);
        
      });
    },[location]); 

  return (
 
    <div className="PersonalQuestion">
      <div className="part-1">
      <div className="name">
         <h4> {name}</h4>
         </div>
         <div className="Question">
   <h5> Question</h5>
   <h6> {question}</h6>
   </div>
   <div className="Goal">
   <h5> Goal: </h5>
   <h6>{goal}</h6>
   </div>
   </div>
    


    {showSolution ? (
      <div>
      <h5> Recommended answer</h5>
      <h6> {recommendedAnswer}</h6>
      <h5> Example answer</h5>
      <h6> {exampleAnswer}</h6>
      </div>
    ) : (
      <button onClick={handleButtonClickSolution}>Solution</button>
    )}
   </div>
  );
}
export default PersonalQuestion;
