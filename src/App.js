// import logo from './logo.svg';
import { Route, BrowserRouter , Routes } from 'react-router-dom';
import './App.css';
import Login from './components/login/login.tsx';
import Register from './components/register/register.tsx';
import NotFoundPage from './components/notFoundPage/NotFoundPage.tsx';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Routes>
        <Route path='/' Component={()=><Login/>}/> {/* Login page route */}
          <Route path="/register" Component={() => <Register />} /> {/* Register page route */}
          <Route path='/*' Component={() =><NotFoundPage/>} />{/* 404 page route */}
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
