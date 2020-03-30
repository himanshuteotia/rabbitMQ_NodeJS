const amqp = require("amqplib");

async function connection() {
    try { 
        var connection = await amqp.connect("amqp://localhost:5672");
        var channel = await connection.createChannel();
        const result = await channel.assertQueue("jobs");

        channel.consume("jobs", message => {
            const input = JSON.parse(message.content.toString());
            console.log(`Recevied job with input ${input.number}`)
            if(input.number == 67) channel.ack(message)
        })

        console.log("waiting for messages...");
    } catch(err) {
        console.log("Error in connection : ", err.message)
    }
}

connection()