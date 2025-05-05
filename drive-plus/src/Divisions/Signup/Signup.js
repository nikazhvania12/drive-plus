import './signup.css'
import { Link } from 'react-router-dom';

function Signup() {
    return (
        <>
            <div className='signup-container'></div>
            <div className="signup">
                <h1>Welcome to DrivePlus</h1>
                <p className="subtext">Track your trips, optimize your profits, drive smarter.</p>
                <form className='signup-form'>
                    <input placeholder="Name" />
                    <input placeholder="Last Name" />
                    <input type="email" placeholder="Email Address" />
                    <input type="password" placeholder="Password" />
                    <button type="submit">Sign Up</button>
                </form>

                <p className="login-link">
                    Already have an account? <Link to="/login">Log In</Link>
                </p>
            </div>
        </>
    )
}

export default Signup;