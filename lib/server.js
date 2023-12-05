import { MongoClient } from 'mongodb';

const uri = "mongodb+srv://user111:vSIZTgdHheBBoFht@cluster0.ktvlilr.mongodb.net";
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

let client;
let database;

async function connectDatabase() {
  client = await MongoClient.connect(uri, options);
  database = client.db('music');
}

function getDatabase() {
  return database;
}

function closeConnection() {
  client.close();
}

export { connectDatabase, getDatabase, closeConnection };
