import './login.css'
import { Link } from 'react-router-dom';

function Login() {
    return (
        <>
            <div className='login-container'></div>
            <div className="login">
                <h1>Welcome Back to DrivePlus</h1>
                <p className="subtext">Track your trips, optimize your profits, drive smarter.</p>
                <div className='login-inputs'>
                    <input type="email" placeholder="Email Address" />
                    <input type="password" placeholder="Password" />
                </div>
                <button>Log In</button>

                <p className="signup-link">
                    Don't have an account? <Link to='/signup'>Sign up</Link>
                </p>
            </div>
        </>
    )
}

export default Login;