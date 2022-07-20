import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// components
import Form from 'react-bootstrap/Form';
import TextInputs from '../components/TextInputs';
import Buttons from '../components/Buttons';
import { Helmet } from 'react-helmet';
// API
import API from '../API/API';
// context
import AppContext from '../store/AppContext';
export default function Register() {
    const { setAppMsg } = useContext(AppContext);
    const navigate = useNavigate();
    const [register, setRegister] = useState({
        password: '',
        email: '',
    })

    const handleUserInputChange = (event) => {
        const { name, value } = event.target;
        setRegister({ ...register, [name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { email, password } = register;
        const response = await API.postRegister({ email, password });
        if (response.status === 201) {
            setAppMsg({ show: true, variant: "success", text: "Registration success!" });
            navigate('/login');
        } else {
            setAppMsg({ show: true, variant: "danger", text: "Somthing went wrong. Try again." });
        }
    }

    return (
        <>
            <Helmet><title>QuestAnon | Register</title></Helmet>
            <h3 className="text-center">REGISTER</h3>
            <Form onSubmit={handleSubmit}>
                <TextInputs
                    type={'email'}
                    id={'registerEmail'}
                    name={'email'}
                    label={'Email'}
                    placeholder={'user@bloopco.io'}
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
                    btnText={'REGISTER'}
                    btnAlign={'text-end my-3'}
                    type={'submit'}
                />
            </Form>
            <p className="text-center">Have an account <Link to="/login">Login</Link></p>
        </>
    )
}
