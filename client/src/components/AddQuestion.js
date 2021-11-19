import { useState, useContext } from "react";
import Form from "react-bootstrap/Form";
import TextInputs from "../components/TextInputs";
import Buttons from "../components/Buttons";
// API
import API from "../API/API";
// context
import AppContext from "../store/AppContext";
export default function AddQuestion() {
    const { jwt, setQuestions } = useContext(AppContext);
    const [questText, setQuestText] = useState("");
    const [isAnon, setIsAnon] = useState(true);
    const handleUserInputChange = event => {
        const { name, value } = event.target;
        setQuestText({ ...questText, [name]: value });
    }
    const handleSubmit = async e => {
        e.preventDefault();
        try {
            await API.postQuestion({ questText, isAnon }, jwt)
            const response = await API.getQuestions(jwt);
            setQuestions(response.data.questions);
        } catch (e) {
            console.log(e);
        }
    }
    const toggleIsAnon = value => {
        return !value;
    }
    return (
        <Form onSubmit={handleSubmit} className="p-3">
            <TextInputs
                type={'text'}
                id={'questText'}
                name={'text'}
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
                        Send Anonymous
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
