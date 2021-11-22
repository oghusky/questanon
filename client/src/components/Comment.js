import { useContext } from 'react';
// API
import API from '../API/API';
// context
import AppContext from '../store/AppContext';


export default function Comment({ item, questionId }) {
    const { user, jwt, setComments } = useContext(AppContext);
    const handleDelete = async id => {
        try {
            await API.deleteComment(id, questionId, jwt);
            const response = await API.getComment(questionId, jwt);
            setComments(response.data.comments);
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div key={item._id} className="p-3 question-item">
            <p className="mb-0"><b>{item.author.name.replace(/[^A-Z0-9]/ig, "_").split("__")[0].replace(/[^A-Z0-9]/ig, "").toUpperCase()}</b></p>
            <p className="mb-0"><small><i>{item.createdAt}</i></small></p>
            <p className="mb-1">{item.text}</p>
            {user && user.id === item.author.id ?
                (<button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => handleDelete(item._id)}
                >DELETE
                </button>)
                : null
            }
            <hr />
        </div>
    )
}