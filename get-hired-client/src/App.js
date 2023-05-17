
import {useEffect} from "react";
import axios from "axios";
import './App.css';
import JobsSearch from './jobs/JobsSearch';
import RegistrationPage from "./RegistrationPage";
import JobsSearchResult from "./jobs/JobsSearchResult"; 
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
function App() {
  useEffect(() => {
    axios.post('http://127.0.0.1:3001/login', { username: 'john', password: '123456' }).then(res => {
      console.log(res);
    });
  }, []);

  const register = () => {
    axios.post('http://127.0.0.1:3001/register', { username: 'john1', password: '123456' }).then(res => {
      console.log(res);
    });
  };

  return (
    <div className='App'>
    <Routes>
    <Route path="/" element={<JobsSearch />} />
        <Route path="/JobsSearchResult" element={<JobsSearchResult />} />
      </Routes>
      
     </div>
    // <div className="App">
    //   <header className="App-header">
    //     <button onClick={register}>Click</button>
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       wow!
    //     </a>
    //   </header>
    // </div>
  );
}

export default App;
