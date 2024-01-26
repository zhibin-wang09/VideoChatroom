
import React  from 'react'
import Youtube from 'react-youtube'

function Video({onStateChange,onReady,sync}){
    

    return (
        <>
        <div className='flex flex-row justify-center pt-8'>
            <Youtube videoId="WIRK_pGdIdA" onStateChange={onStateChange} onReady={onReady}></Youtube>
        </div>
        <div className='flex justify-center'>
            <button className='bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 my-4 border-b-1 border-blue-700 hover:border-blue-500 rounded mx-2' onClick={sync}>Sync</button>
        </div>
        </>
        
    )
}

export default Video