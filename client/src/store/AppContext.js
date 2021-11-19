import React from 'react';

const AppContext = React.createContext({
    jwt: "",
    setJwt: function () { },
    user: {},
    setUser: () => { },
    questions: [],
    setQuestions: () => { }
})

export default AppContext;