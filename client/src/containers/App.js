import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import { useState, useEffect } from 'react';
import './App.css';
// containers
import Navigation from '../components/Navigation';
import Welcome from './Welcome';
import Login from '../containers/Login';
import Register from '../containers/Register';
import Questions from './Questions';
// context
import AppContext from '../store/AppContext';
function App() {
  // state
  const [user, setUser] = useState({});
  const [jwt, setJwt] = useState("");
  const [questions, setQuestions] = useState([]);
  const state = {
    user, setUser,
    jwt, setJwt,
    questions, setQuestions
  };
  // useeffect
  useEffect(() => {
    if (localStorage.getItem("QA_User")) {
      setJwt(JSON.parse(localStorage.getItem("QA_User")).token);
      setUser(JSON.parse(localStorage.getItem("QA_User")).user);
    } else {
      setJwt("");
      setUser({});
    }
  }, [])

  return (
    <Router>
      <AppContext.Provider value={state}>
        <Navigation />
        <Routes>
          <Route exact path="/" element={<Welcome />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/question" element={<Questions />} />
        </Routes>
      </AppContext.Provider>
    </Router>
  );
}

export default App;
