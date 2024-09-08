const WebSocket = require('ws');
const { Kafka } = require('kafkajs');

const wss = new WebSocket.Server({ port: 8082 });
const kafka = new Kafka({ clientId: 'demo-app', brokers: ['kafka:9092'] });

wss.on('connection', (ws) => {
  console.log(`Client connected: ${ws}`);

  ws.on('message', async (message) => {
    const { topicId } = JSON.parse(message);
    console.log(`Client subscribed to topic: ${topicId}`);

    // Create a new consumer for this WebSocket connection
    const consumer = kafka.consumer({ groupId: `websocket-group-${topicId}-${Date.now()}` });

    await consumer.connect();
    await consumer.subscribe({ topic: topicId });

    // Set up a listener for messages from the subscribed topic
    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        if (ws.readyState === WebSocket.OPEN) {
          console.log(`Sending message to client subscribed to topic ${topicId}: ${message.value.toString()}`);
          ws.send(message.value.toString());
        }
      },
    });

    // Handle WebSocket connection close
    ws.on('close', async () => {
      console.log(`Client disconnected from topic: ${topicId}`);
      await consumer.disconnect();  // Disconnect the consumer when the client disconnects
    });
  });
});

console.log('WebSocket server running on ws://localhost:8082');
