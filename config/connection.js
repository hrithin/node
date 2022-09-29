const { MongoClient }  = require('mongodb');

const url = 'mongodb+srv://abc:12345@cluster0.k0kqlvi.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(url);


const dbName = 'myProject';

async function main() {
  
  await client.connect();
  console.log('Connected successfully to server');
 

  return client;
}


  module.exports = client;