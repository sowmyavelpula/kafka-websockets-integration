import React, { useState, useEffect } from 'react';

const WebSocketComponent = () => {
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Cleanup when the component unmounts
    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, [socket]);

  const subscribeToTopic = (topicId) => {
    if (socket) {
      socket.close(); // Close the previous connection if it exists
    }

    const newSocket = new WebSocket('ws://localhost:8082');
    newSocket.onopen = () => {
      console.log(`topic id is ${topicId}`)
      newSocket.send(JSON.stringify({ topicId }));
    };

    newSocket.onmessage = (event) => {
      console.log(event);
      setMessages((prevMessages) => [...prevMessages, event.data]);
    };

    setSocket(newSocket);
  };

  return (
    <div>
      <h1>Subscribe to Kafka Topics</h1>
      <button onClick={() => subscribeToTopic('a-topic-to-test-1')}>Subscribe to Topic A</button>
      <button onClick={() => subscribeToTopic('b-topic-to-test-2')}>Subscribe to Topic B</button>
      
      <h2>Messages</h2>
      <div>
        {messages.map((message, index) => (
          <div key={index}>{message}</div>
        ))}
      </div>
    </div>
  );
};

export default WebSocketComponent;
