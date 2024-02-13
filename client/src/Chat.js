import { useState } from "react";

function Chat({onSubmit, messages}){
    const [message, setMessage] = useState("");

    function submitHandler(e){
        e.preventDefault();
        onSubmit(message);
    }
    return (<div className="flex flex-col justify-center items-center">
    
        <div className="border m-8 p-4">
            {messages.map((m) => <p>{m}</p>)}
        </div>

        <form onSubmit={submitHandler}>
            <input type='text'  className="border mr-8 pl-4 pr-4" placeholder="Message Here..." onChange={(e) => {setMessage(e.target.value)}}/>
            <button type='submit' className="border pr-8 pl-8">Send</button>
        </form>
    </div>)
}

export default Chat;