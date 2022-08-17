import React from "react";

const Chat = () => {
    const handleChatSubmit = () => {

    }
  return (
    <div>
      <h2>Chat Area</h2>

      <div>
        <form onSubmit={handleChatSubmit}>
          <textarea rows={10} cols={10} />
           <br/>
          <button type="submit">submit</button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
