import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import SignupLogin from './components/SignupLogin/SignupLogin';
import Welcome from './components/SignupLogin/Welcome';
import { useSelector } from 'react-redux';
import Send from './components/SignupLogin/Email/Send';
import ReadMsg from './components/SignupLogin/Email/ReadMsg';

function App() {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  console.log(isLoggedIn);
  
  return (
    <div className="App" style={{backgroundColor: 'white',width: '100%', height: '100%', margin: 0, padding: 0}}>
     <Routes>
      <Route path='/' element={isLoggedIn ? <Welcome /> : <SignupLogin />} />
      <Route path='/send' element={isLoggedIn ? <Send /> : <SignupLogin />} />
      <Route path='/message/:id' element={isLoggedIn ? <ReadMsg /> : <SignupLogin />} />
     </Routes>
    </div>
  );
}

export default App;
