import { useContext, useEffect } from 'react';
// components
import AddQuestion from '../components/AddQuestion';
import Question from '../components/Question';
import { Helmet } from 'react-helmet';
// API
import API from '../API/API';
// context
import AppContext from '../store/AppContext';
export default function Questions() {
    const { user, jwt, questions, setQuestions } = useContext(AppContext);
    useEffect(() => {
        if (jwt) getQuestions(jwt);
        // eslint-disable-next-line
    }, [jwt, user])

    const getQuestions = async jwt => {
        const response = await API.getQuestions(jwt);
        setQuestions(response.data.questions)
    }

    return (
        <div>
            <Helmet><title>QuestAnon | {user?.realName ?? null}'s Questions</title></Helmet>
            <AddQuestion />
            {questions.map(item => (
                <Question item={item} key={item._id} />
            )).reverse()}
        </div>
    )
}
