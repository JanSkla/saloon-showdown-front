import { useContext, useEffect, useRef, useState } from "react";
import { WebsocketContext } from "../utilComponents/WebsocketProvider";
import { useNavigate, useOutletContext } from "../../node_modules/react-router-dom/dist/index";
import { Button } from "../components/Button";
import { RoomContext } from "../utilComponents/RoomDataProvider";
import MainPageCanvas from "../components/MainPageCanvas";
import { FadeContext } from "../utilComponents/FadeScreenProvider";
import { isPhone } from "../utils/utils";

const MAX_NAME_LENGTH = 16;

const cards = [
    { name: 'ammo', img: 'images/cards/ammo.png'},
    { name: 'shoot', img: 'images/cards/shoot.png'},
    { name: 'shield', img: 'images/cards/shield.png'},
    { name: 'beer-order', img: 'images/cards/beer-order.png'},
]

const ShootImage = () => {
    const [state, setState] = useState(0);

    useEffect(()=>{
        setTimeout(() => {
            setState(state <2 ? state+1 : 0)
        }, 1000)
    },[state])

    return <div style={{
        backgroundImage: 'url("images/howto/shoot'+state+'.png")',
        backgroundSize: 'cover',
        width: 379,
        height: 256,
        marginTop: -180,
        marginLeft: 330
    }}/>
}

