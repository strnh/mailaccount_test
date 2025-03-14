const net = require("net");
const dotenv = require("dotenv");
const fs = require("fs");
const buffer = fs.readFileSync("users.json");
const users = JSON.parse(buffer);

// const map1 = users.account.map((id) => console.log(id.id));

 
dotenv.config();

const portnum = process.env["PORT"];
const server = process.env["SERVER"];

const nusers = users.account.length

for (let count=0;count<nusers; count++) {
  console.log(users.account[count].id+":"+users.account[count].password);
  pop3Test(server,portnum,users.account[count].id,users.account[count].password);
} 


function pop3Test(server,portnum,id,passwd) {
   const client = net.createConnection({ port: portnum }, () => {
    console.log('connected to server!');
    client.write('USER '+id+'\r\n');
    client.write('PASS '+passwd+'\r\n');
    client.write('STAT\r\n');
   });

   client.on('data', (data) => {
     console.log(data.toString());
     client.end();
   });
   client.on('end', () => {
     console.log('disconnected from server');
   });
}
