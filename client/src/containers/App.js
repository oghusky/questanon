import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import './App.css';
// containers
import ProtectedRoute from '../components/ProtectedRoute';
import Navigation from '../components/Navigation';
import Register from '../containers/Register';
import MsgDiv from '../components/MsgDiv';
import Login from '../containers/Login';
import Questions from './Questions';
import Comments from './Comments';
import Welcome from './Welcome';
// context
import AppContext from '../store/AppContext';
function App() {
  // state
  const [questions, setQuestions] = useState([]);
  const [comments, setComments] = useState([]);
  const [appMsg, setAppMsg] = useState({});
  const [user, setUser] = useState({});
  const [jwt, setJwt] = useState("");
  // state object
  const state = {
    questions, setQuestions,
    comments, setComments,
    appMsg, setAppMsg,
    user, setUser,
    jwt, setJwt
  };
  // useeffect
  // check if user logged in
  useEffect(() => {
    if (localStorage.getItem("QA_User")) {
      setJwt(JSON.parse(localStorage.getItem("QA_User")).token);
      setUser(JSON.parse(localStorage.getItem("QA_User")).user);
    } else {
      setJwt("");
      setUser({});
    }
  }, [])
  // sets alert to blank on load
  useEffect(() => {
    setAppMsg({ show: false, variant: "success", text: "" })
    // eslint-disable-next-line
  }, [])
  // hides alert after 2 seconds
  useEffect(() => {
    if (appMsg.show) {
      const hideDiv = setTimeout(() => {
        return setAppMsg({
          show: false,
          variant: "",
          text: ""
        });
      }, 2000);
      return () => {
        clearTimeout(hideDiv)
      }
    }
  }, [appMsg]);
  return (
    <Router>
      <Helmet>
        <title>QuestAnon</title>
      </Helmet>
      <AppContext.Provider value={state}>
        <Navigation />
        <MsgDiv appMsg={appMsg} />
        <Routes>
          <Route exact path="/" element={<Welcome />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/question" element={
            <ProtectedRoute>
              <Questions />
            </ProtectedRoute>
          } />
          <Route exact path="/questionid_:questionId" element={
            <ProtectedRoute>
              <Comments />
            </ProtectedRoute>
          } />
        </Routes>
      </AppContext.Provider>
    </Router>
  );
}

export default App;
