import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './Divisions/Login/Login';
import Signup from './Divisions/Signup/Signup';
import Home from './Divisions/Home/Home';
import Header from './Divisions/Header/Header';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
      <BrowserRouter>
          <Header />
          <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/login' element={<Login />} />
              <Route path='/signup' element={<Signup />} />
          </Routes>
      </BrowserRouter>
  );
}

export default App;
