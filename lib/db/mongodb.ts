import { MongoClient } from 'mongodb'
const MONGODB_URI = process.env.MONGODB_URI
const NODE_ENV = process.env.NODE_ENV

if (!MONGODB_URI) throw new Error('Cannot find MONGODB_URI')
console.log('MONGODB_URI: ' + MONGODB_URI)
const client = new MongoClient(MONGODB_URI)

let clientPromise = NODE_ENV === 'development'
  ? global._mongoClientPromise || (global._mongoClientPromise = client.connect())
  : client.connect()

export default clientPromise
