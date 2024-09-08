const express = require('express');
const produceMessage = require('./kafkaProducer');

const app = express();
const PORT = 3000;

app.use(express.json());

app.post('/send', async (req, res) => {
  const { message, topic } = req.body;

  if (!message || !topic) {
    return res.status(400).send('Message and topic are required');
  }

  await produceMessage(message, topic);
  res.send(`Message sent to Kafka topic ${topic}`);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