const MainPage = () => {
    const navigate = useNavigate();

    const { isOpen, data, send, open, close } = useContext(WebsocketContext);
    const { roomCode, setRoomCode } = useContext(RoomContext);


    const [name, setName] = useOutletContext();

    const isMountingRef = useRef(false);

    const changeName = (value) => {

        if (value.length > MAX_NAME_LENGTH) return;

        setName(value);
    }

    const [publicSetting, setPublicSetting] = useState(false);

    const publicSwitch = () => {
        setPublicSetting(!publicSetting);
    }

    const {setOpacityThenCall} = useContext(FadeContext);

    const onCreateClick = () => {
        
        if(open) open();
        setOpacityThenCall(0, () => send(`{"type": "create-room"${name ? `, "name": "${name}"` : ""}, "isPublic": ${publicSetting}}`));
    }

    const onJoinClick = () => {
        setRoomCode();
        setOpacityThenCall(0, () => navigate("join"));
    }

    useEffect(() => {
        if (isOpen) close()
        isMountingRef.current = true;
      }, []);

    useEffect(() => {
        if (!isMountingRef.current) {
            if ((data?.type === "create-room" || data?.type === "join-room") && data?.status === 200){
                navigate("game/" + data?.code)
            }
        } else {
        isMountingRef.current = false;
    }
    }, [data])

    const [tutorial, setTutorial] = useState(false);
    const [card, setCard] = useState('ammo');

    const codeInputRef = useRef();

    return <div className="canvas-container" style={{justifyContent: "end"}}>
        <MainPageCanvas/>
        <div style={{position: "absolute", display: "flex", flexDirection: "column", right: 100, top: 100, alignItems: "center"}}>
            <span style={isPhone ? {fontSize: '3vh'}: undefined}>name:</span>
            <input type="text" ref={codeInputRef} value={name} onChange={e => changeName(e.target.value)} style={isPhone ? {fontSize: '3vh'}: undefined}></input>
            <Button disabled={!!isOpen} onClick={onCreateClick}>create</Button>
            <div style={{backgroundColor: publicSetting ? "green" : "red", marginTop: "-4vh", fontSize: '3vh'}}><Button disabled={!!isOpen} style={{fontSize: '3vh'}} onClick={publicSwitch}>{publicSetting ? "public" : "private"}</Button></div>
            <Button disabled={!!isOpen} onClick={onJoinClick}>join</Button>
            <Button style={{fontSize: '3vh'}} disabled={!!isOpen} onClick={() => setTutorial(!tutorial)}>How to play</Button>
        </div>
        <div style={{
            pointerEvents: !tutorial && 'none',
            position: "absolute", 
            display: "flex", 
            flexDirection: "column", 
            alignItems: "center",
            height: '100vh', 
            width: '100vw', 
            backgroundColor: '#00000077', 
            opacity: tutorial ? 1 : 0, // Change opacity based on tutorial state
            transition: 'opacity 0.5s ease', // Transition for opacity change
        }}>

        <div style={{
            position: 'absolute',
            height: '100vh', 
            width: '100vw', 
            backgroundColor: '#00000077',
            zIndex: 0
        }} onClick={() => setTutorial(!tutorial)}/>

            <div style={{marginTop: tutorial ? 0 : '100vh',
            transition: 'margin-top 0.5s ease', // Transition for opacity change
            height: '100%', 
            width: 1036,
            overflowY: 'scroll',
            scrollbarWidth: 'none',
            zIndex: 1
            }}>
                <div style={{
                    backgroundImage: 'url(images/howto/background.png)',
                    width: '100%',
                    height: 2850,
                    backgroundSize: 'cover',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 9
                    }}>
                        <Button style={{marginLeft: 80, color: 'black', fontSize: 48, marginTop: 200, width: 40}} onClick={()=>setTutorial(false)}>{"x"}</Button>
                        <div style={{marginRight: 20}}>
                            <div style={{textAlign: 'left', paddingTop: 140, paddingLeft: 146, width: 713}}>
                                <div className="howtoText">Saloon showdown is a party multiplayer game for 2-5 people</div>
                                <br/>
                                <div className="howtoText">You can play in public or private lobbies with your friends and/or enemies</div>
                                <br/>
                                <div className="howtoText">The players choose an action every round by selecting a card corresponding to the action</div>
                            </div>
                            <div className="howtoTitle">Cards</div>
                            
                            <div style={{flexDirection: 'column', display: 'flex', alignItems: "center", gap: 48}}>
                                <div style={{flexDirection: 'row', alignItems: "center", display: 'flex', justifyContent: 'center', gap: 10, height: 307}}>
                                    {cards.map(e => <img className="howtoCard" style={{
                                        cursor: 'pointer',
                                        height: card === e.name ? 307 : 285,
                                        transition: 'height 0.5s ease', // Transition for opacity change
                                        filter: card === e.name ? 'drop-shadow(0px 4px 8px #000000)' : 'drop-shadow(0px 4px 8px #00000055)'
                                    }} src={e.img} onClick={() => setCard(e.name)}/>
                                    )}
                                </div>
                                <div style={{
                                    width: 793,
                                    backgroundColor: '#362B20',
                                    borderRadius: 24,
                                    transition: 'height 0.5s ease', // Transition for opacity change
                                }}>
                                    <div style={{
                                        marginTop: -20,
                                        marginLeft: card === 'ammo' ? 55 : card === 'shoot' ? 265 : card === 'shield' ? 480 : 690,
                                        height: 40,
                                        aspectRatio: 1,
                                        backgroundColor: '#362B20',
                                        transform: 'rotate(45deg)',
                                        transition: 'margin-left 0.5s ease', // Transition for opacity change
                                    }}>
                                    </div>
                                    <div style={{paddingLeft: 36, paddingBottom: 40, color: 'white', textAlign: 'left'}}>
                                    {card === 'ammo' ? <>
                                            <div className="howtoTitle" style={{paddingTop: 20}}>Ammo</div>
                                            <div className="howtoText" style={{width: 314, paddingTop: 24}}>Use ammo to load up your gun.</div>
                                            <div style={{
                                                backgroundImage: 'url("images/howto/ammo.png")',
                                                backgroundSize: 'cover',
                                                width: 315,
                                                height: 123,
                                                marginTop: -110,
                                                marginLeft: 350
                                            }}/>
                                    </> : card === 'shoot' ? <>
                                            <div className="howtoTitle" style={{paddingTop: 20}}>Shoot</div>
                                            <div className="howtoText" style={{width: 314, paddingTop: 24}}>
                                                Select a target and damage your opponents.
                                            </div>
                                            <ShootImage />
                                    </> : card === 'shield' ? <>
                                            <div className="howtoTitle" style={{paddingTop: 20}}>Shield</div>
                                            <div className="howtoText" style={{width: 314, paddingTop: 24}}>Use shield to block shots.</div>
                                            <div style={{
                                                backgroundImage: 'url("images/howto/shield.png")',
                                                backgroundSize: 'cover',
                                                width: 416,
                                                height: 171,
                                                marginTop: -158,
                                                marginLeft: 290
                                            }}/>
                                    </> : <>
                                            <div className="howtoTitle" style={{paddingTop: 20}}>Beer</div>
                                            <div className="howtoText" style={{width: 314, paddingTop: 24, paddingBottom: 20}}>Drink beer to increase your hearts.<br/>
                                                <br/>
                                                <br/>
                                                After playing this card, it will take 1 extra round for the bartender to prepare you the beer. After that you’ll recieve an extra ‘Drink beer’ card.<br/>
                                                <br/><br/>
                                                But be careful. When anyone shoots you, your beer breaks! <br/>
                                                <br/><br/>
                                                Playing the shield protects your beer from breaking.
                                            </div>
                                            <div style={{
                                                backgroundImage: 'url("images/howto/beer.png")',
                                                backgroundSize: 'cover',
                                                width: 384,
                                                height: 439,
                                                marginTop: -458,
                                                marginLeft: 340
                                            }}/>
                                    </>}
                                    </div>
                                </div>
                            </div>
                            <div style={{textAlign: 'left',marginTop: 20, marginBottom: 16, paddingLeft: 146, width: 800}}>
                                <div className="howtoText">To pick a card, there is only 4 soconds. Be fast!</div>
                            </div>
                            <div className="howtoTitle" style={{paddingTop: 20}}>Health</div>
                            <div style={{
                                backgroundImage: 'url("images/howto/healthframe.png")',
                                backgroundSize: 'cover',
                                width: 1036,
                                height: 460
                            }}/>
                            <div style={{textAlign: 'left', marginTop: -405, paddingLeft: 146, width: 800}}>
                                <div className="howtoText">Everyone starts with 3 lives</div>
                            </div>
                            <div style={{textAlign: 'left', paddingTop: 220, paddingLeft: 146, width: 261, paddingBottom: 80}}>
                                <div className="howtoText">To know how maly lives your enemy has, look at their chest for a bullet hole or a star</div>
                            </div>
                        </div>
                    </div>
            </div>
        </div>
    </div>
}

export default MainPage;