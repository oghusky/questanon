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
    const { jwt, setComments, setAppMsg } = useContext(AppContext);
    const [commentText, setCommentText] = useState({ text: "" });
    const [isAnon, setIsAnon] = useState(true);
    const { questionId } = useParams();
    const handleUserInputChange = event => {
        const { name, value } = event.target;
        setCommentText({ ...commentText, [name]: value });
    }
    const handleSubmit = async e => {
        e.preventDefault();
        if (commentText.text) {
            try {
                const post = await API.postComment(questionId, { commentText, isAnon }, jwt);
                if (post.status === 201) {
                    const response = await API.getComment(questionId, jwt);
                    setComments(response.data.comments);
                    setAppMsg({ show: true, variant: "success", text: "Comment added!" });
                }
            } catch (e) {
                setAppMsg({ show: true, variant: "danger", text: "Something went wrong. Try again." });
                console.log(e);
            }
        } else {
            setAppMsg({ show: true, variant: "warning", text: "Text field required. Try again." })
        }
        setCommentText({ text: "" });
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
                value={commentText.text}
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
                    size={'sm'}
                    type={'submit'}
                />
            </div>
        </Form>
    )
}
