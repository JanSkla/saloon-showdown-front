import logo from './logo.svg';
import './App.css';
import { Route, Routes } from '../node_modules/react-router-dom/dist/index';
import MainPage from './pages/MainPage';
import GamePage from './pages/GamePage';
import NoPage from './pages/NoPage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<MainPage/>}/>
        <Route path="/game" element={<GamePage/>}/>
        <Route path='*' element={<NoPage/>} />
      </Routes>
    </div>
  );
}

export default App;
