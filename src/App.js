import './App.css';
import { Route, Routes } from '../node_modules/react-router-dom/dist/index';
import MainPage from './pages/MainPage';
import GamePage from './pages/GamePage';
import NoPage from './pages/NoPage';
import { WebsocketProvider } from './utilComponents/WebsocketProvider';
import LobbyPage from './pages/LobbyPage';
import GameOverPage from './pages/GameOverPage';
import GameWrapperPage from './pages/GameWrapperPage';
import { RoomDataProvider } from './utilComponents/RoomDataProvider';
import JoinPage from './pages/JoinPage';
import MainPageWrapper from './pages/MainPageWrapper';
import { Suspense, useEffect, useState } from 'react';
import { FadeProvider } from './utilComponents/FadeScreenProvider';

function App() {

  const [opacity, setOpacity] = useState(1);

  const isPhone = typeof window.orientation !== 'undefined';

  useEffect(() => {
    if(isPhone && window.innerWidth < window.innerHeight){
      setTimeout(() => setOpacity(0), 5000)
    }
    else{
      setOpacity(false)
    }
  }, []);

  return (
    <div className="App">    
      <WebsocketProvider>
        <RoomDataProvider>
          <FadeProvider>
            {opacity !== false && <div style={{position: 'absolute', height: '100%', width: '100%', background: '#000000cc', zIndex: 1, opacity: opacity, transition: 'opacity 1.6s ease-in-out', pointerEvents: 'none'}}>  
              <img src="/images/rotate_t.gif" height={280} width={280} style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-55%, -50%)'}}/>
            </div>}
            <Suspense>
              <Routes>
                <Route element={<MainPageWrapper/>}>
                  <Route path="/" element={<MainPage/>}/>
                  <Route path="/join" element={<JoinPage/>}/>
                </Route>
                <Route path="/game/:id" element={<GameWrapperPage/>}>
                  <Route path="" element={<LobbyPage/>}/>
                  <Route path="play" element={<GamePage/>}/>
                  <Route path="over" element={<GameOverPage/>}/>
                </Route>
                <Route path='*' element={<NoPage/>} />
              </Routes>
            </Suspense>
          </FadeProvider>
        </RoomDataProvider>
      </WebsocketProvider>
    </div>
  );
}

export default App;
