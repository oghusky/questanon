import React from 'react';

const AppContext = React.createContext({
    jwt: "",
    setJwt: function () { },
    user: {},
    setUser: () => { },
    questions: [],
    setQuestions: () => { },
    appMsg: "",
    setAppMsg: () => { },
    comments: [],
    setComments: () => { }
});

export default AppContext;