import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Footer from './components/Footer/index';
import Home from './pages/Home/index';
import Login from './pages/Login/index';
import Profile from './pages/Profile/index';
import Error from './pages/Error/index'

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/profile' element={<Profile/>}></Route>
          <Route path='/*' element={<Error/>}></Route>
        </Routes>
        <Footer/>
      </Router>
    </div>
  );
}

export default App;