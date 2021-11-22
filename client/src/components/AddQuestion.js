import { useState, useContext } from "react";
import Form from "react-bootstrap/Form";
import TextInputs from "../components/TextInputs";
import Buttons from "../components/Buttons";
// API
import API from "../API/API";
// context
import AppContext from "../store/AppContext";
export default function AddQuestion() {
    const { jwt, setQuestions, setAppMsg } = useContext(AppContext);
    const [questText, setQuestText] = useState({ text: "" });
    const [isAnon, setIsAnon] = useState(true);
    const handleUserInputChange = event => {
        const { name, value } = event.target;
        setQuestText({ ...questText, [name]: value });
    }
    const handleSubmit = async e => {
        e.preventDefault();
        if (questText.text) {
            try {
                await API.postQuestion({ questText, isAnon }, jwt)
                const response = await API.getQuestions(jwt);
                setQuestions(response.data.questions);
                setAppMsg({ show: true, variant: "success", text: "Question added" });
            } catch (e) {
                setAppMsg({ show: true, variant: "danger", text: "Something went wrong. Try again." });
                console.log(e);
            }
        } else {
            setAppMsg({ show: true, variant: "warning", text: "Text field required. Try again." })
        }
        setQuestText({ text: "" })
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
                value={questText.text}
                label={'Submit Question'}
                placeholder={"Here's my question: "}
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
