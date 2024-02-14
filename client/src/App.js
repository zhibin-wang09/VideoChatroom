import Navbar from "./Navbar";
import Video from "./Video";
import {socket} from './socket';
import { useEffect, useState } from "react";

function App({videoId,roomId}) {
    const [player, setPlayer] = useState(null); // store  event.target(which is the object we need to control the video)
    const [messages, setMessages] = useState([]);

    // initialization of socket connection
    useEffect(() => {
        socket.connect();

        return () => {
            socket.disconnect();
        }
    })

    // this hook initializes the player object that is returned byu youtube video to allow for video control
    useEffect(() => {
        // connect to the server only when this component is mounted
        let playerListener; // variable to store the event listener
    
        // Function to handle state changes received from the server
        const handleStateChange = (state,timeStamp) => {
            if(timeStamp) player.seekTo(timeStamp)
            switch (state) {
                case 1: // playing
                console.log("play")
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
            //socket.disconnect();
            if (playerListener) {
                playerListener.off('state', handleStateChange);
            }
        };
    }, [player]); // re-run the effect when the player changes
    
    // initialization of message event 
    useEffect(() => {

        const addMessage = (message) => {
            setMessages([...messages, message]);
        }
        
        socket.on('message', addMessage);
        return () => {
            socket.off('message');
        }
    })

    function onReady(event){ // set up the player object when the video is loaded
        setPlayer(event.target);
    }

    function sync(){ // activated when user press the sync button in Video component and send current video information to server
        socket.emit('state',player.getPlayerState(),player.getCurrentTime());
    }

    function onStateChange(event){
        //access to the player object through event.target
        const state = event.target.getPlayerState();
        const timeStamp = event.target.getCurrentTime();
        console.log(state,timeStamp);
        //const timeStamp = event.target.getCurrentTime();
        
        // sending player status to the server
        switch (state) {
            
            case 1: // playing
                socket.emit('state',1);
                break;
            case 2: // paused
                console.log("Pause")
                socket.emit('state',2);
                break;
            default:
                break;
        }
    } 

    function messageSend(message){
        socket.emit('message',message); // send the message
    }

    return (
    <>

        <Navbar></Navbar>
        <Video onStateChange={onStateChange} messages = {messages} onSubmit = {messageSend}onReady={onReady} sync={sync}></Video>
    </> 
    );
}

export default App;
