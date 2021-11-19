import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// components
import Form from 'react-bootstrap/Form';
import TextInputs from '../components/TextInputs';
import Buttons from '../components/Buttons';
import { Helmet } from 'react-helmet';
// API
import API from '../API/API';
export default function Register() {
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
        if (response.status === 201) navigate('/login');
    }

    return (
        <>
            <Helmet><title>QuestAnon | Register</title></Helmet>
            <Form onSubmit={handleSubmit}>
                <TextInputs
                    type={'email'}
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
                    btnText={'REGISTER'}
                    btnAlign={'text-end my-3'}
                    type={'submit'}
                />
            </Form>
            <p className="text-center">Have an account <Link to="/login">Login</Link></p>
        </>
    )
}
