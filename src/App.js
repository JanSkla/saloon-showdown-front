import './App.css';
import { Route, Routes } from '../node_modules/react-router-dom/dist/index';
import MainPage from './pages/MainPage';
import GamePage from './pages/GamePage';
import NoPage from './pages/NoPage';
import { WebsocketProvider } from './utilComponents/WebsocketProvider';

function App() {
  return (
    <div className="App">
      
      <WebsocketProvider>
      <Routes>
        <Route path="/" element={<MainPage/>}/>
        <Route path="/game" element={<GamePage/>}/>
        <Route path='*' element={<NoPage/>} />
      </Routes>
      </WebsocketProvider>
    </div>
  );
}

export default App;
