import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// context
import AppContext from '../store/AppContext';
// components
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

export default function Navigation() {
    const navigate = useNavigate();
    const { user, setUser, setJwt } = useContext(AppContext);
    const handleLogout = async () => {
        localStorage.setItem("QA_User", "");
        setUser({});
        setJwt("");
        navigate('/login');
    }
    return (
        <Navbar className="navbar navbar-expand-md navbar-light bg-light">
            <Container>
                <Link className="navbar-brand" to="/question">QuestAnon</Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                    <Nav>
                        {user && user.email ? (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/question">Questions</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="#" className="nav-link">Hi {user.realName}!</Link>
                                </li>
                                <li className="nav-item"
                                    onClick={() => handleLogout()}
                                >
                                    {/* eslint-disable */}
                                    <a href="#" className="nav-link">
                                        LOGOUT
                                    </a>
                                    {/* eslint-enable */}
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <Link to="/" className="nav-link">LOGIN/REGISTER</Link>
                                </li>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}
