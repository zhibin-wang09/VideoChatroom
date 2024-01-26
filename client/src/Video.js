import {socket} from './socket'
import React, {useEffect} from 'react'
import Youtube from 'react-youtube'

function Video(){
    useEffect(() => {
        socket.connect();
    })

    function onStateChange(event){
        //access to the player object through event.target
        const state = event.target.getPlayerState();
        //const timeStamp = event.target.getCurrentTime();
        // bind the event handler to the socket in case of server notify the client to update player status
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
        <div className='flex justify-center pt-8'>
            <Youtube videoId="WIRK_pGdIdA" onStateChange={onStateChange}></Youtube>
        </div>
    )
}

export default Video