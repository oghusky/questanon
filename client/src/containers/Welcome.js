import React from 'react'
import { Link } from 'react-router-dom'
export default function Welcome() {
    return (
        <div id="welcome">
            <Link className="btn btn-primary" to='/register'>Register</Link>
            <br />
            <br />
            <Link className="btn btn-primary" to='/login'>Login</Link>
        </div>
    )
}
