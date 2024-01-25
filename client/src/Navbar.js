import React from 'react'

function Navbar(){
    return (
        <div className='flex flex-row bg-zinc-700 pt-2 pb-2 pl-2 pr-2'>
            <div className='basis-4/5'>

            </div>
            <div className='flex flex-grow basis-1/5 justfiy-end items-center'>
                <button className='bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-1 border-blue-700 hover:border-blue-500 rounded mx-2'>Rooms</button>
                <button className='bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-1 border-blue-700 hover:border-blue-500 rounded mx-2'>Friends</button>
            </div>
        </div>
    )
}

export default Navbar