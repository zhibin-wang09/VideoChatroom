import React from 'react'
import Youtube from 'react-youtube'

function Video(){
    function onStateChange(event){
        //access to the player object through event.target
        const state = event.target.getPlayerState();
        switch (state) {
            case 2: // paused
                // do something
                console.log(state);
                break;
            case 1: // playing
                // do something
                console.log(state);
                break;
            default:
                break;
        }    
    } 
       <Youtube videoId="WIRK_pGdIdA"></Youtube>
    return (
        <div className='flex justify-center pt-8'>
            <Youtube videoId="WIRK_pGdIdA" onStateChange={onStateChange}></Youtube>
        </div>
    )
}

export default Video