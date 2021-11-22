import { useState, useContext } from "react";
import { useNavigate, Link } from 'react-router-dom';
// components
import Form from "react-bootstrap/Form";
import TextInputs from "../components/TextInputs";
import Buttons from "../components/Buttons";
import { Helmet } from 'react-helmet';
// API
import API from "../API/API";
// context
import AppContext from "../store/AppContext";
export default function Login() {
    const { setQuestions, setJwt, setUser, setAppMsg } = useContext(AppContext);
    const navigate = useNavigate();
    const [login, setLogin] = useState({
        password: '',
        email: '',
    })

    const handleUserInputChange = (event) => {
        const { name, value } = event.target;
        setLogin({ ...login, [name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { email, password } = login;
        const response = await API.postLogin({ email, password });
        if (response && response.status === 200) {
            localStorage.setItem("QA_User", JSON.stringify({
                token: response.data.token,
                user: response.data.user
            }));
            const questions = await API.getQuestions(response.data.token);
            setQuestions(questions.data.questions);
            setJwt(response.data.token);
            setUser(response.data.user);
            navigate('/question');
            setAppMsg({ show: true, variant: "success", text: "Welcome!" });
        } else {
            setAppMsg({ show: true, variant: "danger", text: "Your info doesn't match. Try again." });
        }
    }

    return (
        <>
            <Helmet><title>QuestAnon | Login</title></Helmet>
            <h3 className="text-center">LOGIN</h3>
            <Form onSubmit={handleSubmit}>
                <TextInputs
                    type={'text'}
                    id={'registerEmail'}
                    name={'email'}
                    label={'Email'}
                    placeholder={'user@email.com'}
                    onChange={handleUserInputChange}
                />
                <TextInputs
                    id={'registerPassword'}
                    type={'password'}
                    name={'password'}
                    label={'Password'}
                    placeholder={'Password'}
                    onChange={handleUserInputChange}
                />
                <Buttons
                    variant={'primary'}
                    btnText={'LOGIN'}
                    btnAlign={'text-end my-3'}
                    type={'submit'}
                />
            </Form>
            <p className="text-center">Don't have an account <Link to="/register">Register</Link></p>
        </>
    );
}
