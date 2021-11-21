import { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import Form from "react-bootstrap/Form";
import TextInputs from "../components/TextInputs";
import Buttons from "../components/Buttons";
// API
import API from "../API/API";
// context
import AppContext from "../store/AppContext";

export default function AddComment() {
    const { questionId } = useParams();
    const { jwt, setComments } = useContext(AppContext);
    const [commentText, setCommentText] = useState("");
    const [isAnon, setIsAnon] = useState(true);
    const handleUserInputChange = event => {
        const { name, value } = event.target;
        setCommentText({ ...commentText, [name]: value });
    }
    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const post = await API.postComment(questionId, { commentText, isAnon }, jwt);
            if (post.status === 201) {
                const response = await API.getComment(questionId, jwt);
                setComments(response.data.comments);
            }
        } catch (e) {
            console.log(e);
        }
    }
    const toggleIsAnon = value => {
        return !value;
    }
    return (
        <Form onSubmit={handleSubmit}>
            <TextInputs
                type={'text'}
                id={'questText'}
                name={'text'}
                label={'Submit Comment'}
                placeholder={"Here's my comment: "}
                onChange={handleUserInputChange}
            />
            <div className='d-flex justify-content-between my-3'>
                <div className="form-check">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        name="isAnon"
                        id="isAnon"
                        checked={isAnon}
                        onChange={() => setIsAnon(toggleIsAnon)}
                    />
                    <label
                        className="form-check-label"
                        htmlFor="isAnon">
                        Send Anonymously?
                    </label>
                </div>
                <Buttons
                    variant={'primary'}
                    btnText={'SUBMIT'}
                    btnAlign={'text-end'}
                    size={''}
                    type={'submit'}
                />
            </div>
        </Form>
    )
}
