import './header.css'
import Logo from '../../images/logo.png'
import Button from 'react-bootstrap/Button';

function Header() {
    return (
        <div className="header">
            <div className='header-logo'>
                <img src={Logo} />
            </div>
            <div className='logout-container'>
                <Button className='logout-btn' variant="outline-light">
                    <i class="bi bi-box-arrow-left"></i>
                    {"\u00A0"}
                    {"\u00A0"}
                    <h4 className='logout'>Logout</h4>
                </Button>
            </div>
        </div>
    )
}

export default Header;