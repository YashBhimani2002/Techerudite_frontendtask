// import logo from './logo.svg';
import { Route, BrowserRouter , Routes } from 'react-router-dom';
import './App.css';
import Login from './components/login/login.tsx';
import Register from './components/register/register.tsx';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Routes>
        <Route path='/' Component={()=><Login/>}/>
        <Route path="/register" Component={()=><Register/>}/>
        <Route path='/*' Component={()=><div>404</div>}/>
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
