import { useContext, useEffect } from 'react';
import AddQuestion from '../components/AddQuestion';
import Question from '../components/Question';
import API from '../API/API';
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
            <AddQuestion />
            {questions.map(item => (
                <Question item={item} key={item._id} />
            )).reverse()}
        </div>
    )
}
