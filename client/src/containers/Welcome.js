import React from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet';
export default function Welcome() {
    return (
        <div id="welcome">
            <Helmet><title>QuestAnon | Welcome</title></Helmet>
            <Link className="btn btn-primary" to='/register'>Register</Link>
            <br />
            <br />
            <Link className="btn btn-primary" to='/login'>Login</Link>
        </div>
    )
}
