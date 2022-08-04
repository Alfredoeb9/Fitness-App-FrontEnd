import { BrowserRouter , Routes, Route } from 'react-router-dom'
import Home from "./pages/Home"
import Navbar from './components/Navbar';

import './App.css';
import { useEffect } from 'react';

function App() {


  return (
    <div className="app">
      <BrowserRouter>
        <Navbar />
        <div className='app__pages'>
          <Routes>
            <Route path='/' element={<Home />} />
          </Routes>
        </div>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
