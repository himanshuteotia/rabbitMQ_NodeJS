
const amqp = require("amqplib");

const message = {"number" : 2}

// get the the third element of the input would be 
let msg = process.argv[2]
if(msg) message["number"] = msg

async function connection() {
    try { 
        var connection = await amqp.connect("amqp://localhost:5672");
        var channel = await connection.createChannel();
        const result = await channel.assertQueue("jobs");
        channel.sendToQueue("jobs",Buffer.from(JSON.stringify(message)))
        console.log("Job sent sucessfully : " + JSON.stringify(message));
    } catch(err) {
        console.log("Error in connection : ", err.message)
    }
}

connection()