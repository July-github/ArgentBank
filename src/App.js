import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Header from './components/Header/index';
import Footer from './components/Footer/index';
import Home from './pages/Home/index';

function App() {
  return (
    <div className="App">
      <Router>
        <Header/>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
        </Routes>
        <Footer/>
      </Router>
    </div>
  );
}

export default App;
