import Navbar from "./Navbar";
import Video from "./Video";
import {socket} from './socket';
import { useEffect, useState } from "react";

function App() {
    const [player, setPlayer] = useState(null); // store  event.target(which is the object we need to control the video)

    useEffect(() => {
        // connect to the server only when this component is mounted
        socket.connect();
    
        let playerListener; // variable to store the event listener
    
        // Function to handle state changes received from the server
        const handleStateChange = (state) => {
            switch (state) {
                case 1: // playing
                    player.playVideo();
                    break;
                case 2: // paused
                    player.pauseVideo();
                    break;
                default:
                    break;
            }
        };
    
        if (player) {
            // If the player is ready, register the event listener
            playerListener = socket.on('state', handleStateChange);
        }
    
        // clean up: disconnect the socket and remove the player listener
        return () => {
            socket.disconnect();
            if (playerListener) {
                playerListener.off('state', handleStateChange);
            }
        };
    }, [player]); // re-run the effect when the player changes

    function onReady(event){ // set up the player object when the video is loaded
        setPlayer(event.target);
    }

    function onStateChange(event){
        //access to the player object through event.target
        const state = event.target.getPlayerState();
        //const timeStamp = event.target.getCurrentTime();
        
        // sending player status to the server
        switch (state) {
            case 1: // playing
                socket.emit('state',1,);
                break;
            case 2: // paused
                socket.emit('state',2,);
                break;
            default:
                break;
        }
    } 
    return (
    <>

        <Navbar></Navbar>
        <Video onStateChange={onStateChange} onReady={onReady}></Video>
    </> 
    );
}

export default App;
