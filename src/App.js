import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import SignupLogin from './components/SignupLogin/SignupLogin';
import Welcome from './components/SignupLogin/Welcome';
import { useSelector } from 'react-redux';
import Send from './components/SignupLogin/Email/Send';
import ReadMsg from './components/SignupLogin/Email/ReadMsg';
import Sentbox from './components/SignupLogin/Email/Sentbox';
import ReadSentMsg from './components/SignupLogin/Email/ReadSentMsg';

function App() {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  console.log(isLoggedIn);
  
  return (
    <div className="App" style={{backgroundColor: 'white',width: '100%', height: '100%', margin: 0, padding: 0}}>
     <Routes>
      <Route path='/' element={isLoggedIn ? <Welcome /> : <SignupLogin />} />
      <Route path='/send' element={isLoggedIn ? <Send /> : <SignupLogin />} />
      <Route path='/sentbox' element={isLoggedIn ? <Sentbox /> : <SignupLogin />} />
      <Route path='/message/:id' element={isLoggedIn ? <ReadMsg /> : <SignupLogin />} />
      <Route path='/sentmessage/:id' element={isLoggedIn ? <ReadSentMsg /> : <SignupLogin />} />
     </Routes>
    </div>
  );
}

export default App;
