import { useContext } from 'react'
// API
import API from '../API/API';
// context
import AppContext from '../store/AppContext';
export default function Question(props) {
    const { jwt, setQuestions } = useContext(AppContext);
    const { item } = props;
    const handleDelete = async id => {
        try {
            const response = await API.deleteQuestion(id, jwt)
            if (response.status === 200) {
                const newQuestions = await API.getQuestions(jwt);
                setQuestions(newQuestions.data.questions);
            }
        } catch (e) {
            console.log(e)
        }
    }
    return (
        <div key={item._id} className="p-3 question-item">
            <p className="mb-0"><b>{item.author.name.replace(/[^A-Z0-9]/ig, "_").split("__")[0].replace(/[^A-Z0-9]/ig, "").toUpperCase()}</b></p>
            <p className="mb-0"><small><i>{item.createdAt}</i></small></p>
            <p className="mb-1">{item.text}</p>
            <button
                className="btn btn-outline-danger"
                onClick={() => handleDelete(item._id)}
            >DELETE</button>
            <hr />
        </div>
    )
}
