import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import SignupLogin from './components/SignupLogin/SignupLogin';
import Welcome from './components/SignupLogin/Welcome';
import { useSelector } from 'react-redux';
import Send from './components/SignupLogin/Email/Send';

function App() {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  return (
    <div className="App" style={{backgroundColor: 'black'}}>
     <Routes>
      <Route path='/' element={isLoggedIn ? <Welcome /> : <SignupLogin />} />
      <Route path='/send' element={isLoggedIn ? <Send /> : <SignupLogin />} />
     </Routes>
    </div>
  );
}

export default App;
