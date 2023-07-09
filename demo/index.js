import fetch from 'node-fetch';

const baseUrl = "http://127.0.0.1:5555/api/population";

let response = await fetch(`${baseUrl}/state/florida/city/orlando`);
let body = await response.text();
let status = response.status;

console.log("successful GET - 200");
console.log("Population", body);
console.log("Status", status);
console.log("");

response = await fetch(`${baseUrl}/state/kansas/city/bezine`);
body = await response.text();
status = response.status;

console.log("Unsuccessful GET - 400");
console.log("Population", body);
console.log("Status", status);
console.log("");

response = await fetch(`${baseUrl}/state/kansas/city/bezine`, { method: 'PUT', body: 1300 });
body = await response.text();
status = response.status;

console.log("Successful create 201");
console.log("result", body);
console.log("Status", status);
console.log("");

response = await fetch(`${baseUrl}/state/kansas/city/bezine`, { method: 'PUT', body: 1310 });
body = await response.text();
status = response.status;

console.log("Successful update 200");
console.log("result", body);
console.log("Status", status);
console.log("");

response = await fetch(`${baseUrl}/state/kansas/city/bezine`);
body = await response.text();
status = response.status;

console.log("successful GET - 200");
console.log("Population", body);
console.log("Status", status);
console.log("");