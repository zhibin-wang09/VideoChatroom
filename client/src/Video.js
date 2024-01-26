
import React  from 'react'
import Youtube from 'react-youtube'

function Video({onStateChange}){
    

    return (
        <div className='flex justify-center pt-8'>
            <Youtube videoId="WIRK_pGdIdA" onStateChange={onStateChange}></Youtube>
        </div>
    )
}

export default Video