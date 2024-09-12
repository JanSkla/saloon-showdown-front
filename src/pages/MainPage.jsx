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



const ShootImage = ({sizeMultiplier}) => {
    console.log(sizeMultiplier)
    const [state, setState] = useState(0);

    useEffect(()=>{
        setTimeout(() => {
            setState(state <2 ? state+1 : 0)
        }, 1000)
    },[state])

    return <div style={{
        backgroundImage: 'url("images/howto/shoot'+state+'.png")',
        backgroundSize: 'cover',
        width: 379*sizeMultiplier,
        height: 256*sizeMultiplier,
        marginTop: -180*sizeMultiplier,
        marginLeft: 330*sizeMultiplier
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

    const sizeMultiplier = isPhone ? 0.6 : 1;

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

        <div style={{marginTop: tutorial ? 0 : 100*sizeMultiplier + 'vh',
            transition: 'margin-top 0.5s ease', // Transition for opacity change
            height: '100%', 
            width: 1036*sizeMultiplier,
            overflowY: 'scroll',
            scrollbarWidth: 'none',
            zIndex: 1,
        }}>
            <div style={{
                backgroundImage: 'url(images/howto/background.png)',
                width: '100%',
                height: 2850*sizeMultiplier,
                backgroundSize: 'cover',
                display: 'flex',
                flexDirection: 'column',
                gap: 9*sizeMultiplier
            }}>
                <Button style={{marginLeft: 80*sizeMultiplier, color: 'black', fontSize: 48*sizeMultiplier, marginTop: 200*sizeMultiplier, width: 40*sizeMultiplier}} onClick={()=>setTutorial(false)}>{"x"}</Button>
                <div style={{marginRight: 20*sizeMultiplier}}>
                    <div style={{textAlign: 'left', paddingTop: 140*sizeMultiplier, paddingLeft: 146*sizeMultiplier, width: 713*sizeMultiplier}}>
                        <div className="howtoText" style={{fontSize: 20*sizeMultiplier}}>Saloon showdown is a party multiplayer game for 2-5 people</div>
                        <br/>
                        <div className="howtoText" style={{fontSize: 20*sizeMultiplier}}>You can play in public or private lobbies with your friends and/or enemies</div>
                        <br/>
                        <div className="howtoText" style={{fontSize: 20*sizeMultiplier}}>The players choose an action every round by selecting a card corresponding to the action</div>
                    </div>
                    <div className="howtoTitle" style={{fontSize: 48*sizeMultiplier}}>Cards</div>
                    
                    <div style={{flexDirection: 'column', display: 'flex', alignItems: "center", gap: 48*sizeMultiplier}}>
                        <div style={{flexDirection: 'row', alignItems: "center", display: 'flex', justifyContent: 'center', gap: 10*sizeMultiplier, height: 307*sizeMultiplier}}>
                            {cards.map(e => <img className="howtoCard" style={{
                                cursor: 'pointer',
                                height: card === e.name ? 307*sizeMultiplier : 285*sizeMultiplier,
                                transition: 'height 0.5s ease', // Transition for opacity change
                                filter: card === e.name ? 'drop-shadow(0px 4px 8px #000000)' : 'drop-shadow(0px 4px 8px #00000055)'
                            }} src={e.img} onClick={() => setCard(e.name)}/>)}
                        </div>
                        <div style={{
                            width: 793*sizeMultiplier,
                            backgroundColor: '#362B20',
                            borderRadius: 24*sizeMultiplier,
                            transition: 'height 0.5s ease', // Transition for opacity change
                        }}>
                            <div style={{
                                marginTop: -20*sizeMultiplier,
                                marginLeft: card === 'ammo' ? 55*sizeMultiplier : card === 'shoot' ? 265*sizeMultiplier : card === 'shield' ? 480*sizeMultiplier : 690*sizeMultiplier,
                                height: 40*sizeMultiplier,
                                aspectRatio: 1,
                                backgroundColor: '#362B20',
                                transform: 'rotate(45deg)',
                                transition: 'margin-left 0.5s ease', // Transition for opacity change
                            }}>
                            </div>
                            <div style={{paddingLeft: 36*sizeMultiplier, paddingBottom: 40*sizeMultiplier, color: 'white', textAlign: 'left'}}>
                                {card === 'ammo' ? <>
                                    <div className="howtoTitle" style={{paddingTop: 20*sizeMultiplier, fontSize: 48*sizeMultiplier}}>Ammo</div>
                                    <div className="howtoText" style={{width: 314*sizeMultiplier, paddingTop: 24*sizeMultiplier, fontSize: 20*sizeMultiplier}}>Use ammo to load up your gun.</div>
                                    <div style={{
                                        backgroundImage: 'url("images/howto/ammo.png")',
                                        backgroundSize: 'cover',
                                        width: 315*sizeMultiplier,
                                        height: 123*sizeMultiplier,
                                        marginTop: -110*sizeMultiplier,
                                        marginLeft: 350*sizeMultiplier
                                    }}/>
                                </> : card === 'shoot' ? <>
                                    <div className="howtoTitle" style={{paddingTop: 20*sizeMultiplier, fontSize: 48*sizeMultiplier}}>Shoot</div>
                                    <div className="howtoText" style={{width: 314*sizeMultiplier, paddingTop: 24*sizeMultiplier, fontSize: 20*sizeMultiplier}}>Select a target and damage your opponents.</div>
                                    <ShootImage sizeMultiplier={sizeMultiplier}/>
                                </> : card === 'shield' ? <>
                                    <div className="howtoTitle" style={{paddingTop: 20*sizeMultiplier, fontSize: 48*sizeMultiplier}}>Shield</div>
                                    <div className="howtoText" style={{width: 314*sizeMultiplier, paddingTop: 24*sizeMultiplier, fontSize: 20*sizeMultiplier}}>Use shield to block shots.</div>
                                    <div style={{
                                        backgroundImage: 'url("images/howto/shield.png")',
                                        backgroundSize: 'cover',
                                        width: 416*sizeMultiplier,
                                        height: 171*sizeMultiplier,
                                        marginTop: -158*sizeMultiplier,
                                        marginLeft: 290*sizeMultiplier
                                    }}/>
                                </> : <>
                                    <div className="howtoTitle" style={{paddingTop: 20*sizeMultiplier, fontSize: 48*sizeMultiplier}}>Beer</div>
                                    <div className="howtoText" style={{width: 314*sizeMultiplier, paddingTop: 24*sizeMultiplier, paddingBottom: 20*sizeMultiplier, fontSize: 20*sizeMultiplier}}>Drink beer to increase your hearts.<br/>
                                        <br/>
                                        <br/>
                                        After playing this card, it will take 1 extra round for the bartender to prepare you the beer. After that you’ll receive an extra ‘Drink beer’ card.<br/>
                                        <br/><br/>
                                        But be careful. When anyone shoots you, your beer breaks! <br/>
                                        <br/><br/>
                                        Playing the shield protects your beer from breaking.
                                    </div>
                                    <div style={{
                                        backgroundImage: 'url("images/howto/beer.png")',
                                        backgroundSize: 'cover',
                                        width: 384*sizeMultiplier,
                                        height: 439*sizeMultiplier,
                                        marginTop: -458*sizeMultiplier,
                                        marginLeft: 340*sizeMultiplier
                                    }}/>
                                </>}
                            </div>
                        </div>
                    </div>
                    <div style={{textAlign: 'left', marginTop: 20*sizeMultiplier, marginBottom: 16*sizeMultiplier, paddingLeft: 146*sizeMultiplier, width: 800*sizeMultiplier}}>
                        <div className="howtoText" style={{fontSize: 20*sizeMultiplier}}>To pick a card, there is only 4 seconds. Be fast!</div>
                    </div>
                    <div className="howtoTitle" style={{paddingTop: 20*sizeMultiplier}}>Health</div>
                    <div style={{
                        backgroundImage: 'url("images/howto/healthframe.png")',
                        backgroundSize: 'cover',
                        width: 1036*sizeMultiplier,
                        height: 460*sizeMultiplier
                    }}/>
                    <div style={{textAlign: 'left', marginTop: -405*sizeMultiplier, paddingLeft: 146*sizeMultiplier, width: 800*sizeMultiplier}}>
                        <div className="howtoText" style={{fontSize: 20*sizeMultiplier}}>Everyone starts with 3 lives</div>
                    </div>
                    <div style={{textAlign: 'left', paddingTop: 220*sizeMultiplier, paddingLeft: 146*sizeMultiplier, width: 261*sizeMultiplier, paddingBottom: 80*sizeMultiplier}}>
                        <div className="howtoText" style={{fontSize: 20*sizeMultiplier}}>To know how many lives your enemy has, look at their chest for a bullet hole or a star</div>
                    </div>
                </div>
            </div>
        </div>

        </div>
    </div>
}

export default MainPage;