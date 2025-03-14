const {NetConn, NetService} = require("node-tcp");
const dotenv = require("dotenv");
dotenv.config();
const fs = require("fs");
const buffer = fs.readFileSync("users.json");
const users = JSON.parse(buffer);


const portnum = process.env["TLSPORT"];
const server = process.env["SERVER"];
const sname = process.env["SERVERNAME"];
const nusers = users.account.length


for (let count=0;count<nusers; count++) {
  console.log(users.account[count].id+":"+users.account[count].password);
  pop3sTest(server,portnum,sname,users.account[count].id,users.account[count].password);
} 



async function pop3sTest(server,portnum,sname,id,passwd) {
    try {
        const options2 = { port: portnum, host: server, servername: sname }
        const conn2 = await NetConn.connectToHost(options2, true);
        console.log(`Connected to ${options2.host}:${options2.port} using TLS`);
// Write a ID request
        await conn2.writeBuffer(Buffer.from('USER hiko@nukoblog.net\r\n', 'utf8'));
        console.log(`Sent data`);
// Read response
        let data2 = await conn2.readBuffer(undefined);
        console.log(`Received data: ${data2.length} bytes`);        
        const html2 = data2.toString('utf8');
        console.log(html2);
// Write a AUTH request
        await conn2.writeBuffer(Buffer.from('PASS 1z3c2x4v\r\n','utf8'));
        console.log('Sent pw.');

// read
        let data3=await conn2.readBuffer(undefined);
        console.log(`Received data: ${data3.length} bytes`);
        const html3 = data3.toString('utf8');
        console.log(html3);

// sent STAT 

        await conn2.writeBuffer(Buffer.from('STAT\r\n','utf8'));
        console.log('Sent STAT');

// read
        let data4=await conn2.readBuffer(undefined);
        console.log(`Received data: ${data4.length} bytes`);
        const res4 = data4.toString('utf8');
        console.log(res4);

// 
        let data5=await conn2.readBuffer(undefined);
        console.log(`Received data: ${data5.length} bytes`);
        let res5 = data5.toString('utf8');
        console.log(res5);


// close 

        await conn2.end();
   } catch (err) {

    console.log(err);
  }
}
