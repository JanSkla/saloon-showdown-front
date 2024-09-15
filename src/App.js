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
import CodeRedirectPage from './pages/CodeRedirectPage';

function App() {

  return (
    <div className="App">    
      <WebsocketProvider>
        <RoomDataProvider>
          <FadeProvider>
            <Suspense>
              <Routes>
                <Route element={<MainPageWrapper/>}>
                  <Route path="/" element={<MainPage/>}/>
                  <Route path="/join" element={<JoinPage/>}/>
                </Route>
                <Route path="/game/:id" element={<CodeRedirectPage/>}/>
                <Route path="/game" element={<GameWrapperPage/>}>
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
