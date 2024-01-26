import Navbar from "./Navbar";
import Video from "./Video";
import {socket} from './socket';
import { useEffect } from "react";

function App() {
  useEffect(() => {
        socket.connect();
    })

    function onStateChange(event){
        //access to the player object through event.target
        const state = event.target.getPlayerState();
        //const timeStamp = event.target.getCurrentTime();
        // bind the event handler to the socket in case of server notify the client to update player status
        console.log(state);
        socket.on('state', (state)=> {
            switch (state) {
                case 1: // playing
                    event.target.playVideo();
                    break;
                case 2: // paused
                    event.target.pauseVideo();
                    break;
                default:
                    break;
            }
        })

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
    <Video onStateChange={onStateChange}></Video>
   </> 
  );
}

export default App;
