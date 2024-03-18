import { useState } from "react";
import React from "react";
import Youtube from "react-youtube";

function Video({ onSubmit, messages, onStateChange, onReady, sync, videoId }) {
  const [message, setMessage] = useState("");

  function submitHandler(e) {
    e.preventDefault();
    onSubmit(message);
  }
  return (
    <div className="flex flex-row m-4 justify-center items-center">
      <div className="flex flex-col justify-center pt-8">
        <Youtube
          videoId = {videoId} //"WIRK_pGdIdA"
          onStateChange={onStateChange}
          onReady={onReady}
        ></Youtube>
        <div className="flex justify-center">
          <button
            className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 my-4 border-b-1 border-blue-700 hover:border-blue-500 rounded mx-2"
            onClick={sync}
          >
            Sync
          </button>
        </div>
      </div>
      <div class="max-w-lg w-full m-4">
        <div class="bg-gray-200 px-4 py-3 border-b">
          <h3 class="font-semibold text-gray-700">Chat</h3>
        </div>
        <div class="px-4 py-6">
          <div class="flex flex-col space-y-4">
            <div class="flex flex-col justify-start">
              {messages.map((m) => (
                <div class="bg-gray-100 rounded-lg p-2 m-2">
                  <p class="text-sm text-gray-700">{m}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <form
          class="bg-gray-200 px-4 py-3 border-t flex items-center"
          onSubmit={submitHandler}
        >
          <input
            type="text"
            placeholder="Type your message..."
            class="w-full px-3 py-2 bg-gray-100 border rounded-lg focus:outline-none focus:bg-white focus:border-blue-500"
            onChange={(e) => setMessage(e.target.value)}
          />
          <button class="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 ml-2 rounded-lg">
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default Video;

//<div>
//<div className="flex flex-col justify-center items-center">
//<div className="border m-8 p-4">
//{messages.map((m) => (
//<p>{m}</p>
//))}
//</div>

//<form onSubmit={submitHandler}>
//<input
//type="text"
//className="border mr-8 pl-4 pr-4"
//placeholder="Message Here..."
//onChange={(e) => {
//setMessage(e.target.value);
//}}
///>
//<button type="submit" className="border pr-8 pl-8">
//Send
//</button>
//</form>
//</div>
//</div>
