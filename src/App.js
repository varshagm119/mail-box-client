import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import SignupLogin from './components/SignupLogin/SignupLogin';

function App() {
  return (
    <div className="App">
     <Routes>
      <Route path='/' element={<SignupLogin />} />
     </Routes>
    </div>
  );
}

export default App;
