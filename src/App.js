import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import SignupLogin from './components/SignupLogin/SignupLogin';
import Welcome from './components/SignupLogin/Welcome';
import { useSelector } from 'react-redux';

function App() {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  return (
    <div className="App">
     <Routes>
      <Route path='/' element={isLoggedIn ? <Welcome /> : <SignupLogin />} />
     </Routes>
    </div>
  );
}

export default App;
