const { Kafka } = require('kafkajs');

const kafka = new Kafka({
    clientId: 'demo-app',
    brokers:['kafka:9092'],
})

const producer = kafka.producer();

const produceMessage = async (message, topic) => {
    await producer.connect();
    await producer.send({
        topic: topic,
        messages: [{value: message}],
    });
    await producer.disconnect();
}

module.exports = produceMessage;
